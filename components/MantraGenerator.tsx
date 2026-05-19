"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  painsByType,
  wishesByType,
  selfStates,
  typeLabels,
} from "@/data/mantre";

const TOTAL_STEPS = 5;
const MAX_PAINS = 5;
const MAX_WISHES = 5;

export default function MantraGenerator() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [userName, setUserName] = useState("");
  const [personName, setPersonName] = useState("");
  const [relationType, setRelationType] = useState<string | null>(null);
  const [feelingNow, setFeelingNow] = useState("");
  const [selectedPains, setSelectedPains] = useState<string[]>([]);
  const [selectedWishes, setSelectedWishes] = useState<string[]>([]);
  const [exitEnergy, setExitEnergy] = useState("");
  const [selectedSelf, setSelectedSelf] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function goTo(target: number) {
    setError("");
    if (target === 2 && !relationType) {
      setError("Te rog alege tipul de relație.");
      return;
    }
    if (target === 4 && selectedPains.length === 0) {
      setError("Te rog alege cel puțin o provocare.");
      return;
    }
    if (target === 5 && selectedWishes.length === 0) {
      setError("Te rog alege cel puțin o dorință.");
      return;
    }
    setStep(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleTypeSelect(type: string) {
    setRelationType(type);
    setSelectedPains([]);
    setSelectedWishes([]);
  }

  function toggleItem(
    item: string,
    list: string[],
    setList: (v: string[]) => void,
    max: number
  ) {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else if (list.length < max) {
      setList([...list, item]);
    }
  }

  async function handleGenerate() {
    setLoading(true);
    try {
      const { generatePDF } = await import("@/lib/generatePDF");
      await generatePDF({
        userName,
        personName: personName || "această persoană",
        relationType: relationType!,
        feelingNow,
        selectedPains,
        selectedWishes,
        exitEnergy,
        selectedSelf,
      });
      router.push("/multumesc");
    } catch (err) {
      console.error(err);
      setError("A apărut o eroare la generarea PDF-ului. Încearcă din nou.");
      setLoading(false);
    }
  }

  function ProgressBar() {
    return (
      <div className="progress-bar">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div
            key={i}
            className={`progress-dot ${
              i + 1 < step ? "done" : i + 1 === step ? "active" : ""
            }`}
          />
        ))}
      </div>
    );
  }

  function Chip({
    label,
    active,
    disabled,
    onClick,
  }: {
    label: string;
    active: boolean;
    disabled?: boolean;
    onClick: () => void;
  }) {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled && !active}
        className={`chip ${active ? "active" : ""} ${
          disabled && !active ? "disabled" : ""
        }`}
      >
        {label}
      </button>
    );
  }

  return (
    <main className="generator-page">
      <div className="generator-inner">
        <div className="gen-header">
          <span className="ornament">✦ ✦ ✦</span>
          <h1 className="gen-title">Mantre de <em>Curățare</em> pentru Relații</h1>
          <p className="gen-sub">RITUAL PERSONALIZAT</p>
        </div>

        <ProgressBar />

        {error && <p className="error-msg">{error}</p>}

        {step === 1 && (
          <div className="step-block">
            <label className="q-label">
              Numele tău
              <span className="q-sub">CUM VREI SĂ APARI PE MANTRA TA</span>
            </label>
            <input
              type="text"
              className="r-input"
              placeholder="Prenumele tău..."
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />

            {relationType !== "sine" && (
              <>
                <div className="q-spacer" />
                <label className="q-label">
                  Pentru cine creezi acest ritual?
                  <span className="q-sub">
                    SCRIE CLAR NUMELE PERSOANEI CU CARE LUCREZI
                  </span>
                </label>
                <input
                  type="text"
                  className="r-input"
                  placeholder="Prenumele persoanei..."
                  value={personName}
                  onChange={(e) => setPersonName(e.target.value)}
                />
              </>
            )}

            <div className="q-spacer" />

            <label className="q-label">
              Ce tip de relație dorești să curești?
              <span className="q-sub">ALEGE UN SINGUR TIP</span>
            </label>
            <div className="chips">
              {Object.entries(typeLabels).map(([key, label]) => (
                <Chip
                  key={key}
                  label={label}
                  active={relationType === key}
                  onClick={() => handleTypeSelect(key)}
                />
              ))}
            </div>

            <div className="nav-row">
              <button className="btn-next" onClick={() => goTo(2)}>
                Continuă →
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="step-block">
            <label className="q-label">
              {relationType === "sine"
                ? "Cum te simți acum în relația cu tine?"
                : "Cum te simți acum în această relație?"}
              <span className="q-sub">
                DESCRIE CU CUVINTELE TALE — FII SINCER(Ă) CU TINE
              </span>
            </label>
            <textarea
              className="r-input r-textarea"
              rows={5}
              placeholder={relationType === "sine"
                ? "ex: Mă simt obosit(ă), pierdut(ă), critic(ă) față de mine. Simt că nu sunt destul..."
                : "ex: Mă simt epuizat(ă), îndepărtat(ă), blocat(ă). Simt că nu mă înțelege nimeni..."}
              value={feelingNow}
              onChange={(e) => setFeelingNow(e.target.value)}
            />

            <div className="nav-row">
              <button className="btn-back" onClick={() => goTo(1)}>
                ←
              </button>
              <button className="btn-next" onClick={() => goTo(3)}>
                Continuă →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step-block">
            <label className="q-label">
              Care sunt principalele tale provocări în această relație?
              <span className="q-sub">BIFEAZĂ MAXIMUM 5</span>
            </label>
            <div className="chips">
              {relationType && painsByType[relationType]?.map((pain) => (
                <Chip
                  key={pain}
                  label={pain}
                  active={selectedPains.includes(pain)}
                  disabled={selectedPains.length >= MAX_PAINS}
                  onClick={() =>
                    toggleItem(pain, selectedPains, setSelectedPains, MAX_PAINS)
                  }
                />
              ))}
            </div>
            <p className="hint">
              {selectedPains.length === 0
                ? "Poți alege maximum 5."
                : selectedPains.length >= MAX_PAINS
                ? "Ai ales 5 din 5."
                : `Ai ales ${selectedPains.length}. Mai poți alege ${MAX_PAINS - selectedPains.length}.`}
            </p>

            <div className="nav-row">
              <button className="btn-back" onClick={() => goTo(2)}>
                ←
              </button>
              <button className="btn-next" onClick={() => goTo(4)}>
                Continuă →
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="step-block">
            <label className="q-label">
              Ce îți dorești să împlinești în această relație?
              <span className="q-sub">
                BIFEAZĂ MAXIMUM 5 — GÂNDEȘTE-TE LA CE VREI SĂ CREEZI
              </span>
            </label>
            <div className="chips">
              {relationType && wishesByType[relationType]?.map((wish) => (
                <Chip
                  key={wish}
                  label={wish}
                  active={selectedWishes.includes(wish)}
                  disabled={selectedWishes.length >= MAX_WISHES}
                  onClick={() =>
                    toggleItem(wish, selectedWishes, setSelectedWishes, MAX_WISHES)
                  }
                />
              ))}
            </div>
            <p className="hint">
              {selectedWishes.length === 0
                ? "Poți alege maximum 5."
                : selectedWishes.length >= MAX_WISHES
                ? "Ai ales 5 din 5."
                : `Ai ales ${selectedWishes.length}. Mai poți alege ${MAX_WISHES - selectedWishes.length}.`}
            </p>

            <div className="nav-row">
              <button className="btn-back" onClick={() => goTo(3)}>
                ←
              </button>
              <button className="btn-next" onClick={() => goTo(5)}>
                Continuă →
              </button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="step-block">
            <label className="q-label">
              Cu ce energie vrei să ieși din acest ritual?
              <span className="q-sub">
                UN CUVÂNT SAU O FRAZĂ SCURTĂ — CE SIMȚI CĂ AI NEVOIE
              </span>
            </label>
            <input
              type="text"
              className="r-input"
              placeholder="ex: Ușurință. Pace. Libertate. Iubire față de mine. Putere."
              value={exitEnergy}
              onChange={(e) => setExitEnergy(e.target.value)}
            />

            <div className="q-spacer" />

            <label className="q-label">
              Cum vrei să te simți în propria piele după acest ritual?
              <span className="q-sub">ALEGE O STARE</span>
            </label>
            <div className="chips">
              {selfStates.map((state) => (
                <Chip
                  key={state}
                  label={state}
                  active={selectedSelf === state}
                  onClick={() =>
                    setSelectedSelf(selectedSelf === state ? null : state)
                  }
                />
              ))}
            </div>

            <div className="nav-row">
              <button className="btn-back" onClick={() => goTo(4)}>
                ←
              </button>
              <button
                className="btn-next btn-generate"
                onClick={handleGenerate}
                disabled={loading}
              >
                {loading ? "Se generează..." : "Generează & descarcă PDF ✦"}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
