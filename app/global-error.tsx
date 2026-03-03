"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0a0a0a",
            color: "#ffffff",
            fontFamily: "system-ui, sans-serif",
            padding: "1rem",
            position: "relative",
          }}
        >
          {/* Background text */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <span
              style={{
                fontSize: "30vw",
                fontWeight: 900,
                color: "rgba(255, 255, 255, 0.02)",
                lineHeight: 1,
                letterSpacing: "-0.05em",
              }}
            >
              ERROR
            </span>
          </div>

          <div style={{ textAlign: "center", maxWidth: "400px", position: "relative", zIndex: 10 }}>
            <div
              style={{
                width: "80px",
                height: "80px",
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 2rem",
              }}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
              </svg>
            </div>

            <h1
              style={{
                fontSize: "2.5rem",
                fontWeight: 900,
                marginBottom: "0.5rem",
                letterSpacing: "-0.02em",
              }}
            >
              SOMETHING
            </h1>
            <h1
              style={{
                fontSize: "2.5rem",
                fontWeight: 900,
                marginBottom: "1.5rem",
                letterSpacing: "-0.02em",
                color: "#C7A257",
              }}
            >
              BROKE
            </h1>

            <p
              style={{
                color: "rgba(255, 255, 255, 0.4)",
                marginBottom: "2.5rem",
                lineHeight: "1.6",
                fontWeight: 300,
              }}
            >
              A critical error has occurred. Please try again.
            </p>

            <button
              onClick={() => reset()}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "1rem 1.5rem",
                backgroundColor: "#ffffff",
                color: "#0a0a0a",
                fontWeight: 700,
                fontSize: "0.875rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                border: "none",
                cursor: "pointer",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                <path d="M16 16h5v5" />
              </svg>
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
