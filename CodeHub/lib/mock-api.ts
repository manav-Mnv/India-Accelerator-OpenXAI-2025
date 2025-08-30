// Real API service for tracking usage data
import type { AnalysisResult, Activity } from "./types"

// In-memory storage (in a real app, this would be a database)
let analysisCount = 0
let projectCount = 0
let errorCount = 0
let activities: Activity[] = []
let analyses: AnalysisResult[] = []

export const api = {
  // Dashboard stats
  getStats() {
    return {
      users: 18240,
      projects: projectCount,
      errorsSolved: errorCount,
      analyses: analysisCount,
    }
  },

  // Track new analysis
  addAnalysis(analysis: AnalysisResult) {
    analysisCount++
    analyses.unshift(analysis)
    
    // Add activity
    const activity: Activity = {
      id: Math.random().toString(36).substring(7),
      type: "screen-analysis",
      timestamp: new Date().toISOString(),
      title: "Screen Analysis",
      summary: `Analyzed ${analysis.source} content`,
      resultId: analysis.id,
    }
    activities.unshift(activity)
    
    return analysis
  },

  // Track new project
  addProject() {
    projectCount++
    
    const activity: Activity = {
      id: Math.random().toString(36).substring(7),
      type: "project-share",
      timestamp: new Date().toISOString(),
      title: "New Project Shared",
      summary: "Project published successfully",
      projectId: `p${projectCount}`,
    }
    activities.unshift(activity)
    
    return { id: `p${projectCount}`, count: projectCount }
  },

  // Track error solved
  solveError() {
    errorCount++
    
    const activity: Activity = {
      id: Math.random().toString(36).substring(7),
      type: "screen-analysis",
      timestamp: new Date().toISOString(),
      title: "Error Solved",
      summary: "Code issue resolved",
    }
    activities.unshift(activity)
    
    return { count: errorCount }
  },

  // Get recent activities
  getActivities(limit = 10) {
    return activities.slice(0, limit)
  },

  // Get recent analyses
  getAnalyses(limit = 10) {
    return analyses.slice(0, limit)
  },

  // Reset counters (for testing)
  reset() {
    analysisCount = 0
    projectCount = 0
    errorCount = 0
    activities = []
    analyses = []
  }
}
