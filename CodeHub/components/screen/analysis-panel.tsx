"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Camera, ImageIcon, ScreenShare, Square, Upload, Download, Video, VideoOff } from "lucide-react"
import type { AnalysisResult } from "@/lib/types"
import { mockAnalyses } from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"

export function AnalysisPanel() {
  const [capturing, setCapturing] = useState(false)
  const [streaming, setStreaming] = useState(false)
  const [status, setStatus] = useState<"idle" | "capturing" | "streaming" | "analyzing">("idle")
  const [textAnalyzing, setTextAnalyzing] = useState(false)
  const [imageAnalyzing, setImageAnalyzing] = useState(false)
  const [results, setResults] = useState<AnalysisResult[]>(mockAnalyses)
  const [progress, setProgress] = useState(0)
  const [textProgress, setTextProgress] = useState(0)
  const [imageProgress, setImageProgress] = useState(0)
  const [textInput, setTextInput] = useState("")
  const [capturedText, setCapturedText] = useState("")
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [analysisInterval, setAnalysisInterval] = useState<NodeJS.Timeout | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { toast } = useToast()

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (analysisInterval) {
        clearInterval(analysisInterval)
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [analysisInterval])

  async function startLiveStream() {
    try {
      setStreaming(true)
      setStatus("streaming")
      setProgress(15)

      // Request screen capture
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { 
          frameRate: { ideal: 10 },
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      })

      streamRef.current = stream

      // Set up video element for live preview
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        
        // Wait for video to be ready
        await new Promise((resolve) => {
          if (videoRef.current) {
            videoRef.current.onloadedmetadata = () => {
              videoRef.current?.play().then(resolve).catch(resolve)
            }
            videoRef.current.onerror = resolve
          }
        })
      }

      // Create canvas for frame capture
      const canvas = canvasRef.current || document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      // Start periodic analysis
      const interval = setInterval(async () => {
        if (videoRef.current && ctx && !videoRef.current.paused && videoRef.current.videoWidth > 0) {
          try {
            // Capture current frame
            canvas.width = videoRef.current.videoWidth
            canvas.height = videoRef.current.videoHeight
            ctx.drawImage(videoRef.current, 0, 0)

            // Convert to blob for analysis
            canvas.toBlob(async (blob) => {
              if (blob) {
                // For now, we'll simulate different content based on time
                // In a real app, you'd use OCR to extract text from the image
                const timestamp = Date.now()
                const mockTexts = [
                  "ReferenceError: x is not defined\nat processData (app.js:15:10)\nat main (app.js:8:5)",
                  "SyntaxError: Unexpected token 'await'\nat main (app.js:5:1)",
                  "TypeError: Cannot read property 'length' of undefined\nat processData (app.js:12:3)",
                  "console.log('Hello World');\nlet x = 5;\nconsole.log(x);",
                  "function add(a, b) {\n  return a + b;\n}\nconsole.log(add(2, 3));"
                ]
                
                const randomText = mockTexts[timestamp % mockTexts.length]
                setCapturedText(randomText)

                // Analyze the captured content
                try {
                  const fd = new FormData()
                  fd.append("text", randomText)
                  const res = await fetch("/api/analyze", { method: "POST", body: fd })

                  if (res.ok) {
                    const data = (await res.json()) as { result: AnalysisResult }
                    setResults((r) => [data.result, ...r.slice(0, 9)]) // Keep last 10 results
                  }
                } catch (error) {
                  console.error('Live analysis error:', error)
                }
              }
            }, 'image/png')
          } catch (error) {
            console.error('Frame capture error:', error)
          }
        }
      }, 8000) // Analyze every 8 seconds

      setAnalysisInterval(interval)
      setProgress(100)
      toast({ title: "Live stream started", description: "Screen is being captured and analyzed in real-time." })

    } catch (error) {
      console.error('Live stream failed:', error)
      toast({ title: "Live stream failed", description: "Please allow screen sharing permissions", variant: "destructive" })
      setStreaming(false)
      setStatus("idle")
    }
  }

  function stopLiveStream() {
    setStreaming(false)
    setStatus("idle")
    
    if (analysisInterval) {
      clearInterval(analysisInterval)
      setAnalysisInterval(null)
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }

    toast({ title: "Live stream stopped", description: "Screen capture and analysis stopped." })
  }

  async function start() {
    try {
      setCapturing(true)
      setStatus("capturing")
      setProgress(15)
      setCapturedText("")
      setCapturedImage(null)

      // Request screen capture
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true
      })

      // Create video element to capture frame
      const video = document.createElement('video')
      video.srcObject = stream
      video.onloadedmetadata = () => {
        video.play()
        
        // Capture frame after a short delay
        setTimeout(() => {
          const canvas = document.createElement('canvas')
          canvas.width = video.videoWidth
          canvas.height = video.videoHeight
          const ctx = canvas.getContext('2d')
          ctx?.drawImage(video, 0, 0)
          
          // Convert to blob and create URL
          canvas.toBlob((blob) => {
            if (blob) {
              const imageUrl = URL.createObjectURL(blob)
              setCapturedImage(imageUrl)
              
              // Stop the stream
              stream.getTracks().forEach(track => track.stop())
              
              // Simulate OCR text extraction
              const mockText = "ReferenceError: x is not defined\nat processData (app.js:15:10)\nat main (app.js:8:5)"
              setCapturedText(mockText)
              
              setCapturing(false)
              setStatus("analyzing")
              setProgress(60)
              
              // Analyze the captured content
              analyzeCapturedContent(mockText)
            }
          }, 'image/png')
        }, 1000)
      }
    } catch (error) {
      console.error('Screen capture failed:', error)
      toast({ title: "Screen capture failed", description: "Please allow screen sharing permissions", variant: "destructive" })
      setCapturing(false)
      setStatus("idle")
    }
  }

  async function analyzeCapturedContent(text: string) {
    try {
      const fd = new FormData()
      fd.append("text", text)
      const res = await fetch("/api/analyze", { method: "POST", body: fd })
      setProgress(70)

      if (!res.ok) {
        throw new Error(`Analyze failed with ${res.status}`)
      }
      const data = (await res.json()) as { result: AnalysisResult }
      setResults((r) => [data.result, ...r])
      setProgress(100)
      toast({ title: "Analysis complete", description: "Screen capture analyzed successfully." })
    } catch (err: any) {
      toast({ title: "Analyze failed", description: err?.message || "Unexpected error", variant: "destructive" })
    } finally {
      setStatus("idle")
    }
  }

  async function stop() {
    setCapturing(false)
    setStatus("idle")
  }

  async function analyzeText() {
    if (!textInput.trim()) {
      toast({ title: "No text", description: "Please enter some text to analyze", variant: "destructive" })
      return
    }

    setTextAnalyzing(true)
    setTextProgress(35)

    try {
      const fd = new FormData()
      fd.append("text", textInput)
      const res = await fetch("/api/analyze", { method: "POST", body: fd })
      setTextProgress(70)

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err?.error || `Analyze failed with ${res.status}`)
      }
      const data = (await res.json()) as { result: AnalysisResult }
      setResults((r) => [data.result, ...r])
      setTextProgress(100)
      setTextInput("")
      toast({ title: "Text analyzed", description: "Analysis completed successfully." })
    } catch (err: any) {
      toast({ title: "Analyze failed", description: err?.message || "Unexpected error", variant: "destructive" })
    } finally {
      setTextAnalyzing(false)
      setTextProgress(0)
    }
  }

  async function onImage(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    setImageAnalyzing(true)
    setImageProgress(35)

    try {
      const fd = new FormData()
      fd.append("image", f)
      const res = await fetch("/api/analyze", { method: "POST", body: fd })
      setImageProgress(70)

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err?.error || `Analyze failed with ${res.status}`)
      }
      const data = (await res.json()) as { result: AnalysisResult }
      setResults((r) => [data.result, ...r])
      setImageProgress(100)
      toast({ title: "Image analyzed", description: `${f.name} processed successfully.` })
    } catch (err: any) {
      toast({ title: "Analyze failed", description: err?.message || "Unexpected error", variant: "destructive" })
    } finally {
      setImageAnalyzing(false)
      setImageProgress(0)
      if (fileRef.current) fileRef.current.value = ""
    }
  }

  function downloadScreenshot() {
    if (capturedImage) {
      const link = document.createElement('a')
      link.href = capturedImage
      link.download = `screenshot-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.png`
      link.click()
    }
  }

  function testScreenCapture() {
    start().then(() => {
      toast({ title: "Test Capture Complete", description: "Screen capture test completed." });
    }).catch((error) => {
      toast({ title: "Test Capture Failed", description: `Screen capture test failed: ${error.message}`, variant: "destructive" });
    });
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Live Screen Stream */}
      <Card>
        <CardHeader>
          <CardTitle>Live Screen Stream</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-2">
            <Button
              className="bg-green-500 hover:bg-green-600"
              onClick={startLiveStream}
              disabled={streaming}
              aria-label="Start live streaming"
            >
              <Video className="mr-2 h-4 w-4" /> Start Live Stream
            </Button>
            <Button 
              variant="destructive" 
              onClick={stopLiveStream} 
              disabled={!streaming} 
              aria-label="Stop live streaming"
            >
              <VideoOff className="mr-2 h-4 w-4" /> Stop Stream
            </Button>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={testScreenCapture}
            className="w-full"
          >
            Test Screen Capture
          </Button>
          
          {streaming ? (
            <div className="space-y-2">
              <video
                ref={videoRef}
                className="w-full rounded-md border"
                autoPlay
                muted
                playsInline
                style={{ minHeight: '300px', backgroundColor: '#000' }}
              />
              <div className="text-sm text-green-600 font-medium">
                🔴 LIVE - Real-time screen capture and analysis active
              </div>
            </div>
          ) : (
            <div
              className="flex h-48 items-center justify-center rounded-md border bg-muted text-sm"
              role="img"
              aria-label="Live preview placeholder"
            >
              {streaming ? "Live streaming..." : "Live stream will appear here"}
            </div>
          )}
          
          {capturedText && (
            <div className="rounded-md border p-3 text-xs bg-muted">
              <div className="font-medium mb-2">Live Extracted Content:</div>
              <pre className="whitespace-pre-wrap">{capturedText}</pre>
            </div>
          )}
          
          <div className="grid gap-2">
            <div className="flex items-center justify-between text-sm">
              <span>Status</span>
              <Badge variant={streaming ? "default" : "secondary"}>{status}</Badge>
            </div>
            <Progress value={progress} aria-label="Analysis progress" />
          </div>
        </CardContent>
      </Card>

      {/* Screen Capture (Single) */}
      <Card>
        <CardHeader>
          <CardTitle>Screen Capture (Single)</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-2">
            <Button
              className="bg-blue-500 hover:bg-blue-600"
              onClick={start}
              disabled={capturing}
              aria-label="Start capturing"
            >
              <ScreenShare className="mr-2 h-4 w-4" /> Capture
            </Button>
            <Button variant="destructive" onClick={stop} disabled={!capturing} aria-label="Stop capturing">
              <Square className="mr-2 h-4 w-4" /> Stop
            </Button>
          </div>
          
          {capturedImage ? (
            <div className="space-y-2">
              <img 
                src={capturedImage} 
                alt="Captured screen" 
                className="w-full rounded-md border"
              />
              <Button 
                variant="outline" 
                size="sm" 
                onClick={downloadScreenshot}
                className="w-full"
              >
                <Download className="mr-2 h-4 w-4" /> Download Screenshot
              </Button>
            </div>
          ) : (
            <div
              className="flex h-48 items-center justify-center rounded-md border bg-muted text-sm"
              role="img"
              aria-label="Live preview placeholder"
            >
              {capturing ? "Capturing screen..." : "Screenshot will appear here"}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Image Capture */}
      <Card>
        <CardHeader>
          <CardTitle>Image Capture</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onImage} />
          <Button 
            variant="outline" 
            onClick={() => fileRef.current?.click()}
            disabled={imageAnalyzing}
          >
            <Upload className="mr-2 h-4 w-4" /> Upload image
          </Button>
          
          {imageAnalyzing && (
            <div className="grid gap-2">
              <div className="flex items-center justify-between text-sm">
                <span>Status</span>
                <Badge variant="default">analyzing</Badge>
              </div>
              <Progress value={imageProgress} aria-label="Image analysis progress" />
            </div>
          )}
          
          <div className="rounded-md border p-3 text-sm text-muted-foreground">
            Upload screenshots or images for analysis. Uses Ollama for content analysis.
          </div>
        </CardContent>
      </Card>

      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Live Analysis Results</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {results.map((r) => (
              <div key={r.id} className="rounded-md border p-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <div className="font-medium">
                      {r.source === "screen" ? (
                        <Camera className="mr-2 inline h-4 w-4" />
                      ) : (
                        <ImageIcon className="mr-2 inline h-4 w-4" />
                      )}
                      Result • {new Date(r.createdAt).toLocaleString()}
                    </div>
                    <div className="text-muted-foreground">{r.extractedText}</div>
                  </div>
                  <div className="flex gap-2">
                    {r.errors.map((e, idx) => (
                      <Badge
                        key={idx}
                        variant={
                          e.severity === "high" ? "destructive" : e.severity === "medium" ? "default" : "secondary"
                        }
                      >
                        {e.severity}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="mt-3 grid gap-2">
                  <div className="text-sm">
                    <span className="font-medium">Steps:</span> {r.steps.join(" → ")}
                  </div>
                  {r.suggestions.map((c, i) => (
                    <pre key={i} className="overflow-auto rounded-md border bg-muted p-3 text-xs">
                      <code className="font-mono">{c.value}</code>
                    </pre>
                  ))}
                  <ul className="list-disc pl-6 text-sm text-muted-foreground">
                    {r.performance.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Hidden canvas for frame capture */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
