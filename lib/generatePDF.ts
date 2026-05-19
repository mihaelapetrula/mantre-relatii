import { POC, typeLabels, templates } from "@/data/mantre";

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
  const margin = 20;
  const contentW = pageW - margin * 2;

  // Colors
  const gold: [number, number, number] = [184, 146, 74];
  const purple: [number, number, number] = [61, 44, 110];
  const lightPurple: [number, number, number] = [120, 90, 180];
  const gray: [number, number, number] = [100, 100, 100];
  const lightGray: [number, number, number] = [200, 190, 220];
  const goldText: [number, number, number] = [138, 96, 32];

  // Fix diacritice: înlocuiește caracterele românești cu echivalente latin
  function fixDiacritice(text: string): string {
    return text
      .replace(/ș/g, "s").replace(/Ș/g, "S")
      .replace(/ț/g, "t").replace(/Ț/g, "T")
      .replace(/ă/g, "a").replace(/Ă/g, "A")
      .replace(/â/g, "a").replace(/Â/g, "A")
      .replace(/î/g, "i").replace(/Î/g, "I")
      // păstrează și variantele cu sedilă veche
      .replace(/ş/g, "s").replace(/Ş/g, "S")
      .replace(/ţ/g, "t").replace(/Ţ/g, "T");
  }

  // Wrapper: text fără diacritice pentru jsPDF
  function t(text: string): string {
    return fixDiacritice(text);
  }

  let y = 0;

  function newPage() {
    doc.addPage();
    y = margin;
    addPageFooter();
  }

  function checkPageBreak(neededHeight = 20) {
    if (y + neededHeight > pageH - 25) newPage();
  }

  function addPageFooter() {
    doc.setFontSize(8);
    doc.setTextColor(...lightGray);
    doc.setFont("helvetica", "italic");
    doc.text(t("Mihaela Petrula · Mantre de Curatare pentru Relatii"), pageW / 2, pageH - 10, { align: "center" });
    doc.setTextColor(...gold);
    doc.text("*  *  *", pageW / 2, pageH - 15, { align: "center" });
  }

  // PAGE 1 — COVER
  doc.setFillColor(245, 240, 255);
  doc.rect(0, 0, pageW, pageH, "F");

  doc.setFillColor(237, 229, 247);
  doc.rect(0, 0, pageW, 80, "F");

  doc.setFontSize(14);
  doc.setTextColor(...gold);
  doc.setFont("helvetica", "normal");
  doc.text("*  *  *", pageW / 2, 28, { align: "center" });

  doc.setFontSize(28);
  doc.setTextColor(...purple);
  doc.setFont("helvetica", "bold");
  doc.text(t("Mantre de Curatare"), pageW / 2, 45, { align: "center" });

  doc.setFontSize(22);
  doc.setTextColor(...gold);
  doc.setFont("helvetica", "normal");
  doc.text(t("pentru Relatii"), pageW / 2, 56, { align: "center" });

  doc.setFontSize(9);
  doc.setTextColor(...lightPurple);
  doc.text("RITUAL PERSONALIZAT", pageW / 2, 66, { align: "center" });

  y = 85;
  doc.setDrawColor(...gold);
  doc.setLineWidth(0.5);
  doc.line(margin + 30, y, pageW - margin - 30, y);
  y += 12;

  doc.setFontSize(11);
  doc.setTextColor(...gray);
  doc.setFont("helvetica", "normal");
  doc.text(t("Ritual creat pentru"), pageW / 2, y, { align: "center" });
  y += 8;

  doc.setFontSize(18);
  doc.setTextColor(...purple);
  doc.setFont("helvetica", "bold");
  doc.text(t(userName || "utilizator"), pageW / 2, y, { align: "center" });
  y += 10;

  doc.setFillColor(237, 229, 247);
  doc.roundedRect(margin + 30, y, contentW - 60, 10, 3, 3, "F");
  doc.setFontSize(9);
  doc.setTextColor(...lightPurple);
  doc.setFont("helvetica", "normal");
  doc.text(t(typeLabels[relationType] || ""), pageW / 2, y + 6.5, { align: "center" });
  y += 18;

  doc.setFontSize(11);
  doc.setTextColor(...gray);
  doc.setFont("helvetica", "italic");
  doc.text(t(`Lucrezi cu: ${personName}`), pageW / 2, y, { align: "center" });
  y += 8;

  if (feelingNow) {
    doc.setFontSize(10);
    doc.setTextColor(...gray);
    doc.setFont("helvetica", "italic");
    const feelingLines = doc.splitTextToSize(t(`"${feelingNow}"`), contentW - 20);
    feelingLines.forEach((line: string) => {
      doc.text(line, pageW / 2, y, { align: "center" });
      y += 6;
    });
    y += 4;
  }

  doc.setDrawColor(...lightGray);
  doc.setLineWidth(0.3);
  doc.line(margin + 30, y, pageW - margin - 30, y);
  y += 12;

  if (selectedPains.length > 0) {
    doc.setFontSize(8);
    doc.setTextColor(...gray);
    doc.setFont("helvetica", "normal");
    doc.text(t("PROVOCARI LUCRATE IN ACEST RITUAL:"), pageW / 2, y, { align: "center" });
    y += 7;

    let chipX = margin;
    const chipH = 8;
    selectedPains.forEach((pain) => {
      const chipW = doc.getTextWidth(t(pain)) + 10;
      if (chipX + chipW > pageW - margin) { chipX = margin; y += chipH + 3; }
      doc.setFillColor(245, 240, 255);
      doc.setDrawColor(...gold);
      doc.setLineWidth(0.3);
      doc.roundedRect(chipX, y - 5, chipW, chipH, 3, 3, "FD");
      doc.setFontSize(8);
      doc.setTextColor(...purple);
      doc.text(t(pain), chipX + 5, y + 1);
      chipX += chipW + 4;
    });
    y += 14;
  }

  if (selectedWishes.length > 0) {
    doc.setFontSize(8);
    doc.setTextColor(...gray);
    doc.setFont("helvetica", "normal");
    doc.text(t("INTENTII PENTRU ACEASTA RELATIE:"), pageW / 2, y, { align: "center" });
    y += 7;

    let chipX = margin;
    const chipH = 8;
    selectedWishes.forEach((wish) => {
      const chipW = doc.getTextWidth(t(wish)) + 10;
      if (chipX + chipW > pageW - margin) { chipX = margin; y += chipH + 3; }
      doc.setFillColor(248, 245, 235);
      doc.setDrawColor(...gold);
      doc.setLineWidth(0.3);
      doc.roundedRect(chipX, y - 5, chipW, chipH, 3, 3, "FD");
      doc.setFontSize(8);
      doc.setTextColor(...goldText);
      doc.text(t(wish), chipX + 5, y + 1);
      chipX += chipW + 4;
    });
    y += 16;
  }

  if (exitEnergy || selectedSelf) {
    const boxH = selectedSelf ? 22 : 14;
    doc.setFillColor(248, 245, 235);
    doc.setDrawColor(...gold);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin + 20, y, contentW - 40, boxH, 4, 4, "FD");
    y += 6;

    if (exitEnergy) {
      doc.setFontSize(8);
      doc.setTextColor(...gray);
      doc.setFont("helvetica", "normal");
      doc.text(t("ENERGIA DE IESIRE DIN RITUAL"), pageW / 2, y, { align: "center" });
      y += 6;
      doc.setFontSize(11);
      doc.setTextColor(...goldText);
      doc.setFont("helvetica", "italic");
      doc.text(t(exitEnergy), pageW / 2, y, { align: "center" });
      y += 6;
    }
    if (selectedSelf) {
      doc.setFontSize(9);
      doc.setTextColor(...gray);
      doc.setFont("helvetica", "italic");
      doc.text(t(`Aleg sa ma simt: ${selectedSelf}`), pageW / 2, y, { align: "center" });
      y += 6;
    }
    y += 4;
  }

  doc.setFontSize(12);
  doc.setTextColor(...gold);
  doc.text("*", pageW / 2, pageH - 22, { align: "center" });
  doc.setFontSize(8);
  doc.setTextColor(...lightGray);
  doc.setFont("helvetica", "italic");
  doc.text(t("Mihaela Petrula · Mantre de Curatare pentru Relatii"), pageW / 2, pageH - 15, { align: "center" });

  // PAGE 2+ — MANTRE
  doc.addPage();
  y = margin;

  doc.setFillColor(237, 229, 247);
  doc.rect(0, 0, pageW, 18, "F");
  doc.setFontSize(9);
  doc.setTextColor(...lightPurple);
  doc.setFont("helvetica", "normal");
  doc.text(t("MANTRE DE CURATARE · " + (typeLabels[relationType] || "").toUpperCase()), pageW / 2, 11, { align: "center" });
  y = 26;

  doc.setFontSize(9);
  doc.setTextColor(...gold);
  doc.setFont("helvetica", "italic");
  doc.text(t("Barierele jos - Barierele jos - Barierele jos - Barierele jos"), pageW / 2, y, { align: "center" });
  y += 10;

  selectedPains.forEach((pain) => {
    const painTemplates = templates[relationType]?.[pain];
    if (!painTemplates) return;

    painTemplates.forEach((mantraText) => {
      const resolved = mantraText.replace(/{p}/g, personName);
      const lines = doc.splitTextToSize(t(resolved), contentW - 8);
      const blockH = lines.length * 6 + 18;
      checkPageBreak(blockH);

      doc.setFontSize(10);
      doc.setTextColor(...gold);
      doc.text(">", margin, y + 1);

      doc.setFontSize(11);
      doc.setTextColor(...purple);
      doc.setFont("helvetica", "normal");
      lines.forEach((line: string) => {
        doc.text(line, margin + 7, y);
        y += 6;
      });

      y += 2;
      const pocLines = doc.splitTextToSize(t(POC), contentW - 8);
      doc.setFontSize(8);
      doc.setTextColor(...gray);
      doc.setFont("helvetica", "italic");
      pocLines.forEach((line: string) => {
        doc.text(line, margin + 7, y);
        y += 5;
      });

      y += 4;
      doc.setDrawColor(...lightGray);
      doc.setLineWidth(0.2);
      doc.line(margin, y, pageW - margin, y);
      y += 8;
    });
  });

  if (selectedWishes.length > 0) {
    checkPageBreak(30);
    const wishText = t(`Aleg acum sa creez in relatia mea cu ${personName}: ${selectedWishes.join(", ")}. Permit acestor calitati sa se manifeste cu usurinta si bucurie.`);
    const wishLines = doc.splitTextToSize(wishText, contentW - 8);

    doc.setFontSize(12);
    doc.setTextColor(...gold);
    doc.text("*", margin, y + 1);

    doc.setFontSize(11);
    doc.setTextColor(...goldText);
    doc.setFont("helvetica", "italic");
    wishLines.forEach((line: string) => {
      doc.text(line, margin + 7, y);
      y += 6;
    });
    y += 2;
    const pocLines = doc.splitTextToSize(t(POC), contentW - 8);
    doc.setFontSize(8);
    doc.setTextColor(...gray);
    doc.setFont("helvetica", "italic");
    pocLines.forEach((line: string) => {
      doc.text(line, margin + 7, y);
      y += 5;
    });
    y += 8;
    doc.setDrawColor(...lightGray);
    doc.setLineWidth(0.2);
    doc.line(margin, y, pageW - margin, y);
    y += 8;
  }

  checkPageBreak(24);
  doc.setFontSize(12);
  doc.setTextColor(...gold);
  doc.text("*", margin, y + 1);
  doc.setFontSize(11);
  doc.setTextColor(...goldText);
  doc.setFont("helvetica", "italic");
  const cmdLines = doc.splitTextToSize(
    t("Comand sa se extraga toate acestea si sa se distruga, decreeze in totalitate ACUM si pentru totdeauna."),
    contentW - 8
  );
  cmdLines.forEach((line: string) => { doc.text(line, margin + 7, y); y += 6; });
  y += 2;
  const pocLines2 = doc.splitTextToSize(t(POC), contentW - 8);
  doc.setFontSize(8);
  doc.setTextColor(...gray);
  doc.setFont("helvetica", "italic");
  pocLines2.forEach((line: string) => { doc.text(line, margin + 7, y); y += 5; });
  y += 10;

  checkPageBreak(14);
  doc.setFontSize(13);
  doc.setTextColor(...purple);
  doc.setFont("helvetica", "italic");
  doc.text(t("Asa sa fie si asa este.  *"), pageW / 2, y, { align: "center" });
  y += 14;

  checkPageBreak(28);
  doc.setFillColor(248, 245, 235);
  doc.setDrawColor(...gold);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, contentW, 22, 4, 4, "FD");
  y += 7;
  doc.setFontSize(8);
  doc.setTextColor(...gray);
  doc.setFont("helvetica", "normal");
  doc.text(t("Citeste cu voce tare de 3-7 ori zilnic, cu intentie clara, timp de 15-21 zile."), pageW / 2, y, { align: "center" });
  y += 6;
  doc.text(t("Tu faci 50% - universul face 50%. Tu faci prima si inviti sa se manifeste!"), pageW / 2, y, { align: "center" });

  addPageFooter();

  const filename = `Mantre_${personName.replace(/\s+/g, "_")}_${relationType}.pdf`;
  doc.save(filename);
}
