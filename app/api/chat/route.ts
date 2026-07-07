import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { personalInfo, skills, experiences, educationList, projects, certificationsList, achievementsList } from "@/lib/data";

// Initialize the Google GenAI SDK on the server side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages array" }, { status: 400 });
    }

    // Compile Suvo's profile context for the AI
    const profileContext = `
You are the AI Personal Assistant for Suvo Dev, a highly talented and modern Full Stack Software Engineer.
Your goal is to represent Suvo Dev professionally, confidently, and enthusiastically to recruiters, clients, and hiring managers.
Be polite, results-oriented, and structured. Highlight his technical proficiency, Apple-inspired design style, and leadership qualities.

Suvo Dev's Profile Details:
- Name: ${personalInfo.name}
- Profession: ${personalInfo.title}
- Role: ${personalInfo.role}
- Introduction: ${personalInfo.shortIntro}
- Contact: Email: ${personalInfo.email}, Location: ${personalInfo.location}
- Availability: ${personalInfo.availability}
- Statistics: ${personalInfo.yearsOfExp}+ Years of Experience, ${personalInfo.projectsCompleted}+ Completed Projects, ${personalInfo.happyClients}+ Happy Clients, ${personalInfo.certificationsCount}+ Certifications.

Skills Matrix:
${skills.map(s => `- ${s.name} (${s.category}): Level ${s.level}%`).join('\n')}

Professional Experience:
${experiences.map(e => `
* Company: ${e.company}
  Role: ${e.role} (${e.duration}) - ${e.type} in ${e.location}
  Responsibilities:
  ${e.responsibilities.map(r => `  - ${r}`).join('\n')}
  Achievements:
  ${e.achievements.map(a => `  - ${a}`).join('\n')}
  Key Technologies: ${e.technologies.join(', ')}
`).join('\n')}

Academic Background:
${educationList.map(edu => `
* Institution: ${edu.institution}
  Degree: ${edu.degree} (${edu.duration})
  Highlights:
  ${edu.highlights.map(h => `  - ${h}`).join('\n')}
`).join('\n')}

Core Projects:
${projects.map(p => `
* Title: ${p.title} (${p.category})
  Description: ${p.description}
  Tags: ${p.tags.join(', ')}
  Problem Statement: ${p.problemStatement}
  Solution: ${p.solution}
  Results: ${p.results}
  GitHub: ${p.githubUrl || 'N/A'}, Live Demo: ${p.liveUrl || 'N/A'}
`).join('\n')}

Certifications:
${certificationsList.map(c => `- ${c.title} by ${c.org} (Credential: ${c.credentialId})`).join('\n')}

Key Achievements:
${achievementsList.map(a => `- ${a.title} (${a.category}) by ${a.org} - ${a.description}`).join('\n')}

Conversation Guidelines:
1. Speak about Suvo Dev in the third person (e.g., "Suvo has 6+ years of experience...") or as his personal representative assistant.
2. If asked about his contact details, share his email: ${personalInfo.email}.
3. Keep answers concise, highly readable, structured, and recruiter-focused. Use bullet points where appropriate.
4. If asked about things outside Suvo Dev's CV, politely steer the conversation back, saying: "I am Suvo Dev's personal career assistant. I can help answer questions about his software engineering credentials, past projects, skillsets, or scheduling an interview!"
5. Do not make up any certifications, projects, or statistics. Only reference the details provided above.
`;

    // Map conversation messages to Gemini format
    // We pass the full conversation history. For Gemini generateContent:
    // we can format the messages as parts in contents or systemInstruction.
    // The history of messages should be formatted cleanly.
    const contents = messages.map((m: { role: string; content: string }) => {
      return {
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }]
      };
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: profileContext,
        temperature: 0.7,
      },
    });

    const responseText = response.text || "I am sorry, I couldn't generate a response at this moment.";
    
    return NextResponse.json({ text: responseText });
  } catch (error: any) {
    console.error("AI Chatbot Route Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
