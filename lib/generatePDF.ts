import { POC, typeLabels, mantreByType } from "@/data/mantre";

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
  const margin = 18;
  const contentW = pageW - margin * 2;

  const gold: [number, number, number]      = [184, 146, 74];
  const purple: [number, number, number]    = [61, 44, 110];
  const grayLight: [number, number, number] = [190, 182, 210];
  const purpleBg: [number, number, number]  = [237, 229, 247];
  const cardBg: [number, number, number]    = [245, 241, 255];
  const cream: [number, number, number]     = [248, 245, 235];

  let y = 0;

  function footer() {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(7);
    doc.setTextColor(...grayLight);
    doc.text("Mihaela Petrula · Trainer si Terapeut · Specialist in Terapii Complementare", pageW / 2, pageH - 8, { align: "center" });
  }

  function newPage() {
    footer();
    doc.addPage();
    y = margin;
  }

  function check(h: number) {
    if (y + h > pageH - 18) newPage();
  }

  // ─── COPERTĂ ─────────────────────────────────────────────────────
  doc.setFillColor(245, 240, 255);
  doc.rect(0, 0, pageW, pageH, "F");

  // Header band
  doc.setFillColor(...purpleBg);
  doc.rect(0, 0, pageW, 52, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(...purple);
  doc.text("Mantre de Curatare pentru Relatii", pageW / 2, 22, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...gold);
  doc.text("RITUAL PERSONALIZAT", pageW / 2, 32, { align: "center" });

  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  doc.setTextColor(...grayLight);
  doc.text("Mihaela Petrula · Trainer si Terapeut · Specialist in Terapii Complementare", pageW / 2, 43, { align: "center" });

  // Linie aurie
  doc.setDrawColor(...gold);
  doc.setLineWidth(0.4);
  doc.line(margin + 10, 50, pageW - margin - 10, 50);

  y = 62;

  // Info ritual
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...purple);
  doc.text(safe("Ritual creat pentru: ") + safe(userName || "—"), margin, y);
  y += 7;

  doc.setFont("helvetica", "normal");
  doc.text(safe(typeLabels[relationType] || "") + safe(" · Lucrezi cu: ") + safe(personName || "—"), margin, y);
  y += 7;

  if (feelingNow) {
    const fl = doc.splitTextToSize(safe(`"${feelingNow}"`), contentW);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9.5);
    doc.setTextColor(100, 80, 160);
    fl.forEach((line: string) => { doc.text(line, margin, y); y += 5.5; });
    y += 2;
  }

  // Linie separator
  doc.setDrawColor(...grayLight);
  doc.setLineWidth(0.15);
  doc.line(margin, y, pageW - margin, y);
  y += 7;

  // Provocări
  if (selectedPains.length > 0) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(...gold);
    doc.text("PROVOCARI LUCRATE:", margin, y);
    y += 5;
    y = renderChips(doc, selectedPains, margin, y, pageW, grayLight, purple, cardBg);
    y += 5;
  }

  // Intenții
  if (selectedWishes.length > 0) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(...gold);
    doc.text("INTENTII:", margin, y);
    y += 5;
    y = renderChips(doc, selectedWishes, margin, y, pageW, gold, [138, 96, 32], cream);
    y += 5;
  }

  // Energie
  if (exitEnergy || selectedSelf) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...purple);
    const parts = [];
    if (exitEnergy) parts.push(safe(exitEnergy));
    if (selectedSelf) parts.push(safe(selectedSelf));
    doc.text("Energie de iesire: " + parts.join(" · "), margin, y);
    y += 8;
  }

  // Linie aurie + opener
  doc.setDrawColor(...gold);
  doc.setLineWidth(0.4);
  doc.line(margin + 10, y, pageW - margin - 10, y);
  y += 8;

  doc.setFont("helvetica", "italic");
  doc.setFontSize(8.5);
  doc.setTextColor(...gold);
  doc.text("Barierele jos · Barierele jos · Barierele jos · Barierele jos", pageW / 2, y, { align: "center" });
  y += 10;

  // ─── CELE 7 MANTRE ────────────────────────────────────────────────
  const mantre = mantreByType[relationType] || [];

  mantre.forEach((tmpl, idx) => {
    const text = safe(tmpl.replace(/{p}/g, personName || "aceasta persoana"));

    // Împărțim textul în linii (respectăm \n din template)
    const paragraphs = text.split("\n");
    let allLines: string[] = [];
    paragraphs.forEach((para, pi) => {
      const ls = doc.splitTextToSize(para, contentW - 10);
      allLines = allLines.concat(ls);
      if (pi < paragraphs.length - 1) allLines.push(""); // linie goală între paragrafe
    });

    const pocLines = doc.splitTextToSize(safe(POC), contentW - 10);
    const textH = allLines.length * 5.5 + pocLines.length * 5 + 20;
    const cardH = textH + 10;

    check(cardH + 6);

    // Card background
    doc.setFillColor(...cardBg);
    doc.setDrawColor(...grayLight);
    doc.setLineWidth(0.2);
    doc.roundedRect(margin, y, contentW, cardH, 3, 3, "FD");

    // Număr mantră
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...gold);
    doc.text(`${idx + 1}.`, margin + 4, y + 7);

    // Text mantră
    let ty = y + 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...purple);
    allLines.forEach((line: string) => {
      if (line === "") { ty += 3; return; }
      doc.text(line, margin + 10, ty);
      ty += 5.5;
    });

    // POC — italic, mai mic, auriu
    ty += 3;
    doc.setFont("helvetica", "bolditalic");
    doc.setFontSize(8.5);
    doc.setTextColor(...gold);
    pocLines.forEach((line: string) => {
      doc.text(line, margin + 10, ty);
      ty += 5;
    });

    y += cardH + 5;
  });

  // ─── BLOC DORINȚE ─────────────────────────────────────────────────
  if (selectedWishes.length > 0) {
    const wishText = safe(
      `Aleg acum sa creez in relatia mea cu ${personName}: ${selectedWishes.join(", ")}. Permit acestor calitati sa se manifeste cu usurinta si bucurie in viata mea.`
    );
    const wishLines = doc.splitTextToSize(wishText, contentW - 10);
    const pocLines = doc.splitTextToSize(safe(POC), contentW - 10);
    const cardH = wishLines.length * 5.5 + pocLines.length * 5 + 16;

    check(cardH + 6);

    doc.setFillColor(...cream);
    doc.setDrawColor(...gold);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, y, contentW, cardH, 3, 3, "FD");

    let ty = y + 8;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.setTextColor(138, 96, 32);
    wishLines.forEach((line: string) => { doc.text(line, margin + 6, ty); ty += 5.5; });

    ty += 3;
    doc.setFont("helvetica", "bolditalic");
    doc.setFontSize(8.5);
    doc.setTextColor(...gold);
    pocLines.forEach((line: string) => { doc.text(line, margin + 6, ty); ty += 5; });

    y += cardH + 5;
  }

  // ─── ÎNCHEIERE ────────────────────────────────────────────────────
  check(14);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(13);
  doc.setTextColor(...purple);
  doc.text("Asa sa fie si asa este.", pageW / 2, y, { align: "center" });
  y += 14;

  // ─── GHID DE FOLOSIRE ─────────────────────────────────────────────
  check(50);

  doc.setDrawColor(...gold);
  doc.setLineWidth(0.4);
  doc.line(margin + 15, y, pageW - margin - 15, y);
  y += 8;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...purple);
  doc.text("Cum folosesti aceste mantre", pageW / 2, y, { align: "center" });
  y += 9;

  const ghid: [string, string][] = [
    ["Citeste cu voce tare", "de 3-7 ori pe zi, 15-21 zile. Dimineata sau seara, prezent(a) cu tine. Nu grabi. Simte fiecare cuvant."],
    ["Stabileste-ti intentia", "Inainte sa incepi, reaminteste-ti ce vrei sa simti si sa creezi. Tine aceasta stare in minte pe toata durata citirii."],
    ["Ce poti simti", "Emotii, amintiri, senzatii in corp — inseamna ca energia se misca. Lasa-le sa treaca fara sa le judeci."],
    ["Noteaza schimbarile", "Un mesaj neasteptat, o conversatie mai usoara, o emotie care dispare — toate sunt semne. Noteaza-le."],
    ["Actioneaza", "Mantrele deschid spatiu. Tu umpli acel spatiu cu actiuni concrete. Trimite mesajul. Spune ce ai de spus."],
    ["Fii atent(a) la cadouri", "Sincronicitatile, ideile, oamenii care apar — acestea sunt raspunsuri. Fac parte din rezultat."],
  ];

  ghid.forEach(([title, body]) => {
    const bl = doc.splitTextToSize(body, contentW - 16);
    check(bl.length * 5 + 12);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(...gold);
    doc.text("›", margin, y);
    doc.setTextColor(...purple);
    doc.text(title, margin + 5, y);
    y += 5.5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100, 95, 130);
    bl.forEach((line: string) => { doc.text(line, margin + 5, y); y += 5; });
    y += 4;
  });

  // Box suport
  check(18);
  doc.setFillColor(...cream);
  doc.setDrawColor(...gold);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, contentW, 14, 3, 3, "FD");
  y += 6;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  doc.setTextColor(...purple);
  doc.text("Daca ai nevoie de suport in acest proces — contacteaza-ma. Sunt aici pentru tine.", pageW / 2, y, { align: "center" });
  y += 12;

  // Semnătură
  check(20);
  doc.setDrawColor(...grayLight);
  doc.setLineWidth(0.2);
  doc.line(margin + 25, y, pageW - margin - 25, y);
  y += 8;

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

  const filename = `Mantre_${safe(personName || "relatie").replace(/\s+/g, "_")}_${relationType}.pdf`;
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
    doc.setLineWidth(0.2);
    doc.roundedRect(chipX, y - 5, chipW, chipH, 2, 2, "FD");
    doc.setTextColor(...fontColor);
    doc.setFont("helvetica", "normal");
    doc.text(s, chipX + 4, y + 0.5);
    chipX += chipW + 3;
  });

  return y;
}
