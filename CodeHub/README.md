# CodeHub  
<hr>  
<hr>  

A fun Next.js app that uses Ollama local models to provide real-time code analysis, intelligent chat assistance, and screen/image insights. Deployable locally—with ngrok for HTTPS—or on any NixOS infrastructure.

## Features

- 🖥️ Real-time Screen Analysis (HTTPS required)  
- 🤖 AI Chat Assistant for coding questions  
- 🖼️ Image Analysis: OCR + AI insights  
- 📊 Interactive Dashboard with activity metrics (mock data)  
- 🔗 Project Sharing UI demo (database required for persistence)  
- 📚 History System via browser storage  
- 🌙 Dark/Light Mode with persistence  
- 📱 Responsive Design  
- 🔒 100% Local AI Processing (no cloud)  
- ⚡ OCR Integration with Tesseract.js  

## Prerequisites

- Node.js 18+  
- Ollama installed and running (`ollama serve`)  
- Models pulled: `codellama:7b`, `llama3.2:3b`  
- ngrok installed for screen capture HTTPS (optional)  

## Quick Start (Development)

1. **Install dependencies**  
   ```bash
   npm install --legacy-peer-deps
   ```
2. **Pull AI models**  
   ```bash
   ollama pull codellama:7b
   ollama pull llama3.2:3b
   ```
3. **Start Ollama server**  
   ```bash
   ollama serve
   ```
4. **Start Next.js server**  
   ```bash
   npm run dev
   ```
5. **Open browser** at `http://localhost:3000`  

## HTTPS Setup for Screen Capture

Screen capture features require HTTPS. Use ngrok:

```bash
npm install -g ngrok
npm run dev
ngrok http 3000
```

Copy the HTTPS URL from ngrok and use it to access screen analysis.

## How to Use

- **AI Chat**: visit `/chat`, enter your question, get AI response.  
- **Image Analysis**: visit `/screen-analysis`, upload an image or capture screen (HTTPS).  
- **Dashboard**: visit `/dashboard` to view mock analytics.  
- **Projects**: visit `/projects` for UI demo (no persistence).  

## Project Structure

```
codehub/
├── app/
│   ├── api/
│   │   ├── analyze/route.ts
│   │   ├── ollama/chat/route.ts
│   │   └── ocr/route.ts
│   ├── chat/page.tsx
│   ├── dashboard/page.tsx
│   ├── history/page.tsx
│   ├── projects/page.tsx
│   ├── screen-analysis/page.tsx
│   └── page.tsx
├── components/
├── lib/
├── hooks/
├── public/
└── styles/
```

## API Endpoints

- POST `/api/analyze`  
- POST `/api/ollama/chat`  
- POST `/api/ocr`  

## Models

- `codellama:7b` (3.8 GB) – code analysis  
- `llama3.2:3b` (2.0 GB) – general text analysis  

## Limitations & Future Work

- Screen capture only works via HTTPS (ngrok).  
- Project sharing UI is demo only; requires database for real sharing.  
- History stored locally; cross-device sync needs backend.  
- No user authentication.  

Future: add database, auth, real collaboration, mobile app.

## Development Commands

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
ollama list
```

## License

MIT License  

**Enjoy building with CodeHub!**

## Developer Quick Start Guide

To get started as a developer on CodeHub, add this section to your `README.md`:

```markdown
## Developer Quick Start Guide

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/codehub.git && cd codehub
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Pull the required Ollama models**
   ```bash
   ollama pull codellama:7b
   ollama pull llama3.2:3b
   ```

4. **Start the Ollama server** (must be running before the app)
   ```bash
   ollama serve
   ```

5. **Start the Next.js development server**
   ```bash
   npm run dev
   ```

6. *(Optional)* **Expose HTTPS for screen capture**
   ```bash
   npm install -g ngrok
   ngrok http 3000
   ```
   Copy the HTTPS URL from ngrok and open it in your browser.

7. **Open your browser** at:
   - Local: `http://localhost:3000`
   - ngrok HTTPS URL (for screen capture)

### Common Scripts
```
# Start development server
npm run dev

# Build for production
npm run build

# Start production build
npm run start

# Run ESLint
npm run lint

# Run TypeScript checks
npm run typecheck
```
```

Paste this block into your `README.md` under a suitable heading.