import { NextRequest, NextResponse } from 'next/server';
import ollama from 'ollama';  // Import the Node.js Ollama SDK

export async function POST(request: NextRequest) {
  try {
    const { text, context = 'general' } = await request.json();

    // Decide model
    const isCode = context === 'code' || /function|class|import|def|error|exception/.test(text);
    const model = isCode ? 'codellama:7b' : 'llama3.2:3b';

    // Compose your AI prompt
    const prompt = isCode
      ? `Analyze this code or error and provide step-by-step debugging and best practices:\n\n${text}`
      : `Summarize and provide insights for this screen text:\n\n${text}`;

    // Call Ollama
    const response = await ollama.chat({
      model,
      // Up-to-date Ollama SDK uses `messages` for chat
      messages: [{
        role: 'user',
        content: prompt,
      }],
      stream: false,
    });

    // Parse out the text you want to show
    const aiAnswer = response.message.content || "No AI response.";

    return NextResponse.json({
      ai: aiAnswer,
      raw: response,
    });
  } catch (error) {
    console.error('Ollama error:', error);
    return NextResponse.json({ error: 'Ollama AI analysis failed.' }, { status: 500 });
  }
}
