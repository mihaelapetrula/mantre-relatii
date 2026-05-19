export const POC =
  "Write and wrong, good and bad, POD and POC, all 100, shorts boys povad's bases creations and beyonds.";

export const typeLabels: Record<string, string> = {
  cuplu: "Relatie de Cuplu",
  sine: "Relatia cu Mine",
  parinte: "Relatie Parinte - Copil",
};

export const painsByType: Record<string, string[]> = {
  cuplu: [
    "Ranire / tradare",
    "Gelozie / control",
    "Distanta emotionala",
    "Asteptari neimplinite",
    "Teama de abandon",
    "Vinovatie",
    "Comunicare blocata",
    "Loialitati de familie",
    "Dependenta emotionala",
    "Putere / dominare",
    "Oboseala si stres",
    "Furie si agitatie",
  ],
  sine: [
    "Stima de sine scazuta",
    "Vinovatie",
    "Autocritica",
    "Frica de esec",
    "Blocaj emotional",
    "Tipare mostenite",
    "Loialitati de familie",
    "Dependenta de validare",
    "Oboseala si stres",
    "Furie si agitatie",
  ],
  parinte: [
    "Vinovatie",
    "Asteptari si judecati",
    "Rani din copilarie",
    "Lipsa de recunoastere",
    "Control / supraprotectie",
    "Tipare mostenite",
    "Separare / distanta",
    "Frica de dezamagire",
    "Comparatii dureroase",
    "Loialitate toxica",
  ],
};

export const wishesByType: Record<string, string[]> = {
  cuplu: [
    "Iubire autentica",
    "Comunicare deschisa",
    "Incredere reciproca",
    "Apropiere si intimitate",
    "Libertate in relatie",
    "Respect reciproc",
    "Bucurie si usurinta",
    "Bucurie si pofta de viata",
    "Limite sanatoase",
    "Crestere impreuna",
    "Pace si echilibru",
  ],
  sine: [
    "Iubire de sine",
    "Incredere in mine",
    "Pace interioara",
    "Bucurie si pofta de viata",
    "Libertate interioara",
    "Valoare proprie",
    "Claritate si directie",
    "Energie si vitalitate",
    "Eliberare din tipare",
    "Gratitudine fata de mine",
  ],
  parinte: [
    "Acceptare reciproca",
    "Vindecare si iertare",
    "Conexiune autentica",
    "Respect si autonomie",
    "Iubire neconditionata",
    "Intelegere profunda",
    "Eliberare din tipare",
    "Comunicare sincera",
    "Bucurie si pofta de viata",
    "Gratitudine",
    "Pace interioara",
  ],
};

export const selfStates: string[] = [
  "Eliberat(a) si usor(a)",
  "Puternic(a) si centrat(a)",
  "Imputernicita / Imputernicit",
  "In pace cu mine",
  "Deschis(a) si prezent(a)",
  "Recunoscator(oare)",
];

// 7 mantre fixe per tip relatie, cu {p} = numele persoanei
// Stilul original: liste detaliate, bogate, POC dupa fiecare
export const mantreByType: Record<string, string[]> = {
  cuplu: [
    // 1
    "Distrug si decreez in totalitate toate … povestile, asteptarile, gandurile, emotiile, atasamentele, vorbele de joasa frecventa, ranile si dezamagirile ce au fost in relatia mea cu {p} de pana astazi.",

    // 2
    "Distrug si decreez in totalitate toate … rigiditatile, temerile, iluziile, gandurile spuse si nespuse, emotiile si fricile, blocajele stiute si nestiute, cuvintele si sentimentele de joasa frecventa ce au fost in relatia mea cu {p} de pana astazi.",

    // 3
    "Distrug si decreez in totalitate toate … vinovatiile, pierderile, neiertarile, povestile, atacurile energetice si autoatacurile energetice, stringurile si efectele lor ce au fost in relatia mea cu {p} de pana astazi.",

    // 4
    "Cate legaturi, legaturi de sange, legaturi de suflet, contracte constiinte si inconstiente, promisiuni, alianțe, loialitati si fidelitati am impreuna cu {p} sau fata de {p} … din toate timpurile, spatiile, dimensiunile si realitatile — pe toate astea le reneg, revoc, retractez, anulez, distrug si decreez in totalitate acum de un dumnezelion de ori pentru eternitate.",

    // 5
    "Distrug si decreez in totalitate toate limitarile preluate din arborele genealogic:\n- de la linia mamei\n- de la linia tatalui\n- de la linia partenerilor anteriori\n- din societate\nsi toate stringurile, legaturile, scurgerile pe care le-am creat si la care m-am aliniat in relatia mea cu {p} de pana astazi. Cer sa se distruga, decreeze si dizolve in TOTALITATE acum.",

    // 6
    "Distrug si decreez in totalitate toate momentele in care m-am facut mic(a) in raport cu {p}, toate momentele in care m-am anulat, ignorat, ascuns sau incarcat pentru a fi acceptat(a) si iubit(a) … si toate efectele acestora de pana astazi.",

    // 7
    "Comand sa se extraga toate acestea — povestile, ranile, fricile, contractele, limitarile, loialitatile, vinovatiile si tot ce nu am enumerat — din relatia mea cu {p} si sa se distruga, decreeze in totalitate ACUM si pentru totdeauna.\nSi vizualizezi cum toate acestea se extrag!",
  ],

  sine: [
    // 1
    "Distrug si decreez in totalitate toate … povestile, asteptarile, gandurile, emotiile, atasamentele, vorbele de joasa frecventa, ranile si dezamagirile ce au fost in relatia mea cu MINE de pana astazi.",

    // 2
    "Distrug si decreez in totalitate toate … rigiditatile, temerile, iluziile, autocritica, judecatile fata de mine, blocajele stiute si nestiute, sentimentele de joasa frecventa pe care le-am creat sau preluat in relatia mea cu MINE de pana astazi.",

    // 3
    "Distrug si decreez in totalitate toate … vinovatiile, neiertarile fata de mine, povestile in care nu am fost destul de bun(a), atacurile energetice si autoatacurile energetice, stringurile si efectele lor ce au fost in relatia mea cu MINE de pana astazi.",

    // 4
    "Cate legaturi, contracte constiente si inconstiente, promisiuni, loialitati si fidelitati am fata de mine insumi(ami) sau fata de sisteme, familie, societate … din toate timpurile, spatiile, dimensiunile si realitatile — pe toate astea le reneg, revoc, retractez, anulez, distrug si decreez in totalitate acum de un dumnezelion de ori pentru eternitate.",

    // 5
    "Distrug si decreez in totalitate toate limitarile preluate din arborele genealogic:\n- de la linia mamei\n- de la linia tatalui\n- din societate\nsi toate tiparele, credintele gresite, blocajele mentale si emotionale pe care le-am mostenit sau recreat in relatia mea cu MINE de pana astazi. Cer sa se distruga, decreeze si dizolve in TOTALITATE acum.",

    // 6
    "Distrug si decreez in totalitate toate momentele in care m-am facut mic(a), nevrednic(a), ignorat(a) sau negat(a) … toate momentele in care m-am ascuns, m-am anulat sau m-am incarcat pentru a fi acceptat(a) de ceilalti … si toate efectele acestora de pana astazi.",

    // 7
    "Comand sa se extraga toate acestea — povestile, ranile, fricile, contractele, limitarile, loialitatile, vinovatiile si tot ce nu am enumerat — din relatia mea cu MINE si sa se distruga, decreeze in totalitate ACUM si pentru totdeauna.\nSi vizualizezi cum toate acestea se extrag!",
  ],

  parinte: [
    // 1
    "Distrug si decreez in totalitate toate … povestile, asteptarile, judecatile, gandurile, emotiile, atasamentele, cuvintele de joasa frecventa ce au fost in relatia mea cu {p} de pana astazi.",

    // 2
    "Distrug si decreez in totalitate toate … vinovatiile, pierderile, neiertarile, ranile din copilarie, atacurile energetice si autoatacurile energetice, stringurile si efectele lor ce au fost in relatia mea cu {p} de pana astazi.",

    // 3
    "Distrug si decreez in totalitate toate … rigiditatile, temerile, conditionarile, credintele gresite impuse sau preluate, blocajele stiute si nestiute, sentimentele de joasa frecventa ce au fost in relatia mea cu {p} de pana astazi.",

    // 4
    "Cate legaturi, contracte de sange, promisiuni, loialitati si fidelitati constiente si inconstiente am impreuna cu {p} sau fata de {p} … din toate timpurile, spatiile, dimensiunile si realitatile — pe toate astea le reneg, revoc, retractez, anulez, distrug si decreez in totalitate acum de un dumnezelion de ori pentru eternitate.",

    // 5
    "Distrug si decreez in totalitate toate limitarile preluate din arborele genealogic:\n- de la linia mamei\n- de la linia tatalui\nsi toate tiparele, loialitatile toxice, scurgerile energetice pe care le-am mostenit sau recreat in relatia mea cu {p} de pana astazi. Cer sa se distruga, decreeze si dizolve in TOTALITATE acum.",

    // 6
    "Distrug si decreez in totalitate toate momentele in care m-am facut mic(a), nevrednic(a) sau vinovat(a) in raport cu {p} … toate momentele in care am purtat durerea lui/ei ca pe a mea … si toate efectele acestora de pana astazi.",

    // 7
    "Comand sa se extraga toate acestea — ranile, vinovatiile, contractele, tiparele, loialitatile, judecatile si tot ce nu am enumerat — din relatia mea cu {p} si sa se distruga, decreeze in totalitate ACUM si pentru totdeauna.\nSi vizualizezi cum toate acestea se extrag!",
  ],
};

// Pastram templates pentru compatibilitate (nu mai e folosit in PDF)
export const templates: Record<string, Record<string, string[]>> = {
  cuplu: {},
  parinte: {},
};
