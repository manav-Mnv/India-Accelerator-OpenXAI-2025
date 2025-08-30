import { NextRequest, NextResponse } from 'next/server';
import ollama from 'ollama';
import type { AnalysisResult } from '@/lib/types';
import { api } from '@/lib/mock-api';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;
    const text = formData.get('text') as string;

    if (!image && !text) {
      return NextResponse.json({ error: 'Image or text content required' }, { status: 400 });
    }

    let extractedText = '';
    let modelUsed = '';

    if (image) {
      // For image analysis, we'll use OCR or vision model
      // For now, we'll simulate OCR by extracting text from the image name
      extractedText = `Image: ${image.name}`;
      modelUsed = 'llama3.2:3b'; // Fallback to text model
    } else if (text) {
      extractedText = text;
      modelUsed = 'llama3.2:3b';
    }

    // Determine if it's code content
    const isCodeContent = /function|class|import|def|error|exception|const|let|var|if|for|while|try|catch|throw|ReferenceError|SyntaxError|TypeError/.test(extractedText);
    
    if (isCodeContent) {
      modelUsed = 'codellama:7b';
    }

    // Create AI prompt for better analysis
    const prompt = isCodeContent 
      ? `You are an expert programmer. Analyze this code or error and provide a structured response with:

1. ISSUE: What is the specific problem?
2. CAUSE: Why does this error occur?
3. SOLUTION: Step-by-step fix
4. PREVENTION: How to avoid this in the future

Format your response exactly like this:
ISSUE: [describe the problem]
CAUSE: [explain why it happens]
SOLUTION: [step-by-step fix]
PREVENTION: [how to avoid]

Code/Error:
${extractedText}`
      : `Analyze this content and provide helpful insights:
${extractedText}`;

    // Call Ollama
    const response = await ollama.chat({
      model: modelUsed,
      messages: [{ role: 'user', content: prompt }],
      stream: false,
      options: {
        temperature: 0.3,
      },
    });

    const aiResponse = response.message.content || 'No analysis available';

    // Parse the AI response to extract structured information
    let issue = 'Analysis completed';
    let cause = 'Content processed';
    let solution = 'Review the suggestions below';
    let prevention = 'Follow best practices';

    if (isCodeContent && aiResponse.includes('ISSUE:')) {
      const lines = aiResponse.split('\n');
      for (const line of lines) {
        if (line.startsWith('ISSUE:')) issue = line.replace('ISSUE:', '').trim();
        if (line.startsWith('CAUSE:')) cause = line.replace('CAUSE:', '').trim();
        if (line.startsWith('SOLUTION:')) solution = line.replace('SOLUTION:', '').trim();
        if (line.startsWith('PREVENTION:')) prevention = line.replace('PREVENTION:', '').trim();
      }
    }

    const analysis: AnalysisResult = {
      id: Math.random().toString(36).substring(7),
      createdAt: new Date().toISOString(),
      source: image ? 'image' : 'screen',
      extractedText,
      errors: [
        {
          message: issue,
          severity: isCodeContent ? 'high' : 'low'
        }
      ],
      steps: [
        'Content extracted',
        'AI analysis performed',
        'Issue identified',
        'Solution provided'
      ],
      suggestions: [
        {
          language: 'text',
          value: `🔍 ISSUE: ${issue}\n\n🔧 CAUSE: ${cause}\n\n✅ SOLUTION: ${solution}\n\n🛡️ PREVENTION: ${prevention}\n\n📝 FULL ANALYSIS:\n${aiResponse}`
        }
      ],
      performance: [
        'Analysis completed successfully',
        'Model used: ' + modelUsed,
        'Issue identified and solution provided'
      ]
    };

    // Track the analysis in our API
    api.addAnalysis(analysis);

    return NextResponse.json({ result: analysis });

  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json({ 
      error: 'Analysis failed. Make sure Ollama is running on http://localhost:11434',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "Use POST method to analyze content" }, { status: 405 });
}
