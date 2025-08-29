import { NextRequest, NextResponse } from 'next/server';
import Tesseract from 'tesseract.js';

export async function POST(request: NextRequest) {
  try {
    const { imageData } = await request.json();
    if (!imageData) {
      return NextResponse.json({ error: 'Image data required' }, { status: 400 });
    }

    // Use Tesseract.js to extract text from the image
    const { data: { text, confidence } } = await Tesseract.recognize(
      imageData,
      'eng',
      {
        logger: m => {
          if (m.status === 'recognizing text') {
            console.log(`OCR Progress: ${Math.round(m.progress * 100)}%`);
          }
        }
      }
    );

    // Clean and return the extracted text
    const cleanedText = text.split('\n').map(line => line.trim()).filter(line => line.length > 0).join('\n');
    return NextResponse.json({
      text: cleanedText,
      confidence: Math.round(confidence),
      timestamp: new Date().toISOString(),
      wordCount: cleanedText.split(/\s+/).length
    });

  } catch (error) {
    console.error('OCR error:', error);
    return NextResponse.json({ error: 'OCR processing failed.' }, { status: 500 });
  }
}
