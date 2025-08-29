'use client';
import { useState, useCallback } from 'react';
import type { ScreenAnalysis } from '@/types';

export const useAnalysis = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastAnalysis, setLastAnalysis] = useState<ScreenAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeScreen = useCallback(async (imageData: string): Promise<ScreenAnalysis | null> => {
    setIsProcessing(true);
    setError(null);

    try {
      // Step 1: Extract text with OCR
      const ocrResponse = await fetch('/api/ocr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageData })
      });

      if (!ocrResponse.ok) {
        throw new Error('OCR failed');
      }

      const { text } = await ocrResponse.json();

      if (!text || text.trim().length < 10) {
        const lowTextAnalysis: ScreenAnalysis = {
          id: Math.random().toString(36).substring(7),
          timestamp: new Date(),
          extractedText: text || '',
          insights: [{
            type: 'warning',
            title: 'Low Text Detection',
            description: 'Not enough text found. Try capturing a screen with more content or code.'
          }],
          errors: [],
          suggestions: ['Make sure your IDE has text visible', 'Try larger font sizes']
        };
        setLastAnalysis(lowTextAnalysis);
        return lowTextAnalysis;
      }

      // Step 2: Analyze with AI
      const analysisResponse = await fetch('/api/screen-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text, 
          context: text.includes('import') || text.includes('function') ? 'code' : 'general' 
        })
      });

      if (!analysisResponse.ok) {
        throw new Error('AI analysis failed');
      }

      const analysis: ScreenAnalysis = await analysisResponse.json();
      setLastAnalysis(analysis);
      return analysis;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Analysis failed';
      setError(errorMessage);
      return null;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return {
    isProcessing,
    lastAnalysis,
    error,
    analyzeScreen,
    clearError: () => setError(null)
  };
};
