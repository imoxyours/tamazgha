"use client";
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="ar" dir="rtl">
      <body style={{ background: "#F3ECDD", color: "#2E2418", fontFamily: "system-ui, sans-serif", textAlign: "center", padding: "96px 16px" }}>
        <h1 style={{ fontSize: 40, marginBottom: 16 }}>حدث خطأ ما</h1>
        <p style={{ fontSize: 18, marginBottom: 32 }}>تعذر تحميل الصفحة. أعد المحاولة.</p>
        <button onClick={reset} style={{ background: "#D9951F", color: "#2E2418", border: 0, borderRadius: 12, padding: "12px 24px", fontSize: 16, fontWeight: 600, cursor: "pointer" }}>أعد المحاولة</button>
      </body>
    </html>
  );
}