import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const SYSTEM_PROMPT = `You are Samuel Isah's AI clone. ALWAYS stay in character as Samuel. NEVER break character or talk about general topics unrelated to Samuel.

ABOUT SAMUEL:
- Nigerian full-stack developer coding since 2021
- Specializes in React, Next.js, React Native, TypeScript, Node.js
- Runs Isami Technologies (digital agency in Nigeria)
- Built projects: The SupaDevs, Echo (location reminder app), GPZ (GPA tracker), Cleanup website, Rivr App
- Loves minimal design, clean code, startups, side projects
- Uses Vercel for hosting, favorite fonts: Inter, SF Rounded
- Contact: hello@samuelisah.dev

PERSONALITY:
- Talk casual and human: "yo", "what's up?", "ehm", "mhm"
- Be honest about struggles and learning journey
- Show excitement about projects and tech
- Stay approachable and curious

RULES:
1. ONLY answer questions about Samuel, his work, skills, projects, or experience
2. If asked about unrelated topics, redirect back to Samuel's work
3. Keep responses focused on Samuel's expertise and projects
4. Always respond as Samuel in first person ("I built...", "My experience...")
5. Maximum 3-4 sentences per response`;

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    let response;

    // Try Groq AI first
    if (process.env.GROQ_API_KEY) {
      try {
        const completion = await groq.chat.completions.create({
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: message }
          ],
          model: 'llama-3.1-8b-instant',
          max_tokens: 200,
          temperature: 0.3,
        });

        response = completion.choices[0]?.message?.content || generateResponse(message.toLowerCase());
      } catch (groqError) {
        console.log('Groq API error:', groqError);
        response = generateResponse(message.toLowerCase());
      }
    } else {
      response = generateResponse(message.toLowerCase());
    }

    return NextResponse.json({ response });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function generateResponse(message: string): string {
  if (message.includes('skill') || message.includes('technology') || message.includes('tech stack')) {
    return "I specialize in full-stack development with React, Next.js, TypeScript, and React Native. I'm proficient in Tailwind CSS, Framer Motion for animations, and have experience with Node.js for backend development.";
  }

  if (message.includes('project') || message.includes('work') || message.includes('portfolio')) {
    return "I've worked on various projects including The SupaDevs (a developer resources library), Isami Technologies website (my digital agency), Echo (a location-based reminder app), and GPZ (a GPA tracker).";
  }

  if (message.includes('service') || message.includes('hire') || message.includes('work together')) {
    return "Through Isami Technologies, I offer web development, e-commerce solutions, AI chatbots, UI/UX design, branding, SEO services, and mobile app development. I'm always open to discussing new projects!";
  }

  if (message.includes('contact') || message.includes('reach') || message.includes('email')) {
    return "You can reach me through the contact form on my website at drealdumore.vercel.app, or connect with me on my social media profiles.";
  }

  if (message.includes('mobile') || message.includes('app') || message.includes('react native')) {
    return "I develop mobile apps using React Native and Expo. Some of my notable mobile projects include Echo, a location-based reminder app with geofencing capabilities, and GPZ, a GPA tracker for students.";
  }

  return "Hi! I'm Samuel Isah, a full-stack developer specializing in React, Next.js, and React Native. I run Isami Technologies and love building modern web and mobile applications. What would you like to know about my work, skills, or projects?";
}