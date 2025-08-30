import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData()
    const file = form.get("image")
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No image provided (field name 'image')" }, { status: 400 })
    }
    const arr = await file.arrayBuffer()
    const buf = Buffer.from(arr)

    const Tesseract = await import("tesseract.js")
    const res = await Tesseract.recognize(buf, "eng")
    const text = (res.data?.text || "").trim()

    return NextResponse.json({ text })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "OCR failed" }, { status: 500 })
  }
}
