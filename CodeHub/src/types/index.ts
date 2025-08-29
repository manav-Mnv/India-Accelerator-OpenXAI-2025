export interface ScreenAnalysis {
  id: string;
  timestamp: Date;
  extractedText: string;
  insights: Insight[];
  errors: CodeError[];
  suggestions: string[];
}

export interface Insight {
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  description: string;
}

export interface CodeError {
  line?: number;
  type: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  solution: string;
}

export interface CaptureState {
  isCapturing: boolean;
  isProcessing: boolean;
  lastAnalysis: ScreenAnalysis | null;
}
