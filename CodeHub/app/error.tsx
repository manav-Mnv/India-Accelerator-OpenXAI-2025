"use client"

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body>
        <main className="mx-auto grid min-h-screen max-w-lg place-items-center p-6 text-center">
          <div>
            <h1 className="text-2xl font-semibold">Something went wrong</h1>
            <p className="mt-2 text-muted-foreground">{error.message}</p>
            <button className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white" onClick={reset}>
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  )
}
