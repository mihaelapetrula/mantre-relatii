"use client";
import Link from "next/link";

export default function MultumescPage() {
  return (
    <main className="thanks-page">
      <div className="thanks-inner">
        <span className="ornament">✦ ✦ ✦</span>
        <h1 className="thanks-title">Ritualul tău este gata!</h1>
        <p className="thanks-sub">PDF-ul a fost descărcat pe dispozitivul tău.</p>

        <div className="thanks-card">
          <p className="thanks-instruction">
            🌹 Citește mantrele cu voce tare, de <strong>3–7 ori zilnic</strong>,
            cu intenție clară, timp de <strong>15–21 de zile</strong>.
          </p>
          <p className="thanks-instruction">
            🌹 Percepe ce se schimbă în corp. Notează schimbările.
          </p>
          <p className="thanks-instruction">
            🌹 Tu faci <strong>50%</strong> — universul face celelalte <strong>50%</strong>.
            Tu faci prima și inviți să se manifeste!
          </p>
        </div>

        <p className="thanks-closing">Așa să fie și așa este. ✦</p>

        <div className="thanks-actions">
          <Link href="/generator" className="btn-secondary">
            Creează un nou ritual
          </Link>
          <Link href="/" className="btn-ghost">
            Înapoi acasă
          </Link>
        </div>

        <p className="thanks-author">Mihaela Petrula</p>
      </div>
    </main>
  );
}
