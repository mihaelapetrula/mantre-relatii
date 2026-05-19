export const POC =
  "Right, wrong, good, bad, POD, POC, all 100, shorts, boys, povad's, bases, creations and beyonds.";

export const painsByType: Record<string, string[]> = {
  cuplu: [
    "Rănire / trădare",
    "Gelozie / control",
    "Distanță emoțională",
    "Așteptări neîmplinite",
    "Teamă de abandon",
    "Vinovăție",
    "Comunicare blocată",
    "Loialități de familie",
    "Dependență emoțională",
    "Putere / dominare",
  ],
  parinte: [
    "Vinovăție",
    "Așteptări și judecăți",
    "Răni din copilărie",
    "Lipsă de recunoaștere",
    "Control / supraprotecție",
    "Tipare moștenite",
    "Separare / distanță",
    "Frică de dezamăgire",
    "Comparații dureroase",
    "Loialitate toxică",
  ],
};

export const wishesByType: Record<string, string[]> = {
  cuplu: [
    "Iubire autentică",
    "Comunicare deschisă",
    "Încredere reciprocă",
    "Apropiere și intimitate",
    "Libertate în relație",
    "Respect reciproc",
    "Bucurie și ușurință",
    "Limite sănătoase",
    "Creștere împreună",
    "Pace și echilibru",
  ],
  parinte: [
    "Acceptare reciprocă",
    "Vindecare și iertare",
    "Conexiune autentică",
    "Respect și autonomie",
    "Iubire necondiționată",
    "Înțelegere profundă",
    "Eliberare din tipare",
    "Comunicare sinceră",
    "Gratitudine",
    "Pace interioară",
  ],
};

export const selfStates: string[] = [
  "Eliberat(ă) și ușor(ă)",
  "Puternic(ă) și centrat(ă)",
  "În pace cu mine",
  "Deschis(ă) și prezent(ă)",
  "Recunoscător(oare)",
];

export const typeLabels: Record<string, string> = {
  cuplu: "Relație de Cuplu",
  parinte: "Relație Părinte – Copil",
};

export const templates: Record<string, Record<string, string[]>> = {
  cuplu: {
    "Rănire / trădare": [
      "Distrug și decreez în totalitate toate rănile, trădările, dezamăgirile și emoțiile de joasă frecvență ce au fost în relația mea cu {p} de până astăzi. Vrei să distrugi, eliberezi și decreezi? Spune DA.",
      "Distrug și decreez în totalitate toate momentele în care m-am simțit trădat(ă), nedreptățit(ă) sau nevăzut(ă) în relația cu {p} și toate efectele lor de până astăzi. Spune DA.",
    ],
    "Gelozie / control": [
      "Distrug și decreez în totalitate toată gelozia, nevoia de control, fricile și proiecțiile pe care le-am creat sau preluat în relația cu {p} de până astăzi. Spune DA.",
      "Oriunde am ales să controlez sau să mă las controlat(ă) în relația cu {p}, oriunde am creat gelozie ca formă de iubire sau protecție, vrei să distrugi și decreezi? Spune DA.",
    ],
    "Distanță emoțională": [
      "Distrug și decreez în totalitate toate barierele, zidurile și distanțele emoționale pe care le-am creat în relația cu {p} de până astăzi. Spune DA.",
      "Oriunde am ales tăcerea sau retragerea în locul apropierii față de {p}, vrei să distrugi, eliberezi și decreezi? Spune DA.",
    ],
    "Așteptări neîmplinite": [
      "Distrug și decreez în totalitate toate așteptările, iluziile și dezamăgirile pe care le-am creat în relația cu {p} de până astăzi. Spune DA.",
      "Oriunde am decis că {p} ar trebui să fie altfel sau să mă iubească diferit, vrei să distrugi și decreezi? Spune DA.",
    ],
    "Teamă de abandon": [
      "Distrug și decreez în totalitate toate fricile de abandon, de pierdere sau separare care au influențat relația mea cu {p} de până astăzi. Spune DA.",
      "Oriunde am ales să mă micșorez sau să mă sacrific din frică de abandon în relația cu {p}, vrei să distrugi și decreezi? Spune DA.",
    ],
    "Vinovăție": [
      "Distrug și decreez în totalitate toată vinovăția, auto-pedeapsa și judecata față de mine și față de {p} din relația noastră de până astăzi. Spune DA.",
      "Oriunde m-am vinovat(ă) sau l-am/o am învinuit pe {p} și am creat suferință din asta, vrei să distrugi, eliberezi și decreezi? Spune DA.",
    ],
    "Comunicare blocată": [
      "Distrug și decreez în totalitate toate cuvintele nespuse, reproșurile ascunse și neînțelegerile din relația mea cu {p} de până astăzi. Spune DA.",
      "Oriunde mi-am înghițit adevărul sau am vorbit din frică în relația cu {p}, vrei să distrugi și decreezi? Spune DA.",
    ],
    "Loialități de familie": [
      "Distrug și decreez în totalitate toate tiparele și loialitățile preluate din familia mea care au influențat relația mea cu {p} de până astăzi. Spune DA.",
      "Oriunde am repetat în relația cu {p} tipare moștenite din familie, din loialitate față de un sistem, vrei să distrugi și decreezi? Spune DA.",
    ],
    "Dependență emoțională": [
      "Distrug și decreez în totalitate toată dependența, atașamentul nesănătos și nevoia de validare pe care le-am creat în relația cu {p} de până astăzi. Spune DA.",
      "Oriunde mi-am condiționat fericirea și valoarea de prezența sau aprobarea lui/ei {p}, vrei să distrugi și decreezi? Spune DA.",
    ],
    "Putere / dominare": [
      "Distrug și decreez în totalitate toate dinamicile de putere, dominare sau manipulare ce au existat în relația mea cu {p} de până astăzi. Spune DA.",
      "Oriunde am cedat puterea mea sau am preluat-o pe a lui/ei {p} în mod nesănătos, vrei să distrugi și decreezi? Spune DA.",
    ],
  },
  parinte: {
    "Vinovăție": [
      "Distrug și decreez în totalitate toată vinovăția față de {p}, tot ce am crezut că am greșit în relația noastră de până astăzi. Spune DA.",
      "Oriunde am primit vinovăția de la {p} și am purtat-o ca pe a mea, vrei să distrugi, eliberezi și decreezi? Spune DA.",
    ],
    "Așteptări și judecăți": [
      "Distrug și decreez în totalitate toate așteptările și judecățile din relația mea cu {p} — ale mele și ale lui/ei față de mine — de până astăzi. Spune DA.",
      "Oriunde am simțit că nu sunt destul de bun(ă) pentru {p}, vrei să distrugi și decreezi? Spune DA.",
    ],
    "Răni din copilărie": [
      "Distrug și decreez în totalitate toate rănile și traumele din relația mea cu {p} și toate efectele lor ce mă urmăresc până astăzi. Spune DA.",
      "Oriunde copilul din mine încă poartă durerea relației cu {p}, vrei să distrugi și decreezi? Spune DA.",
    ],
    "Lipsă de recunoaștere": [
      "Distrug și decreez în totalitate toate momentele în care nu m-am simțit văzut(ă) sau apreciat(ă) de {p} de până astăzi. Spune DA.",
      "Oriunde mi-am condiționat valoarea de recunoașterea lui/ei {p}, vrei să distrugi și decreezi? Spune DA.",
    ],
    "Control / supraprotecție": [
      "Distrug și decreez în totalitate tot controlul și supraprotecția din relația cu {p} și toate efectele lor de până astăzi. Spune DA.",
      "Oriunde m-am lăsat controlat(ă) de {p} sau am ales să controlez la rândul meu din frică, vrei să distrugi și decreezi? Spune DA.",
    ],
    "Tipare moștenite": [
      "Distrug și decreez în totalitate toate tiparele moștenite din relația cu {p} pe care le-am recreat în viața mea. Spune DA.",
      "Oriunde am ales să repet tiparele lui/ei {p} din loialitate sau din lipsă de alte modele, vrei să distrugi și decreezi? Spune DA.",
    ],
    "Separare / distanță": [
      "Distrug și decreez în totalitate toată distanța și răceala din relația mea cu {p} de până astăzi. Spune DA.",
      "Oriunde distanța față de {p} a devenit normă ca formă de protecție, vrei să distrugi și decreezi? Spune DA.",
    ],
    "Frică de dezamăgire": [
      "Distrug și decreez în totalitate toată frica de a-l/o dezamăgi pe {p} și tot ce am evitat din cauza asta. Spune DA.",
      "Oriunde mi-am trăit viața în funcție de așteptările lui/ei {p} din frică de dezamăgire, vrei să distrugi și decreezi? Spune DA.",
    ],
    "Comparații dureroase": [
      "Distrug și decreez în totalitate toate comparațiile și umilințele pe care le-am trăit în relația cu {p} de până astăzi. Spune DA.",
      "Oriunde m-am simțit mai puțin față de așteptările lui/ei {p}, vrei să distrugi și decreezi? Spune DA.",
    ],
    "Loialitate toxică": [
      "Distrug și decreez în totalitate toată loialitatea față de {p} care m-a ținut blocat(ă) sau mi-a limitat propria viață. Spune DA.",
      "Oriunde am ales suferința sau sacrificiul din loialitate față de {p}, vrei să distrugi și decreezi? Spune DA.",
    ],
  },
};
