import { POC, typeLabels, templates } from "@/data/mantre";

const AUTHOR = "Mihaela Petrula";
const AUTHOR_TITLE = "Trainer si Terapeut · Specialist in Terapii Complementare";

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

  const {
    userName,
    personName,
    relationType,
    feelingNow,
    selectedPains,
    selectedWishes,
    exitEnergy,
    selectedSelf,
  } = formData;

  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = 210;
  const pageH = 297;
  const margin = 22;
  const contentW = pageW - margin * 2;

  const gold: [number, number, number]        = [184, 146, 74];
  const purple: [number, number, number]      = [61,  44,  110];
  const purpleLight: [number, number, number] = [120, 90,  180];
  const gray: [number, number, number]        = [100, 100, 120];
  const grayLight: [number, number, number]   = [190, 182, 210];
  const cream: [number, number, number]       = [248, 245, 235];
  const purpleBg: [number, number, number]    = [237, 229, 247];

  let y = 0;

  function addFooter() {
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(...grayLight);
    doc.text(`${AUTHOR} · ${AUTHOR_TITLE}`, pageW / 2, pageH - 10, { align: "center" });
    doc.setTextColor(...gold);
    doc.setFontSize(10);
    doc.text("* * *", pageW / 2, pageH - 16, { align: "center" });
  }

  function newPage() {
    addFooter();
    doc.addPage();
    y = margin;
  }

  function checkBreak(needed = 20) {
    if (y + needed > pageH - 28) newPage();
  }

  function renderChips(
    items: string[],
    borderColor: [number, number, number],
    fontColor: [number, number, number],
    fillColor: [number, number, number]
  ): void {
    let chipX = margin;
    const chipH = 8;
    doc.setFontSize(8);

    items.forEach((item) => {
      const safeItem = safe(item);
      const chipW = doc.getTextWidth(safeItem) + 10;
      if (chipX + chipW > pageW - margin) { chipX = margin; y += chipH + 3; }
      doc.setFillColor(...fillColor);
      doc.setDrawColor(...borderColor);
      doc.setLineWidth(0.3);
      doc.roundedRect(chipX, y - 5.5, chipW, chipH, 3, 3, "FD");
      doc.setTextColor(...fontColor);
      doc.setFont("helvetica", "normal");
      doc.text(safeItem, chipX + 5, y + 0.5);
      chipX += chipW + 4;
    });
    y += chipH + 3;
  }

  // ─── PAGINA 1 — COPERTĂ ───────────────────────────────────────────
  doc.setFillColor(245, 240, 255);
  doc.rect(0, 0, pageW, pageH, "F");

  doc.setFillColor(...purpleBg);
  doc.rect(0, 0, pageW, 75, "F");

  doc.setFontSize(13);
  doc.setTextColor(...gold);
  doc.setFont("helvetica", "normal");
  doc.text("* * *", pageW / 2, 22, { align: "center" });

  doc.setFontSize(26);
  doc.setTextColor(...purple);
  doc.setFont("helvetica", "bold");
  doc.text("Mantre de Curatare", pageW / 2, 40, { align: "center" });

  doc.setFontSize(20);
  doc.setTextColor(...gold);
  doc.setFont("helvetica", "normal");
  doc.text("pentru Relatii", pageW / 2, 52, { align: "center" });

  doc.setFontSize(8);
  doc.setTextColor(...purpleLight);
  doc.text("RITUAL PERSONALIZAT", pageW / 2, 63, { align: "center" });

  doc.setDrawColor(...gold);
  doc.setLineWidth(0.5);
  doc.line(margin + 25, 72, pageW - margin - 25, 72);

  y = 84;

  doc.setFontSize(10);
  doc.setTextColor(...gray);
  doc.setFont("helvetica", "normal");
  doc.text("Ritual creat pentru", pageW / 2, y, { align: "center" });
  y += 9;

  doc.setFontSize(20);
  doc.setTextColor(...purple);
  doc.setFont("helvetica", "bold");
  doc.text(safe(userName || "utilizator"), pageW / 2, y, { align: "center" });
  y += 10;

  doc.setFillColor(...purpleBg);
  doc.roundedRect(margin + 28, y, contentW - 56, 9, 3, 3, "F");
  doc.setFontSize(8.5);
  doc.setTextColor(...purpleLight);
  doc.setFont("helvetica", "normal");
  doc.text(safe(typeLabels[relationType] || ""), pageW / 2, y + 6, { align: "center" });
  y += 16;

  doc.setFontSize(11);
  doc.setTextColor(...gray);
  doc.setFont("helvetica", "italic");
  doc.text(safe(`Lucrezi cu: ${personName}`), pageW / 2, y, { align: "center" });
  y += 9;

  if (feelingNow) {
    const feelLines = doc.splitTextToSize(safe(`"${feelingNow}"`), contentW - 16);
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(...gray);
    feelLines.forEach((line: string) => {
      doc.text(line, pageW / 2, y, { align: "center" });
      y += 5.5;
    });
    y += 3;
  }

  doc.setDrawColor(...grayLight);
  doc.setLineWidth(0.2);
  doc.line(margin + 25, y, pageW - margin - 25, y);
  y += 10;

  if (selectedPains.length > 0) {
    doc.setFontSize(7.5);
    doc.setTextColor(...gray);
    doc.setFont("helvetica", "normal");
    doc.text("PROVOCARI LUCRATE IN ACEST RITUAL:", pageW / 2, y, { align: "center" });
    y += 7;
    renderChips(selectedPains, grayLight, purple, [245, 240, 255]);
    y += 2;
  }

  if (selectedWishes.length > 0) {
    doc.setFontSize(7.5);
    doc.setTextColor(...gray);
    doc.setFont("helvetica", "normal");
    doc.text("INTENTII PENTRU ACEASTA RELATIE:", pageW / 2, y, { align: "center" });
    y += 7;
    renderChips(selectedWishes, gold, [138, 96, 32], cream);
    y += 2;
  }

  if (exitEnergy || selectedSelf) {
    const boxH = exitEnergy && selectedSelf ? 24 : 15;
    doc.setFillColor(...cream);
    doc.setDrawColor(...gold);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin + 18, y, contentW - 36, boxH, 4, 4, "FD");
    y += 7;
    if (exitEnergy) {
      doc.setFontSize(7.5);
      doc.setTextColor(...gray);
      doc.setFont("helvetica", "normal");
      doc.text("ENERGIA DE IESIRE DIN RITUAL", pageW / 2, y, { align: "center" });
      y += 6;
      doc.setFontSize(11);
      doc.setTextColor(138, 96, 32);
      doc.setFont("helvetica", "italic");
      doc.text(safe(exitEnergy), pageW / 2, y, { align: "center" });
      y += 5;
    }
    if (selectedSelf) {
      doc.setFontSize(9);
      doc.setTextColor(...gray);
      doc.setFont("helvetica", "italic");
      doc.text(safe(`Aleg sa ma simt: ${selectedSelf}`), pageW / 2, y, { align: "center" });
    }
  }

  addFooter();

  // ─── PAGINA 2+ — MANTRELE ─────────────────────────────────────────
  doc.addPage();

  doc.setFillColor(...purpleBg);
  doc.rect(0, 0, pageW, 16, "F");
  doc.setFontSize(8);
  doc.setTextColor(...purpleLight);
  doc.setFont("helvetica", "normal");
  doc.text(
    safe(`MANTRE DE CURATARE · ${(typeLabels[relationType] || "").toUpperCase()}`),
    pageW / 2, 10, { align: "center" }
  );

  y = 24;

  doc.setFontSize(8.5);
  doc.setTextColor(...gold);
  doc.setFont("helvetica", "italic");
  doc.text(
    "Barierele jos - Barierele jos - Barierele jos - Barierele jos",
    pageW / 2, y, { align: "center" }
  );
  y += 12;

  selectedPains.forEach((pain) => {
    const painTemplates = templates[relationType]?.[pain];
    if (!painTemplates) return;

    painTemplates.forEach((tmpl) => {
      const mantraText = safe(tmpl.replace(/{p}/g, personName));
      const mantraLines = doc.splitTextToSize(mantraText, contentW - 8);
      const pocLines = doc.splitTextToSize(safe(POC), contentW - 8);
      const blockH = mantraLines.length * 6 + pocLines.length * 5 + 18;

      checkBreak(blockH);

      doc.setFontSize(12);
      doc.setTextColor(...gold);
      doc.text(">", margin, y + 1);

      doc.setFontSize(10.5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...purple);
      mantraLines.forEach((line: string) => { doc.text(line, margin + 7, y); y += 6; });

      y += 2;
      doc.setFontSize(8);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(...gray);
      pocLines.forEach((line: string) => { doc.text(line, margin + 7, y); y += 4.8; });

      y += 5;
      doc.setDrawColor(...grayLight);
      doc.setLineWidth(0.2);
      doc.line(margin, y, pageW - margin, y);
      y += 7;
    });
  });

  if (selectedWishes.length > 0) {
    const wishText = safe(
      `Aleg acum sa creez in relatia mea cu ${personName}: ${selectedWishes.join(", ")}. Permit acestor calitati sa se manifeste cu usurinta si bucurie.`
    );
    const wishLines = doc.splitTextToSize(wishText, contentW - 8);
    checkBreak(wishLines.length * 6 + 20);

    doc.setFontSize(12);
    doc.setTextColor(...gold);
    doc.text("*", margin, y + 1);

    doc.setFontSize(10.5);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(138, 96, 32);
    wishLines.forEach((line: string) => { doc.text(line, margin + 7, y); y += 6; });

    y += 2;
    const pocW = doc.splitTextToSize(safe(POC), contentW - 8);
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(...gray);
    pocW.forEach((line: string) => { doc.text(line, margin + 7, y); y += 4.8; });

    y += 5;
    doc.setDrawColor(...grayLight);
    doc.setLineWidth(0.2);
    doc.line(margin, y, pageW - margin, y);
    y += 7;
  }

  const cmdLines = doc.splitTextToSize(
    "Comand sa se extraga toate acestea si sa se distruga, decreeze in totalitate ACUM si pentru totdeauna.",
    contentW - 8
  );
  checkBreak(cmdLines.length * 6 + 20);

  doc.setFontSize(12);
  doc.setTextColor(...gold);
  doc.text("*", margin, y + 1);

  doc.setFontSize(10.5);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(138, 96, 32);
  cmdLines.forEach((line: string) => { doc.text(line, margin + 7, y); y += 6; });

  y += 2;
  const pocCmd = doc.splitTextToSize(safe(POC), contentW - 8);
  doc.setFontSize(8);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(...gray);
  pocCmd.forEach((line: string) => { doc.text(line, margin + 7, y); y += 4.8; });

  y += 10;

  checkBreak(12);
  doc.setFontSize(14);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(...purple);
  doc.text("Asa sa fie si asa este.  *", pageW / 2, y, { align: "center" });

  addFooter();

  // ─── PAGINA FINALĂ — GHID DE FOLOSIRE ────────────────────────────
  doc.addPage();

  doc.setFillColor(...purpleBg);
  doc.rect(0, 0, pageW, 16, "F");
  doc.setFontSize(8);
  doc.setTextColor(...purpleLight);
  doc.setFont("helvetica", "normal");
  doc.text("CUM FOLOSESTI ACESTE MANTRE", pageW / 2, 10, { align: "center" });

  y = 26;

  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...purple);
  doc.text("Ghidul tau de ritual", pageW / 2, y, { align: "center" });
  y += 5;

  doc.setDrawColor(...gold);
  doc.setLineWidth(0.4);
  doc.line(margin + 30, y, pageW - margin - 30, y);
  y += 10;

  const introLines = doc.splitTextToSize(
    "Aceste mantre nu sunt o formula magica si nu iti promit rezultate peste noapte. Sunt un instrument de curatare energetica pe care il folosesti activ, cu intentie si consecventa. Rezultatele vin din combinatia dintre munca ta interioara si deschiderea catre schimbare.",
    contentW
  );
  doc.setFontSize(9.5);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(...gray);
  introLines.forEach((line: string) => {
    doc.text(line, pageW / 2, y, { align: "center" });
    y += 5.5;
  });
  y += 8;

  const sections = [
    {
      nr: "1.",
      title: "Cum le citesti",
      body: "Citeste cu voce tare, de 3-7 ori pe zi, timp de 15-21 de zile. Alege un moment linistit - dimineata sau seara - in care sa fii prezent(a) cu tine. Nu grabi. Simte fiecare cuvant.",
    },
    {
      nr: "2.",
      title: "Stabileste-ti intentia",
      body: "Inainte sa incepi, reaminteste-ti energia pe care ai ales-o - ce vrei sa simti, ce vrei sa creezi in aceasta relatie. Tine aceasta imagine in minte pe tot parcursul citirii.",
    },
    {
      nr: "3.",
      title: "Ce poti simti",
      body: "Este posibil sa apara emotii, amintiri sau senzatii in corp - un nod in gat, lacrimi, caldura sau o usurinta neasteptata. Asta inseamna ca energia se misca. Lasa-le sa treaca, nu le bloca.",
    },
    {
      nr: "4.",
      title: "Noteaza schimbarile",
      body: "Din prima zi, noteaza ce observi - in relatie, in tine, in reactiile celuilalt. Schimbarile mici conteaza la fel de mult ca cele mari. Un mesaj neasteptat, o conversatie mai usoara, o emotie care dispare.",
    },
    {
      nr: "5.",
      title: "Fa actiuni in fizic",
      body: "Mantrele deschid spatiu. Tu umpli acel spatiu cu actiuni concrete. Trimite mesajul, seteaza intalnirea, spune ce ai de spus. Universul intampina pe cei care se misca.",
    },
    {
      nr: "6.",
      title: "Fii atent(a) la cadouri",
      body: "Sincronicitatile, ideile care apar, oamenii care intra in viata ta - acestea sunt raspunsuri. Fii atent(a) la ele. Fac parte din rezultat.",
    },
  ];

  sections.forEach((sec) => {
    const bodyLines = doc.splitTextToSize(sec.body, contentW - 14);
    const secH = bodyLines.length * 5.2 + 16;
    checkBreak(secH);

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...gold);
    doc.text(sec.nr, margin, y + 0.5);

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...purple);
    doc.text(sec.title, margin + 8, y);
    y += 6;

    doc.setFontSize(9.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...gray);
    bodyLines.forEach((line: string) => { doc.text(line, margin + 8, y); y += 5.2; });
    y += 6;
  });

  checkBreak(26);
  doc.setDrawColor(...gold);
  doc.setLineWidth(0.3);
  doc.line(margin + 20, y, pageW - margin - 20, y);
  y += 8;

  doc.setFillColor(...cream);
  doc.setDrawColor(...gold);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, contentW, 22, 4, 4, "FD");
  y += 7;

  const supportLines = doc.splitTextToSize(
    "Daca simti ca ai nevoie de suport in acest proces sau daca apar emotii puternice pe care nu stii cum sa le gestionezi - contacteaza-ma. Sunt aici pentru tine.",
    contentW - 10
  );
  doc.setFontSize(9.5);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(...purple);
  supportLines.forEach((line: string) => {
    doc.text(line, pageW / 2, y, { align: "center" });
    y += 5.5;
  });

  y += 14;

  checkBreak(28);
  doc.setDrawColor(...grayLight);
  doc.setLineWidth(0.3);
  doc.line(margin + 30, y, pageW - margin - 30, y);
  y += 9;

  doc.setFontSize(15);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...purple);
  doc.text("Mihaela Petrula", pageW / 2, y, { align: "center" });
  y += 7;

  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(...gray);
  doc.text("Trainer si Terapeut · Specialist in Terapii Complementare", pageW / 2, y, { align: "center" });
  y += 9;

  doc.setFontSize(13);
  doc.setTextColor(...gold);
  doc.text("* * *", pageW / 2, y, { align: "center" });

  addFooter();

  const filename = `Mantre_${(personName || "relatie").replace(/\s+/g, "_")}_${relationType}.pdf`;
  doc.save(filename);
}
