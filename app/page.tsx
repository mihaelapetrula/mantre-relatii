"use client";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="landing">
      <div className="landing-inner">
        <span className="ornament">✦ ✦ ✦</span>
        <h1 className="landing-title">Mantre de Curățare pentru Relații</h1>
        <p className="landing-sub">RITUAL PERSONALIZAT</p>

        <div className="landing-divider" />

        <p className="landing-desc">
          Acest ritual te ghidează pas cu pas să eliberezi blocajele,
          emoțiile de joasă frecvență și tiparele ce îți îngreunează
          relațiile — cu partenerul, cu părintele sau cu tine însuți(ăți).
        </p>

        <div className="landing-cards">
          <div className="lcard">
            <span className="lcard-icon">💑</span>
            <p className="lcard-title">Cuplu / Partener</p>
            <p className="lcard-desc">
              Eliberează rănile, așteptările și tiparele din relația de cuplu
            </p>
          </div>
          <div className="lcard">
            <span className="lcard-icon">🪞</span>
            <p className="lcard-title">Relația cu Mine</p>
            <p className="lcard-desc">
              Vindecă relația cu tine însuți — valoare, iubire de sine și eliberare interioară
            </p>
          </div>
          <div className="lcard">
            <span className="lcard-icon">🤝</span>
            <p className="lcard-title">Părinte – Copil</p>
            <p className="lcard-desc">
              Vindecă loialitățile, vinovăția și rănile din copilărie
            </p>
          </div>
        </div>

        <div className="landing-steps">
          <p className="steps-title">Cum funcționează?</p>
          <div className="steps-list">
            {[
              "Completezi 5 întrebări simple",
              "Bifezi provocările și dorințele tale",
              "Primești mantra personalizată",
              "Descarci PDF-ul și îl folosești zilnic",
            ].map((s, i) => (
              <div key={i} className="step-item">
                <span className="step-num">{i + 1}</span>
                <span className="step-text">{s}</span>
              </div>
            ))}
          </div>
        </div>

        <Link href="/generator" className="btn-start">
          Începe ritualul tău ✦
        </Link>

        <p className="landing-author">Mihaela Petrula</p>
        <p className="landing-author-title">Trainer și Terapeut · Specialist în Terapii Complementare</p>
      </div>
    </main>
  );
}
