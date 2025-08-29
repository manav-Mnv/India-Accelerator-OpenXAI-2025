"use client"
import React, { useRef, useState, useEffect } from "react";
import { Send } from "lucide-react";

export default function AITutorSimpleUI() {
  const [messages, setMessages] = useState<{ id: string; from: "student" | "ai"; text: string }[]>([
    { id: "1", from: "ai", text: "Hi! I'm your AI tutor. What topic shall we work on today?" },
  ]);
  const [chatInput, setChatInput] = useState("");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e: React.MouseEvent) => {
    setIsDrawing(true);
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => setIsDrawing(false);

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    setMessages([...messages, { id: Date.now().toString(), from: "student", text: chatInput }]);
    setChatInput("");
    setTimeout(() => {
      setMessages((msgs) => [...msgs, { id: Date.now().toString(), from: "ai", text: "Got it! Let's work on that." }]);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 space-y-4">
      <h1 className="text-xl font-bold">AI Tutor</h1>

      {/* Whiteboard */}
      <div className="bg-white p-2 rounded shadow">
        <h2 className="font-medium mb-2">Whiteboard</h2>
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="border w-full h-72 bg-white"
        />
      </div>

      {/* Chat */}
      <div className="bg-white p-2 rounded shadow">
        <h2 className="font-medium mb-2">Chat</h2>
        <div className="h-48 overflow-y-auto border p-2 mb-2 bg-gray-50">
          {messages.map((m) => (
            <div key={m.id} className={m.from === "student" ? "text-right" : "text-left"}>
              <span className={`inline-block px-2 py-1 rounded ${m.from === "student" ? "bg-indigo-500 text-white" : "bg-gray-200"}`}>
                {m.text}
              </span>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 border rounded px-2"
            placeholder="Type a message"
          />
          <button onClick={sendMessage} className="bg-indigo-500 text-white px-3 rounded">
            <Send size={16} />
          </button>
        </div>
      </div>

      {/* Performance placeholder */}
      <div className="bg-white p-2 rounded shadow">
        <h2 className="font-medium mb-2">Performance Dashboard</h2>
        <p className="text-sm text-gray-600">Progress tracking coming soon...</p>
      </div>
    </div>
  );
}
