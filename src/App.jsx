import { useState, useEffect } from "react";

const nottiList = [4,5,6,7,8,9,10,11,12,13,14,15];

const prezzi = {
  adulto: [620,700,780,860,935,1020,1100,1185,1265,1350,1425,1500],
  single: [875,1020,1165,1310,1455,1600,1745,1890,2040,2185,2330,2480],
  b2_5:   [325,365,405,450,500,540,580,625,670,710,750,800],
  b6:     [540,620,700,780,860,935,1020,1100,1185,1265,1350,1425],
};

const SOCIAL = {
  maldiveSito: "https://www.maldiveautentiche.com/it_it/",
  maldiveIg:   "https://www.instagram.com/lemaldiveautentiche",
  maldiveFb:   "https://www.facebook.com/p/Le-Maldive-Autentiche-61577958914833/",
};

const ACCONTO = { adulto: 200, b25: 50, b6: 100, b712: 100 };

const traduzioni = {
  it: {
    flag:"🇮🇹", label:"Italiano",
    saluto: n => `Ciao ${n}! 🌊`,
    proposta: () => `Ecco la proposta *Feridhoo — Atollo di Ari Nord*:`,
    adulti:"Adulti", singola:"uso singola", totale:"Totale",
    bimbi02:"Bambini 0-2 anni", bimbi25:"Bambini 2-5 anni",
    bimbi6:"Bambini 6 anni", bimbi712:"Bambini 7-12 anni",
    gratuito:"GRATUITO", totaleComplessivo:"TOTALE",
    giorni:"giorni", notti:"notti",
    acconto:"💳 *ACCONTO (bonifico bancario):*",
    saldo:"💵 *SALDO (cash in struttura):*",
    cambioOdierno:"al cambio odierno",
    incluso:"✅ *Incluso nel pacchetto:*",
    servizi:[
      "Accoglienza Airport counter",
      "Trasferimenti in barca veloce",
      "Pensione completa (softdrinks ai pasti, in escursione e acqua nel frigo bar)",
      "Tasse",
      "Pulizia camera",
      "Escursioni incluse: n.01 snorkeling con mante 🦈, n.01 snorkeling con tartarughe 🐢, n.01 avvistamento delfini 🐬",
      "n.01 ombrellone e n.02 lettini per camera in escursione",
      "⚠️ N.B.: LE ESCURSIONI NON SONO RIMBORSABILI PER VS NO-SHOW O PER METEO AVVERSO",
    ],
    voli:"✈️ Per i *voli* possiamo supportarti tramite le nostre agenzie partner o guidarti nella prenotazione autonoma — basta chiedere!",
    chiudi:"Sono qui per qualsiasi domanda, scrivimi quando vuoi 🌴",
    seguici:"🌍 *Seguici e metti like, ci trovi qui:*",
    socialMaldiveSito:"🌐 Le Maldive Autentiche — Sito",
    socialMaldiveIg:"📸 Le Maldive Autentiche Instagram",
    socialMaldiveFb:"📘 Le Maldive Autentiche Facebook",
  },
  en: {
    flag:"🇬🇧", label:"English",
    saluto: n => `Hi ${n}! 🌊`,
    proposta: () => `Here is the *Feridhoo — North Ari Atoll* proposal:`,
    adulti:"Adults", singola:"single use", totale:"Total",
    bimbi02:"Children 0-2 yrs", bimbi25:"Children 2-5 yrs",
    bimbi6:"Children 6 yrs", bimbi712:"Children 7-12 yrs",
    gratuito:"FREE OF CHARGE", totaleComplessivo:"TOTAL",
    giorni:"days", notti:"nights",
    acconto:"💳 *DEPOSIT (bank transfer):*",
    saldo:"💵 *BALANCE (cash on-site):*",
    cambioOdierno:"at today's rate",
    incluso:"✅ *Included in the package:*",
    servizi:[
      "Airport counter welcome",
      "Speedboat transfers",
      "Full board (soft drinks with meals, during excursions and water in minibar)",
      "Taxes",
      "Room cleaning",
      "Excursions included: x1 manta ray snorkeling 🦈, x1 turtle snorkeling 🐢, x1 dolphin watching 🐬",
      "x1 beach umbrella and x2 sun loungers per room during excursions",
      "⚠️ N.B.: EXCURSIONS ARE NON-REFUNDABLE FOR NO-SHOW OR BAD WEATHER",
    ],
    voli:"✈️ For *flights* we can assist you through our partner agencies or guide you to book independently — just ask!",
    chiudi:"I'm here for any questions, feel free to write anytime 🌴",
    seguici:"🌍 *Follow us and leave a like:*",
    socialMaldiveSito:"🌐 Le Maldive Autentiche — Website",
    socialMaldiveIg:"📸 Le Maldive Autentiche Instagram",
    socialMaldiveFb:"📘 Le Maldive Autentiche Facebook",
  },
  de: {
    flag:"🇩🇪", label:"Deutsch",
    saluto: n => `Hallo ${n}! 🌊`,
    proposta: () => `Hier ist unser *Feridhoo — Nordatoll Ari* Angebot:`,
    adulti:"Erwachsene", singola:"Einzelzimmer", totale:"Gesamt",
    bimbi02:"Kinder 0-2 J.", bimbi25:"Kinder 2-5 J.",
    bimbi6:"Kinder 6 J.", bimbi712:"Kinder 7-12 J.",
    gratuito:"KOSTENLOS", totaleComplessivo:"GESAMT",
    giorni:"Tage", notti:"Nächte",
    acconto:"💳 *ANZAHLUNG (Banküberweisung):*",
    saldo:"💵 *RESTZAHLUNG (Bar vor Ort):*",
    cambioOdierno:"zum aktuellen Kurs",
    incluso:"✅ *Im Paket enthalten:*",
    servizi:[
      "Empfang am Flughafen",
      "Schnellboot-Transfer",
      "Vollpension (Softdrinks zu den Mahlzeiten, bei Ausflügen und Wasser in der Minibar)",
      "Steuern",
      "Zimmerreinigung",
      "Inkludierte Ausflüge: 1x Mantarochen-Schnorcheln 🦈, 1x Schildkröten-Schnorcheln 🐢, 1x Delfin-Watching 🐬",
      "1x Sonnenschirm und 2x Liegestühle pro Zimmer bei Ausflügen",
      "⚠️ HINWEIS: AUSFLÜGE SIND BEI NO-SHOW ODER SCHLECHTEM WETTER NICHT ERSTATTUNGSFÄHIG",
    ],
    voli:"✈️ Bei *Flügen* können wir Ihnen über unsere Partneragenturen helfen — fragen Sie einfach!",
    chiudi:"Ich bin jederzeit für Fragen erreichbar 🌴",
    seguici:"🌍 *Folge uns und gib uns ein Like:*",
    socialMaldiveSito:"🌐 Le Maldive Autentiche — Webseite",
    socialMaldiveIg:"📸 Le Maldive Autentiche Instagram",
    socialMaldiveFb:"📘 Le Maldive Autentiche Facebook",
  },
  fr: {
    flag:"🇫🇷", label:"Français",
    saluto: n => `Bonjour ${n}! 🌊`,
    proposta: () => `Voici notre proposition *Feridhoo — Atoll Ari Nord*:`,
    adulti:"Adultes", singola:"chambre individuelle", totale:"Total",
    bimbi02:"Enfants 0-2 ans", bimbi25:"Enfants 2-5 ans",
    bimbi6:"Enfants 6 ans", bimbi712:"Enfants 7-12 ans",
    gratuito:"GRATUIT", totaleComplessivo:"TOTAL",
    giorni:"jours", notti:"nuits",
    acconto:"💳 *ACOMPTE (virement bancaire):*",
    saldo:"💵 *SOLDE (espèces sur place):*",
    cambioOdierno:"au taux du jour",
    incluso:"✅ *Inclus dans le forfait:*",
    servizi:[
      "Accueil au comptoir de l'aéroport",
      "Transferts en bateau rapide",
      "Pension complète (softs aux repas, en excursion et eau au minibar)",
      "Taxes",
      "Nettoyage de la chambre",
      "Excursions incluses: x1 snorkeling avec raies manta 🦈, x1 snorkeling avec tortues 🐢, x1 observation des dauphins 🐬",
      "x1 parasol et x2 transats par chambre lors des excursions",
      "⚠️ N.B.: LES EXCURSIONS NE SONT PAS REMBOURSABLES EN CAS DE NO-SHOW OU MAUVAIS TEMPS",
    ],
    voli:"✈️ Pour les *vols*, nous pouvons vous aider via nos agences partenaires — demandez-nous!",
    chiudi:"Je suis disponible pour toute question, écrivez-moi quand vous voulez 🌴",
    seguici:"🌍 *Suivez-nous et mettez un like:*",
    socialMaldiveSito:"🌐 Le Maldive Autentiche — Site web",
    socialMaldiveIg:"📸 Le Maldive Autentiche Instagram",
    socialMaldiveFb:"📘 Le Maldive Autentiche Facebook",
  },
  nl: {
    flag:"🇳🇱", label:"Nederlands",
    saluto: n => `Hallo ${n}! 🌊`,
    proposta: () => `Hier is ons *Feridhoo — Noord Ari Atol* voorstel:`,
    adulti:"Volwassenen", singola:"eenpersoonskamer", totale:"Totaal",
    bimbi02:"Kinderen 0-2 jr", bimbi25:"Kinderen 2-5 jr",
    bimbi6:"Kinderen 6 jr", bimbi712:"Kinderen 7-12 jr",
    gratuito:"GRATIS", totaleComplessivo:"TOTAAL",
    giorni:"dagen", notti:"nachten",
    acconto:"💳 *AANBETALING (bankoverschrijving):*",
    saldo:"💵 *RESTBETALING (contant ter plaatse):*",
    cambioOdierno:"tegen huidige koers",
    incluso:"✅ *Inbegrepen in het pakket:*",
    servizi:[
      "Ontvangst op de luchthaven",
      "Speedboottransfers",
      "Vol pension (frisdranken bij maaltijden, tijdens excursies en water in minibar)",
      "Belastingen",
      "Kamerreiniging",
      "Inbegrepen excursies: 1x snorkelen met mantaroggen 🦈, 1x snorkelen met schildpadden 🐢, 1x dolfijnen spotten 🐬",
      "1x parasol en 2x ligstoelen per kamer tijdens excursies",
      "⚠️ N.B.: EXCURSIES ZIJN NIET RESTITUEERBAAR BIJ NO-SHOW OF SLECHT WEER",
    ],
    voli:"✈️ Voor *vluchten* kunnen wij u helpen via onze partneragentschappen — vraag het gewoon!",
    chiudi:"Ik sta altijd klaar voor vragen, schrijf me wanneer je wilt 🌴",
    seguici:"🌍 *Volg ons en geef een like:*",
    socialMaldiveSito:"🌐 Le Maldive Autentiche — Website",
    socialMaldiveIg:"📸 Le Maldive Autentiche Instagram",
    socialMaldiveFb:"📘 Le Maldive Autentiche Facebook",
  },
  da: {
    flag:"🇩🇰", label:"Dansk",
    saluto: n => `Hej ${n}! 🌊`,
    proposta: () => `Her er vores *Feridhoo — Nordlige Ari Atol* tilbud:`,
    adulti:"Voksne", singola:"enkeltværelse", totale:"Total",
    bimbi02:"Børn 0-2 år", bimbi25:"Børn 2-5 år",
    bimbi6:"Børn 6 år", bimbi712:"Børn 7-12 år",
    gratuito:"GRATIS", totaleComplessivo:"TOTAL",
    giorni:"dage", notti:"nætter",
    acconto:"💳 *DEPOSITUM (bankoverførsel):*",
    saldo:"💵 *RESTBETALING (kontant på stedet):*",
    cambioOdierno:"til dagens kurs",
    incluso:"✅ *Inkluderet i pakken:*",
    servizi:[
      "Velkomst i lufthavnen",
      "Speedbåd-transfer",
      "Helpension (sodavand til måltider, under udflugter og vand i minibar)",
      "Skatter",
      "Rengøring af værelse",
      "Inkluderede udflugter: 1x snorkling med mantarokker 🦈, 1x snorkling med skildpadder 🐢, 1x delfin-watching 🐬",
      "1x parasol og 2x liggestole pr. værelse under udflugter",
      "⚠️ BEMÆRK: UDFLUGTER REFUNDERES IKKE VED NO-SHOW ELLER DÅRLIGT VEJR",
    ],
    voli:"✈️ Til *fly* kan vi hjælpe dig via vores partneragenturer — spørg bare!",
    chiudi:"Jeg er tilgængelig for spørgsmål når som helst 🌴",
    seguici:"🌍 *Følg os og giv et like:*",
    socialMaldiveSito:"🌐 Le Maldive Autentiche — Hjemmeside",
    socialMaldiveIg:"📸 Le Maldive Autentiche Instagram",
    socialMaldiveFb:"📘 Le Maldive Autentiche Facebook",
  },
};

export default function App() {
  const [lingua, setLingua]   = useState("it");
  const [notti, setNotti]     = useState(7);
  const [isSingle, setIsSingle] = useState(false);
  const [adulti, setAdulti]   = useState(2);
  const [b02, setB02]         = useState(0);
  const [b25, setB25]         = useState(0);
  const [b6, setB6]           = useState(0);
  const [b712, setB712]       = useState(0);
  const [nome, setNome]       = useState("");
  const [copied, setCopied]   = useState(false);
  const [eurRate, setEurRate] = useState(null);

  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/USD")
      .then(r => r.json())
      .then(d => setEurRate(d.rates?.EUR ?? null))
      .catch(() => setEurRate(null));
  }, []);

  const t    = traduzioni[lingua];
  const idx  = nottiList.indexOf(notti);
  const giorni = notti + 1;

  const prezzoAdultoUSD = isSingle && adulti === 1 ? prezzi.single[idx] : prezzi.adulto[idx];
  const prezzoB712USD   = prezzi.adulto[idx]; // stessa fascia adulto

  // SALDO in USD
  const saldoAdultiUSD = prezzoAdultoUSD * adulti;
  const saldoB25USD    = prezzi.b2_5[idx] * b25;
  const saldoB6USD     = prezzi.b6[idx] * b6;
  const saldoB712USD   = prezzoB712USD * b712;
  const saldoTotUSD    = saldoAdultiUSD + saldoB25USD + saldoB6USD + saldoB712USD;

  // ACCONTO in EUR
  const accontoAdulti = ACCONTO.adulto * adulti;
  const accontoB25    = ACCONTO.b25 * b25;
  const accontoB6     = ACCONTO.b6 * b6;
  const accontoB712   = ACCONTO.b712 * b712;
  const accontoTot    = accontoAdulti + accontoB25 + accontoB6 + accontoB712;

  // Conversione saldo USD → EUR
  const saldoTotEUR = eurRate ? Math.round(saldoTotUSD * eurRate) : null;

  const generaScript = () => {
    const n = nome || "[Nome]";
    let righe = "";
    righe += `\n👤 ${t.adulti} (${adulti}${isSingle && adulti===1 ? ` — ${t.singola}` : ""}): *$${prezzoAdultoUSD}/cad* → ${t.totale}: *$${saldoAdultiUSD}*`;
    if (b02  > 0) righe += `\n👶 ${t.bimbi02} (${b02}): *${t.gratuito}*`;
    if (b25  > 0) righe += `\n👶 ${t.bimbi25} (${b25}): *$${prezzi.b2_5[idx]}/cad* → ${t.totale}: *$${saldoB25USD}*`;
    if (b6   > 0) righe += `\n👦 ${t.bimbi6} (${b6}): *$${prezzi.b6[idx]}/cad* → ${t.totale}: *$${saldoB6USD}*`;
    if (b712 > 0) righe += `\n👦 ${t.bimbi712} (${b712}): *$${prezzoB712USD}/cad* → ${t.totale}: *$${saldoB712USD}*`;

    const rigaSaldoEUR = saldoTotEUR ? ` → ~€${saldoTotEUR} ${t.cambioOdierno}` : "";

    return `${t.saluto(n)}

${t.proposta()}

🗓️ *${giorni} ${t.giorni} / ${notti} ${t.notti}*
${righe}

${t.acconto} *€${accontoTot} (EUR)*
${t.saldo} *$${saldoTotUSD} (USD)*${rigaSaldoEUR}

${t.incluso}
${t.servizi.map(s => `• ${s}`).join("\n")}

🌍 ${t.seguici}
${t.socialMaldiveSito} → ${SOCIAL.maldiveSito}
${t.socialMaldiveIg} → ${SOCIAL.maldiveIg}
${t.socialMaldiveFb} → ${SOCIAL.maldiveFb}

${t.voli}

${t.chiudi}`;
  };

  const script = generaScript();
  const copia = () => {
    navigator.clipboard.writeText(script).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const inputCls = "w-full border border-teal-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white";
  const labelCls = "block text-xs font-semibold text-teal-900 mb-1";

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 p-4">
      <div className="max-w-2xl mx-auto">

        <div className="bg-gradient-to-r from-teal-600 to-cyan-500 rounded-2xl p-5 mb-5 text-white text-center shadow-lg">
          <div className="text-2xl mb-1">🏝️ Feridhoo — Atollo di Ari Nord</div>
          <div className="text-sm opacity-90">Generatore Preventivo WhatsApp</div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-5 mb-5 space-y-4">

          <div>
            <label className={labelCls}>🌐 Lingua del preventivo</label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(traduzioni).map(([k,v]) => (
                <button key={k} onClick={() => setLingua(k)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${lingua===k ? "bg-teal-600 text-white border-teal-600" : "bg-white text-teal-700 border-teal-300 hover:bg-teal-50"}`}>
                  {v.flag} {v.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelCls}>👤 Nome del cliente</label>
            <input className={inputCls} placeholder="Es. Marco" value={nome} onChange={e => setNome(e.target.value)} />
          </div>

          <div>
            <label className={labelCls}>🗓️ Numero di notti: <span className="text-teal-600 font-bold">{notti} notti / {giorni} giorni</span></label>
            <input type="range" min={4} max={15} value={notti} onChange={e => setNotti(Number(e.target.value))} className="w-full accent-teal-500" />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              {nottiList.map(n => <span key={n}>{n}</span>)}
            </div>
          </div>

          <div>
            <label className={labelCls}>👥 Numero adulti</label>
            <div className="flex items-center gap-3">
              <button onClick={() => { setAdulti(Math.max(1, adulti-1)); setIsSingle(false); }} className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 font-bold text-lg">−</button>
              <span className="text-lg font-bold text-teal-800 w-6 text-center">{adulti}</span>
              <button onClick={() => { setAdulti(adulti+1); setIsSingle(false); }} className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 font-bold text-lg">+</button>
              {adulti === 1 && (
                <label className="flex items-center gap-2 text-sm text-teal-700 ml-2 cursor-pointer">
                  <input type="checkbox" checked={isSingle} onChange={e => setIsSingle(e.target.checked)} className="accent-teal-500" />
                  Supplemento singola
                </label>
              )}
            </div>
          </div>

          <div className="bg-teal-50 rounded-xl p-3 space-y-3">
            <div className="text-xs font-semibold text-teal-900">👶 Bambini</div>
            {[
              { label:"0-2 anni (gratuito)", val:b02, set:setB02 },
              { label:"2-5 anni",            val:b25, set:setB25 },
              { label:"6 anni",              val:b6,  set:setB6  },
              { label:"7-12 anni",           val:b712, set:setB712 },
            ].map(r => (
              <div key={r.label} className="flex items-center justify-between">
                <span className="text-xs text-teal-800">{r.label}</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => r.set(Math.max(0, r.val-1))} className="w-7 h-7 rounded-full bg-white border border-teal-200 text-teal-700 font-bold">−</button>
                  <span className="w-5 text-center text-sm font-bold text-teal-800">{r.val}</span>
                  <button onClick={() => r.set(r.val+1)} className="w-7 h-7 rounded-full bg-white border border-teal-200 text-teal-700 font-bold">+</button>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Riepilogo */}
        <div className="bg-white rounded-2xl shadow-md p-5 mb-5">
          <div className="text-sm font-bold text-teal-900 mb-3">💰 Riepilogo costi</div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between"><span>👤 Adulti ({adulti}{isSingle && adulti===1 ? " singola" : ""}) × ${prezzoAdultoUSD}</span><span className="font-semibold">${saldoAdultiUSD}</span></div>
            {b02  > 0 && <div className="flex justify-between text-green-600"><span>👶 Bimbi 0-2 ({b02})</span><span className="font-semibold">GRATIS</span></div>}
            {b25  > 0 && <div className="flex justify-between"><span>👶 Bimbi 2-5 ({b25}) × ${prezzi.b2_5[idx]}</span><span className="font-semibold">${saldoB25USD}</span></div>}
            {b6   > 0 && <div className="flex justify-between"><span>👦 Bimbi 6 ({b6}) × ${prezzi.b6[idx]}</span><span className="font-semibold">${saldoB6USD}</span></div>}
            {b712 > 0 && <div className="flex justify-between"><span>👦 Bimbi 7-12 ({b712}) × ${prezzoB712USD}</span><span className="font-semibold">${saldoB712USD}</span></div>}
            <div className="border-t pt-2 mt-2 space-y-1">
              <div className="flex justify-between font-bold text-teal-700">
                <span>💳 ACCONTO (bonifico)</span><span>€{accontoTot}</span>
              </div>
              <div className="flex justify-between font-bold text-green-700">
                <span>💵 SALDO (cash in struttura)</span>
                <span>${saldoTotUSD}{saldoTotEUR ? ` (~€${saldoTotEUR})` : ""}</span>
              </div>
              {eurRate && <div className="text-xs text-gray-400 text-right">Cambio: 1 USD = €{eurRate.toFixed(4)}</div>}
            </div>
          </div>
        </div>

        {/* Script */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <div className="flex justify-between items-center mb-3">
            <div className="text-sm font-bold text-teal-900">📱 Script WhatsApp — {t.flag} {t.label}</div>
            <button onClick={copia} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${copied ? "bg-green-500 text-white" : "bg-teal-600 text-white hover:bg-teal-700"}`}>
              {copied ? "✅ Copiato!" : "📋 Copia"}
            </button>
          </div>
          <pre className="text-xs text-gray-700 whitespace-pre-wrap bg-gray-50 rounded-xl p-4 leading-relaxed">{script}</pre>
        </div>

      </div>
    </div>
  );
}