import { useState } from "react";

const nottiList = [4,5,6,7,8,9,10,11,12,13,14,15];

const prezzi = {
  adulto: [620,700,780,860,935,1020,1100,1185,1265,1350,1425,1500],
  single: [875,1020,1165,1310,1455,1600,1745,1890,2040,2185,2330,2480],
  b2_5:   [325,365,405,450,500,540,580,625,670,710,750,800],
  b6_12:  [540,620,700,780,860,935,1020,1100,1185,1265,1350,1425],
};

const SOCIAL = {
  a20fb: "https://www.facebook.com/AfterTwentyTravel/",
  a20ig: "https://www.instagram.com/a20travel/",
};

const traduzioni = {
  it: {
    flag:"🇮🇹", label:"Italiano",
    saluto: n => `Ciao ${n}! 🌊`,
    proposta: () => `Ecco la proposta *Feridhoo — Atollo di Ari Nord*:`,
    adulti:"Adulti", singola:"uso singola", totale:"Totale",
    bimbi02:"Bambini 0-2 anni", bimbi25:"Bambini 2-5 anni", bimbi612:"Bambini 6-12 anni",
    gratuito:"GRATUITO", totaleComplessivo:"TOTALE COMPLESSIVO",
    giorni:"giorni", notti:"notti",
    voliEsclusi:"*voli esclusi*",
    incluso:"✅ *Incluso nel pacchetto:*",
    servizi:[
      "Accoglienza Airport counter",
      "Trasferimenti in barca veloce",
      "Pensione completa (bevande ai pasti)",
      "Tasse",
      "Pulizia camera",
      "Escursioni incluse: n.01 snorkeling con mante 🦈, n.01 snorkeling con tartarughe 🐢, n.01 avvistamento delfini 🐬",
    ],
    voli:"✈️ Per i *voli* possiamo supportarti tramite le nostre agenzie partner o guidarti nella prenotazione autonoma — basta chiedere!",
    chiudi:"Sono qui per qualsiasi domanda, scrivimi quando vuoi 🌴",
    seguici:"🌍 *Seguici e metti like, ci trovi qui:*",
    socialA20Fb:"📘 A20 Travel Facebook",
    socialA20Ig:"📸 A20 Travel Instagram",
  },
  en: {
    flag:"🇬🇧", label:"English",
    saluto: n => `Hi ${n}! 🌊`,
    proposta: () => `Here is the *Feridhoo — North Ari Atoll* proposal:`,
    adulti:"Adults", singola:"single use", totale:"Total",
    bimbi02:"Children 0-2 yrs", bimbi25:"Children 2-5 yrs", bimbi612:"Children 6-12 yrs",
    gratuito:"FREE OF CHARGE", totaleComplessivo:"TOTAL",
    giorni:"days", notti:"nights",
    voliEsclusi:"*flights not included*",
    incluso:"✅ *Included in the package:*",
    servizi:[
      "Airport counter welcome",
      "Speedboat transfers",
      "Full board (drinks with meals)",
      "Taxes",
      "Room cleaning",
      "Excursions included: x1 manta ray snorkeling 🦈, x1 turtle snorkeling 🐢, x1 dolphin watching 🐬",
    ],
    voli:"✈️ For *flights* we can assist you through our partner agencies or guide you to book independently — just ask!",
    chiudi:"I'm here for any questions, feel free to write anytime 🌴",
    seguici:"🌍 *Follow us and leave a like:*",
    socialA20Fb:"📘 A20 Travel Facebook",
    socialA20Ig:"📸 A20 Travel Instagram",
  },
  de: {
    flag:"🇩🇪", label:"Deutsch",
    saluto: n => `Hallo ${n}! 🌊`,
    proposta: () => `Hier ist unser *Feridhoo — Nordatoll Ari* Angebot:`,
    adulti:"Erwachsene", singola:"Einzelzimmer", totale:"Gesamt",
    bimbi02:"Kinder 0-2 J.", bimbi25:"Kinder 2-5 J.", bimbi612:"Kinder 6-12 J.",
    gratuito:"KOSTENLOS", totaleComplessivo:"GESAMTBETRAG",
    giorni:"Tage", notti:"Nächte",
    voliEsclusi:"*Flüge nicht inbegriffen*",
    incluso:"✅ *Im Paket enthalten:*",
    servizi:[
      "Empfang am Flughafen",
      "Schnellboot-Transfer",
      "Vollpension (Getränke zu den Mahlzeiten)",
      "Steuern",
      "Zimmerreinigung",
      "Inkludierte Ausflüge: 1x Mantarochen-Schnorcheln 🦈, 1x Schildkröten-Schnorcheln 🐢, 1x Delfin-Watching 🐬",
    ],
    voli:"✈️ Bei *Flügen* können wir Ihnen über unsere Partneragenturen helfen — fragen Sie einfach!",
    chiudi:"Ich bin jederzeit für Fragen erreichbar 🌴",
    seguici:"🌍 *Folge uns und gib uns ein Like:*",
    socialA20Fb:"📘 A20 Travel Facebook",
    socialA20Ig:"📸 A20 Travel Instagram",
  },
  fr: {
    flag:"🇫🇷", label:"Français",
    saluto: n => `Bonjour ${n}! 🌊`,
    proposta: () => `Voici notre proposition *Feridhoo — Atoll Ari Nord*:`,
    adulti:"Adultes", singola:"chambre individuelle", totale:"Total",
    bimbi02:"Enfants 0-2 ans", bimbi25:"Enfants 2-5 ans", bimbi612:"Enfants 6-12 ans",
    gratuito:"GRATUIT", totaleComplessivo:"TOTAL GÉNÉRAL",
    giorni:"jours", notti:"nuits",
    voliEsclusi:"*vols non inclus*",
    incluso:"✅ *Inclus dans le forfait:*",
    servizi:[
      "Accueil au comptoir de l'aéroport",
      "Transferts en bateau rapide",
      "Pension complète (boissons aux repas)",
      "Taxes",
      "Nettoyage de la chambre",
      "Excursions incluses: x1 snorkeling avec raies manta 🦈, x1 snorkeling avec tortues 🐢, x1 observation des dauphins 🐬",
    ],
    voli:"✈️ Pour les *vols*, nous pouvons vous aider via nos agences partenaires — demandez-nous!",
    chiudi:"Je suis disponible pour toute question, écrivez-moi quand vous voulez 🌴",
    seguici:"🌍 *Suivez-nous et mettez un like:*",
    socialA20Fb:"📘 A20 Travel Facebook",
    socialA20Ig:"📸 A20 Travel Instagram",
  },
  nl: {
    flag:"🇳🇱", label:"Nederlands",
    saluto: n => `Hallo ${n}! 🌊`,
    proposta: () => `Hier is ons *Feridhoo — Noord Ari Atol* voorstel:`,
    adulti:"Volwassenen", singola:"eenpersoonskamer", totale:"Totaal",
    bimbi02:"Kinderen 0-2 jr", bimbi25:"Kinderen 2-5 jr", bimbi612:"Kinderen 6-12 jr",
    gratuito:"GRATIS", totaleComplessivo:"TOTAALBEDRAG",
    giorni:"dagen", notti:"nachten",
    voliEsclusi:"*vluchten niet inbegrepen*",
    incluso:"✅ *Inbegrepen in het pakket:*",
    servizi:[
      "Ontvangst op de luchthaven",
      "Speedboottransfers",
      "Vol pension (dranken bij maaltijden)",
      "Belastingen",
      "Kamerreiniging",
      "Inbegrepen excursies: 1x snorkelen met mantaroggen 🦈, 1x snorkelen met schildpadden 🐢, 1x dolfijnen spotten 🐬",
    ],
    voli:"✈️ Voor *vluchten* kunnen wij u helpen via onze partneragentschappen — vraag het gewoon!",
    chiudi:"Ik sta altijd klaar voor vragen, schrijf me wanneer je wilt 🌴",
    seguici:"🌍 *Volg ons en geef een like:*",
    socialA20Fb:"📘 A20 Travel Facebook",
    socialA20Ig:"📸 A20 Travel Instagram",
  },
  da: {
    flag:"🇩🇰", label:"Dansk",
    saluto: n => `Hej ${n}! 🌊`,
    proposta: () => `Her er vores *Feridhoo — Nordlige Ari Atol* tilbud:`,
    adulti:"Voksne", singola:"enkeltværelse", totale:"Total",
    bimbi02:"Børn 0-2 år", bimbi25:"Børn 2-5 år", bimbi612:"Børn 6-12 år",
    gratuito:"GRATIS", totaleComplessivo:"SAMLET BELØB",
    giorni:"dage", notti:"nætter",
    voliEsclusi:"*fly ikke inkluderet*",
    incluso:"✅ *Inkluderet i pakken:*",
    servizi:[
      "Velkomst i lufthavnen",
      "Speedbåd-transfer",
      "Helpension (drikkevarer til måltider)",
      "Skatter",
      "Rengøring af værelse",
      "Inkluderede udflugter: 1x snorkling med mantarokker 🦈, 1x snorkling med skildpadder 🐢, 1x delfin-watching 🐬",
    ],
    voli:"✈️ Til *fly* kan vi hjælpe dig via vores partneragenturer — spørg bare!",
    chiudi:"Jeg er tilgængelig for spørgsmål når som helst 🌴",
    seguici:"🌍 *Følg os og giv et like:*",
    socialA20Fb:"📘 A20 Travel Facebook",
    socialA20Ig:"📸 A20 Travel Instagram",
  },
};

export default function App() {
  const [lingua, setLingua]   = useState("it");
  const [notti, setNotti]     = useState(7);
  const [isSingle, setIsSingle] = useState(false);
  const [adulti, setAdulti]   = useState(2);
  const [b02, setB02]         = useState(0);
  const [b25, setB25]         = useState(0);
  const [b612, setB612]       = useState(0);
  const [nome, setNome]       = useState("");
  const [copied, setCopied]   = useState(false);

  const t    = traduzioni[lingua];
  const idx  = nottiList.indexOf(notti);
  const giorni = notti + 1;

  const prezzoAdulto = isSingle && adulti === 1 ? prezzi.single[idx] : prezzi.adulto[idx];
  const totAdulti    = prezzoAdulto * adulti;
  const totB25       = prezzi.b2_5[idx] * b25;
  const totB612      = prezzi.b6_12[idx] * b612;
  const totale       = totAdulti + totB25 + totB612;

  const generaScript = () => {
    const n = nome || "[Nome]";
    let rigaBimbi = "";
    if (b02  > 0) rigaBimbi += `\n👶 ${t.bimbi02} (${b02}): *${t.gratuito}*`;
    if (b25  > 0) rigaBimbi += `\n👶 ${t.bimbi25} (${b25}): *${prezzi.b2_5[idx]}€/cad* → ${t.totale}: *${totB25}€*`;
    if (b612 > 0) rigaBimbi += `\n👦 ${t.bimbi612} (${b612}): *${prezzi.b6_12[idx]}€/cad* → ${t.totale}: *${totB612}€*`;

    return `${t.saluto(n)}

${t.proposta()}

🗓️ *${giorni} ${t.giorni} / ${notti} ${t.notti}*
👤 ${t.adulti} (${adulti}${isSingle && adulti===1 ? ` — ${t.singola}` : ""}): *${prezzoAdulto}€/cad* → ${t.totale}: *${totAdulti}€*${rigaBimbi}

💰 *${t.totaleComplessivo}: ${totale}€*
_(${t.voliEsclusi})_

${t.incluso}
${t.servizi.map(s => `• ${s}`).join("\n")}

🌍 ${t.seguici}
${t.socialA20Fb} → ${SOCIAL.a20fb}
${t.socialA20Ig} → ${SOCIAL.a20ig}

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

          {/* Lingua */}
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

          {/* Nome */}
          <div>
            <label className={labelCls}>👤 Nome del cliente</label>
            <input className={inputCls} placeholder="Es. Marco" value={nome} onChange={e => setNome(e.target.value)} />
          </div>

          {/* Notti */}
          <div>
            <label className={labelCls}>🗓️ Numero di notti: <span className="text-teal-600 font-bold">{notti} notti / {giorni} giorni</span></label>
            <input type="range" min={4} max={15} value={notti} onChange={e => setNotti(Number(e.target.value))} className="w-full accent-teal-500" />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              {nottiList.map(n => <span key={n}>{n}</span>)}
            </div>
          </div>

          {/* Adulti */}
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

          {/* Bambini */}
          <div className="bg-teal-50 rounded-xl p-3 space-y-3">
            <div className="text-xs font-semibold text-teal-900">👶 Bambini</div>
            {[
              { label:"0-2 anni (gratuito)", val:b02, set:setB02 },
              { label:"2-5 anni",            val:b25, set:setB25 },
              { label:"6-12 anni",           val:b612, set:setB612 },
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
            <div className="flex justify-between">
              <span>👤 Adulti ({adulti}{isSingle && adulti===1 ? " singola" : ""}) × {prezzoAdulto}€</span>
              <span className="font-semibold">{totAdulti}€</span>
            </div>
            {b02  > 0 && <div className="flex justify-between text-green-600"><span>👶 Bimbi 0-2 ({b02})</span><span className="font-semibold">GRATIS</span></div>}
            {b25  > 0 && <div className="flex justify-between"><span>👶 Bimbi 2-5 ({b25}) × {prezzi.b2_5[idx]}€</span><span className="font-semibold">{totB25}€</span></div>}
            {b612 > 0 && <div className="flex justify-between"><span>👦 Bimbi 6-12 ({b612}) × {prezzi.b6_12[idx]}€</span><span className="font-semibold">{totB612}€</span></div>}
            <div className="border-t pt-2 mt-2 flex justify-between text-base font-bold text-teal-700">
              <span>TOTALE (voli esclusi)</span><span>{totale}€</span>
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