"use client";
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="ar" dir="rtl">
      <body style={{ background: "#F3ECDD", color: "#2E2418", fontFamily: "system-ui, sans-serif", textAlign: "center", padding: "96px 16px" }}>
        <h1 style={{ fontSize: 40, marginBottom: 16 }}>وقع شي خطأ</h1>
        <p style={{ fontSize: 18, marginBottom: 32 }}>ما قدرناش نحملو الصفحة. عاود المحاولة.</p>
        <button onClick={reset} style={{ background: "#566032", color: "#FAF5EA", border: 0, borderRadius: 999, padding: "12px 24px", fontSize: 16, cursor: "pointer" }}>عاود المحاولة</button>
      </body>
    </html>
  );
}
