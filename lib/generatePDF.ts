import { POC, typeLabels, templates } from "@/data/mantre";

function safe(text: string): string {
  if (!text) return "";
  return text
    .replace(/ă/g, "a").replace(/Ă/g, "A")
    .replace(/â/g, "a").replace(/Â/g, "A")
    .replace(/î/g, "i").replace(/Î/g, "I")
    .replace(/ș/g, "s").replace(/Ș/g, "S")
    .replace(/ț/g, "t").replace(/Ț/g, "T")
    .replace(/ş/g, "s").replace(/Ş/g, "S")
    .replace(/ţ/g, "t").replace(/Ţ/g, "T");
}

interface FormData {
  userName: string;
  personName: string;
  relationType: string;
  feelingNow: string;
  selectedPains: string[];
  selectedWishes: string[];
  exitEnergy: string;
  selectedSelf: string | null;
}

export async function generatePDF(formData: FormData) {
  const { default: jsPDF } = await import("jspdf");

  const { userName, personName, relationType, feelingNow, selectedPains, selectedWishes, exitEnergy, selectedSelf } = formData;

  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = 210;
  const pageH = 297;
  const margin = 20;
  const contentW = pageW - margin * 2;

  const gold: [number, number, number]      = [184, 146, 74];
  const purple: [number, number, number]    = [61, 44, 110];
  const grayLight: [number, number, number] = [190, 182, 210];
  const purpleBg: [number, number, number]  = [237, 229, 247];
  const cream: [number, number, number]     = [248, 245, 235];

  let y = 0;

  function footer() {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(7.5);
    doc.setTextColor(...grayLight);
    doc.text("Mihaela Petrula · Trainer si Terapeut · Specialist in Terapii Complementare", pageW / 2, pageH - 9, { align: "center" });
    doc.setTextColor(...gold);
    doc.setFontSize(9);
    doc.text("* * *", pageW / 2, pageH - 15, { align: "center" });
  }

  function newPage() {
    footer();
    doc.addPage();
    y = margin;
  }

  function check(h: number) {
    if (y + h > pageH - 22) newPage();
  }

  // ─── COPERTĂ ─────────────────────────────────────────────────────
  doc.setFillColor(245, 240, 255);
  doc.rect(0, 0, pageW, pageH, "F");
  doc.setFillColor(...purpleBg);
  doc.rect(0, 0, pageW, 60, "F");

  // Titlu
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(...purple);
  doc.text("Mantre de Curatare pentru Relatii", pageW / 2, 28, { align: "center" });

  // Subtitlu
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...gold);
  doc.text("RITUAL PERSONALIZAT", pageW / 2, 38, { align: "center" });

  doc.setDrawColor(...gold);
  doc.setLineWidth(0.4);
  doc.line(margin + 20, 46, pageW - margin - 20, 46);

  // Autor
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  doc.setTextColor(...grayLight);
  doc.text("Mihaela Petrula · Trainer si Terapeut · Specialist in Terapii Complementare", pageW / 2, 55, { align: "center" });

  y = 68;

  // Info ritual — compact, inline
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...purple);
  doc.text(safe(`Ritual creat pentru: ${userName || "—"}`), margin, y);
  y += 7;
  doc.text(safe(`${typeLabels[relationType] || ""} · Lucrezi cu: ${personName || "—"}`), margin, y);
  y += 7;

  if (feelingNow) {
    const fl = doc.splitTextToSize(safe(`"${feelingNow}"`), contentW);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9.5);
    doc.setTextColor(120, 90, 180);
    fl.forEach((line: string) => { doc.text(line, margin, y); y += 5.5; });
    y += 2;
  }

  doc.setDrawColor(...grayLight);
  doc.setLineWidth(0.2);
  doc.line(margin, y, pageW - margin, y);
  y += 8;

  // Provocări — chips inline
  if (selectedPains.length > 0) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...gold);
    doc.text("PROVOCARI:", margin, y);
    y += 6;
    y = renderChips(doc, selectedPains, margin, y, pageW, grayLight, purple, [245, 240, 255]);
    y += 4;
  }

  // Intenții — chips inline
  if (selectedWishes.length > 0) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...gold);
    doc.text("INTENTII:", margin, y);
    y += 6;
    y = renderChips(doc, selectedWishes, margin, y, pageW, gold, [138, 96, 32], cream);
    y += 4;
  }

  // Energie
  if (exitEnergy || selectedSelf) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...purple);
    const energyParts = [];
    if (exitEnergy) energyParts.push(safe(exitEnergy));
    if (selectedSelf) energyParts.push(safe(selectedSelf));
    doc.text(`Energie: ${energyParts.join(" · ")}`, margin, y);
    y += 8;
  }

  doc.setDrawColor(...gold);
  doc.setLineWidth(0.4);
  doc.line(margin + 20, y, pageW - margin - 20, y);
  y += 10;

  // ─── MANTRE — încep imediat pe aceeași pagină ─────────────────────
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8.5);
  doc.setTextColor(...gold);
  doc.text("Barierele jos · Barierele jos · Barierele jos · Barierele jos", pageW / 2, y, { align: "center" });
  y += 10;

  selectedPains.forEach((pain) => {
    const painTemplates = templates[relationType]?.[pain];
    if (!painTemplates) return;

    painTemplates.forEach((tmpl) => {
      const text = safe(tmpl.replace(/{p}/g, personName));
      const lines = doc.splitTextToSize(text, contentW - 7);
      const pocLines = doc.splitTextToSize(safe(POC), contentW - 7);
      check(lines.length * 5.8 + pocLines.length * 4.5 + 14);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...gold);
      doc.text(">", margin, y);

      doc.setTextColor(...purple);
      lines.forEach((line: string) => { doc.text(line, margin + 6, y); y += 5.8; });

      y += 1;
      doc.setFontSize(7.5);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(150, 140, 170);
      pocLines.forEach((line: string) => { doc.text(line, margin + 6, y); y += 4.5; });

      y += 4;
      doc.setDrawColor(...grayLight);
      doc.setLineWidth(0.15);
      doc.line(margin, y, pageW - margin, y);
      y += 6;
    });
  });

  // Bloc dorințe
  if (selectedWishes.length > 0) {
    const wt = safe(`Aleg acum sa creez in relatia mea cu ${personName}: ${selectedWishes.join(", ")}. Permit acestor calitati sa se manifeste cu usurinta si bucurie.`);
    const wl = doc.splitTextToSize(wt, contentW - 7);
    const pocL = doc.splitTextToSize(safe(POC), contentW - 7);
    check(wl.length * 5.8 + pocL.length * 4.5 + 14);

    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(...gold);
    doc.text("*", margin, y);
    doc.setTextColor(138, 96, 32);
    wl.forEach((line: string) => { doc.text(line, margin + 6, y); y += 5.8; });

    y += 1;
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(150, 140, 170);
    pocL.forEach((line: string) => { doc.text(line, margin + 6, y); y += 4.5; });

    y += 4;
    doc.setDrawColor(...grayLight);
    doc.setLineWidth(0.15);
    doc.line(margin, y, pageW - margin, y);
    y += 6;
  }

  // Comandă finală
  const cmdL = doc.splitTextToSize("Comand sa se extraga toate acestea si sa se distruga, decreeze in totalitate ACUM si pentru totdeauna.", contentW - 7);
  const pocC = doc.splitTextToSize(safe(POC), contentW - 7);
  check(cmdL.length * 5.8 + pocC.length * 4.5 + 20);

  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(...gold);
  doc.text("*", margin, y);
  doc.setTextColor(138, 96, 32);
  cmdL.forEach((line: string) => { doc.text(line, margin + 6, y); y += 5.8; });

  y += 1;
  doc.setFontSize(7.5);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(150, 140, 170);
  pocC.forEach((line: string) => { doc.text(line, margin + 6, y); y += 4.5; });

  y += 8;
  check(10);
  doc.setFontSize(13);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(...purple);
  doc.text("Asa sa fie si asa este.  *", pageW / 2, y, { align: "center" });
  y += 14;

  // ─── GHID — imediat după, fără pagină nouă forțată ───────────────
  check(60);

  doc.setDrawColor(...gold);
  doc.setLineWidth(0.4);
  doc.line(margin + 20, y, pageW - margin - 20, y);
  y += 8;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...purple);
  doc.text("Cum folosesti aceste mantre", pageW / 2, y, { align: "center" });
  y += 8;

  const ghid = [
    ["Citeste cu voce tare", "de 3-7 ori pe zi, 15-21 zile. Dimineata sau seara, prezent(a) cu tine."],
    ["Intentia ta", "Inainte sa incepi, reaminteste-ti ce vrei sa simti si sa creezi in aceasta relatie."],
    ["Ce poti simti", "Emotii, amintiri, senzatii in corp — inseamna ca energia se misca. Lasa-le sa treaca."],
    ["Noteaza schimbarile", "Un mesaj neasteptat, o conversatie mai usoara, o emotie care dispare — toate conteaza."],
    ["Actioneaza", "Mantrele deschid spatiu. Tu umpli acel spatiu cu actiuni concrete in fizic."],
    ["Fii atent(a) la cadouri", "Sincronicitatile si oamenii care apar sunt raspunsuri. Fac parte din rezultat."],
  ];

  ghid.forEach(([title, body]) => {
    const bl = doc.splitTextToSize(body, contentW - 20);
    check(bl.length * 5 + 10);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(...gold);
    doc.text("›", margin, y);
    doc.setTextColor(...purple);
    doc.text(title, margin + 5, y);
    y += 5.5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 120);
    bl.forEach((line: string) => { doc.text(line, margin + 5, y); y += 5; });
    y += 4;
  });

  // Box suport
  check(20);
  doc.setFillColor(...cream);
  doc.setDrawColor(...gold);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, contentW, 16, 3, 3, "FD");
  y += 6;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  doc.setTextColor(...purple);
  doc.text("Daca ai nevoie de suport in acest proces — contacteaza-ma. Sunt aici pentru tine.", pageW / 2, y, { align: "center" });
  y += 12;

  // Semnătură finală
  check(18);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...purple);
  doc.text("Mihaela Petrula", pageW / 2, y, { align: "center" });
  y += 6;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8.5);
  doc.setTextColor(...grayLight);
  doc.text("Trainer si Terapeut · Specialist in Terapii Complementare", pageW / 2, y, { align: "center" });
  y += 7;
  doc.setFontSize(11);
  doc.setTextColor(...gold);
  doc.text("* * *", pageW / 2, y, { align: "center" });

  footer();

  const filename = `Mantre_${(personName || "relatie").replace(/\s+/g, "_")}_${relationType}.pdf`;
  doc.save(filename);
}

function renderChips(
  doc: InstanceType<typeof import("jspdf").default>,
  items: string[],
  margin: number,
  startY: number,
  pageW: number,
  borderColor: [number, number, number],
  fontColor: [number, number, number],
  fillColor: [number, number, number]
): number {
  let chipX = margin;
  let y = startY;
  const chipH = 7;
  doc.setFontSize(8);

  items.forEach((item) => {
    const s = item
      .replace(/ă/g, "a").replace(/Ă/g, "A")
      .replace(/â/g, "a").replace(/Â/g, "A")
      .replace(/î/g, "i").replace(/Î/g, "I")
      .replace(/ș/g, "s").replace(/Ș/g, "S")
      .replace(/ț/g, "t").replace(/Ț/g, "T")
      .replace(/ş/g, "s").replace(/Ş/g, "S")
      .replace(/ţ/g, "t").replace(/Ţ/g, "T");

    const chipW = doc.getTextWidth(s) + 8;
    if (chipX + chipW > pageW - margin) { chipX = margin; y += chipH + 2; }
    doc.setFillColor(...fillColor);
    doc.setDrawColor(...borderColor);
    doc.setLineWidth(0.25);
    doc.roundedRect(chipX, y - 5, chipW, chipH, 2, 2, "FD");
    doc.setTextColor(...fontColor);
    doc.setFont("helvetica", "normal");
    doc.text(s, chipX + 4, y + 0.5);
    chipX += chipW + 3;
  });

  return y;
}
