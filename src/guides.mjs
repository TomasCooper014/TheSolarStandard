import { stateInfo, marketPrices } from "../config/site.mjs";
// Guide articles. Each html() gets the rebate maths so figures stay in step with rebates.js.
// Answer-first questions for Queensland. Each answer opens with the fact, so search engines and
// AI assistants can quote it as it stands. The same list feeds the page and its FAQPage data.
const qldFaq = ({ R, money }) => {
  const now = R.currentWindow(), next = R.nextWindow(now) || now;
  const year = Math.min(Math.max(R.yearOf(R.ymd()), 2026), 2030);
  const until = R.longDate(now.to), step = R.longDate(R.addDays(now.to, 1));
  const solar66 = R.solarStcs(6.6, 3, year), solar10 = R.solarStcs(10, 3, year);
  const b10 = R.batteryStcs(10, now.factor), b135 = R.batteryStcs(13.5, now.factor), b135n = R.batteryStcs(13.5, next.factor);
  const p = R.stcLabel;
  return [
    ["What solar and battery rebates can I get in Queensland?",
     `Queensland homeowners get two federal rebates: the STC solar rebate and the Cheaper Home Batteries rebate. Both come off the installer's price. There is no Queensland Government rebate for owner-occupiers at present. Landlords can get up to $3,500 towards solar on a rental through Supercharged Solar for Renters.`],
    ["How much is the solar rebate in Brisbane?",
     `A 6.6 kW system in Brisbane earns ${solar66} STCs, about ${money(solar66 * R.stcPrice)}, and a 10 kW system earns ${solar10} STCs, about ${money(solar10 * R.stcPrice)}, if installed in ${year}, with certificates at ${p}. South-east Queensland is STC zone 3.`],
    ["How much is the battery rebate in Queensland?",
     `A 10 kWh battery installed by ${until} earns ${b10} STCs, about ${money(b10 * R.stcPrice)}, and a 13.5 kWh battery earns ${b135} STCs, about ${money(b135 * R.stcPrice)}, at ${p} per certificate. The battery rebate is the same in every state.`],
    ["When does the battery rebate drop?",
     `The battery rebate steps down on ${step}, from ${now.factor} to ${next.factor} STCs per kWh. On a 13.5 kWh battery that is about ${money((b135 - b135n) * R.stcPrice)} less. It keeps stepping down every 1 January and 1 July until it ends in 2030.`],
    ["Does the signing date or the install date set the rebate?",
     `The install date sets the rebate, not the date you sign. A battery signed in December but installed in January gets the lower January rate, so ask the installer for an install date in writing.`],
    ["Is the Queensland Battery Booster rebate still available?",
     `No. Queensland's Battery Booster program has closed and its rebates are no longer available. Queensland batteries get the federal Cheaper Home Batteries rebate instead.`],
    ["Can landlords get a solar rebate in Queensland?",
     `Yes. Supercharged Solar for Renters pays eligible landlords $2,500 to $3,500 towards rooftop solar depending on system size: $2,500 for 3 to 4 kW, $3,000 for 4 to 5 kW and $3,500 for 5 kW or more. The property must be rented with tenant consent and have no existing solar. The landlord applies to the Queensland Government and needs conditional approval before installing.`],
    ["Do I have to apply for the federal rebates?",
     `No. You assign the certificates to your installer and they take the value off your price as a point-of-sale discount. The quote should show the STC discount as its own line.`],
    ["How big a battery gets the full rebate?",
     `The first 14 kWh of usable capacity gets the full rate. Each kWh from 14 to 28 gets 60% and each kWh from 28 to 50 gets 15%. Batteries under 5 kWh aren't eligible.`],
    ["Is The Solar Standard a government website?",
     `No. The Solar Standard is a private marketing service operated by TMC Innovations Pty Ltd. It publishes rebate guides and calculators and passes quote requests to one installation partner.`]
  ];
};

// Same answer-first format for Adelaide and South Australia.
const saFaq = ({ R, money }) => {
  const now = R.currentWindow(), next = R.nextWindow(now) || now;
  const year = Math.min(Math.max(R.yearOf(R.ymd()), 2026), 2030);
  const until = R.longDate(now.to), step = R.longDate(R.addDays(now.to, 1));
  const solar66 = R.solarStcs(6.6, 3, year), solar10 = R.solarStcs(10, 3, year);
  const b10 = R.batteryStcs(10, now.factor), b135 = R.batteryStcs(13.5, now.factor), b135n = R.batteryStcs(13.5, next.factor);
  const p = R.stcLabel;
  return [
    ["What solar and battery rebates can I get in Adelaide?",
     `Adelaide homes get two federal rebates: the STC solar rebate and the Cheaper Home Batteries rebate, both taken off the installer's price. South Australia's Home Battery Scheme has closed. Some households can also get a REPS incentive for joining an approved virtual power plant.`],
    ["How much is the solar rebate in Adelaide?",
     `A 6.6 kW system in Adelaide earns ${solar66} STCs, about ${money(solar66 * R.stcPrice)}, and a 10 kW system earns ${solar10} STCs, about ${money(solar10 * R.stcPrice)}, if installed in ${year}, with certificates at ${p}. Adelaide is STC zone 3.`],
    ["How much is the battery rebate in South Australia?",
     `A 10 kWh battery installed by ${until} earns ${b10} STCs, about ${money(b10 * R.stcPrice)}, and a 13.5 kWh battery earns ${b135} STCs, about ${money(b135 * R.stcPrice)}, at ${p} per certificate. The federal battery rebate is the same in every state.`],
    ["When does the battery rebate drop?",
     `The battery rebate steps down on ${step}, from ${now.factor} to ${next.factor} STCs per kWh. On a 13.5 kWh battery that is about ${money((b135 - b135n) * R.stcPrice)} less. It keeps stepping down every 1 January and 1 July until it ends in 2030.`],
    ["What is the REPS VPP incentive?",
     `The Retailer Energy Productivity Scheme (REPS) lets energy retailers and VPP operators offer an incentive for connecting a battery to an approved virtual power plant. The amount depends on the provider and the battery, eligibility rules apply, and it is paid after the VPP connection is approved, not taken off the quote.`],
    ["Is the SA Home Battery Scheme still open?",
     `No. South Australia's Home Battery Scheme has closed. South Australian batteries get the federal Cheaper Home Batteries rebate, plus any REPS VPP incentive the household qualifies for.`],
    ["Does the signing date or the install date set the rebate?",
     `The install date sets the rebate, not the date you sign. A battery signed in December but installed in January gets the lower January rate, so ask the installer for an install date in writing.`],
    ["Do I have to apply for the federal rebates?",
     `No. You assign the certificates to your installer and they take the value off your price as a point-of-sale discount. The quote should show the STC discount as its own line.`],
    ["Is The Solar Standard a government website?",
     `No. The Solar Standard is a private marketing service operated by TMC Innovations Pty Ltd. It publishes rebate guides and calculators and passes quote requests to one installation partner.`]
  ];
};

// Answer-first FAQ for every other state, built from the state facts in config/site.mjs.
const STATE_NAMES = { NSW: "New South Wales", VIC: "Victoria", WA: "Western Australia", TAS: "Tasmania", ACT: "the ACT", NT: "the Northern Territory" };
const stateFaq = (code) => ({ R, money }) => {
  const si = stateInfo[code], name = STATE_NAMES[code], city = si.city, z = si.zone;
  const now = R.currentWindow(), next = R.nextWindow(now) || now;
  const year = Math.min(Math.max(R.yearOf(R.ymd()), 2026), 2030);
  const until = R.longDate(now.to), step = R.longDate(R.addDays(now.to, 1));
  const solar66 = R.solarStcs(6.6, z, year), solar10 = R.solarStcs(10, z, year);
  const b10 = R.batteryStcs(10, now.factor), b135 = R.batteryStcs(13.5, now.factor), b135n = R.batteryStcs(13.5, next.factor);
  const p = R.stcLabel;
  const extra = si.extras[0];
  const stateQ = /no state-wide|Federal rebates apply/.test(extra.title + extra.body) ? null : [`${extra.title.replace(/:.*$/, "")}: what you need to know`, extra.body];
  return [
    [`What solar and battery rebates can I get in ${name}?`,
     `Homes in ${name} get two federal rebates: the STC solar rebate and the Cheaper Home Batteries rebate, both taken off the installer's price. ${si.short}`],
    [`How much is the solar rebate in ${city}?`,
     `A 6.6 kW system in ${city} earns ${solar66} STCs, about ${money(solar66 * R.stcPrice)}, and a 10 kW system earns ${solar10} STCs, about ${money(solar10 * R.stcPrice)}, if installed in ${year}, with certificates at ${p}. ${city} is STC zone ${z}.`],
    [`How much is the battery rebate in ${name}?`,
     `A 10 kWh battery installed by ${until} earns ${b10} STCs, about ${money(b10 * R.stcPrice)}, and a 13.5 kWh battery earns ${b135} STCs, about ${money(b135 * R.stcPrice)}, at ${p} per certificate. The federal battery rebate is the same in every state.`],
    ["When does the battery rebate drop?",
     `The battery rebate steps down on ${step}, from ${now.factor} to ${next.factor} STCs per kWh. On a 13.5 kWh battery that is about ${money((b135 - b135n) * R.stcPrice)} less. It keeps stepping down every 1 January and 1 July until it ends in 2030.`],
    ...(stateQ ? [stateQ] : []),
    ["Does the signing date or the install date set the rebate?",
     `The install date sets the rebate, not the date you sign. A battery signed in December but installed in January gets the lower January rate, so ask the installer for an install date in writing.`],
    ["Do I have to apply for the federal rebates?",
     `No. You assign the certificates to your installer and they take the value off your price as a point-of-sale discount. The quote should show the STC discount as its own line.`],
    ["Is The Solar Standard a government website?",
     `No. The Solar Standard is a private marketing service operated by TMC Innovations Pty Ltd. It publishes rebate guides and calculators and passes quote requests to one installation partner.`]
  ];
};
const stateGuides = Object.keys(STATE_NAMES).map((code) => {
  const si = stateInfo[code], faq = stateFaq(code), place = code === "ACT" || code === "NT" ? si.city + " and the " + code : si.city + " and " + code;
  return {
    slug: `${si.slug}-solar-battery-rebates-faq`,
    short: `${code} rebates FAQ`,
    title: `${place} solar and battery rebates: questions answered`,
    seoTitle: `${code} Solar & Battery Rebates 2026: FAQ`,
    description: `Short, dated answers on the solar and battery rebates in ${STATE_NAMES[code]}, what they're worth in ${si.city} and the 1 January step-down.`,
    sources: ["batteries"],
    faq,
    html: ({ R, money, L }) => `
<p>Every answer below starts with the figure, worked out with the same rebate maths as the <a href="${L("rebate-quiz/")}">rebate quiz</a>. Certificates are valued at ${R.stcLabel}.</p>
${faq({ R, money }).map(([q, a]) => `<h2>${q}</h2><p>${a}</p>`).join("\n")}
<p>See the full figures on the <a href="${L("rebates/" + si.slug + "/")}">${STATE_NAMES[code].replace(/^the /, "")} rebates page</a>, or check a quote against <a href="${L("the-standard/")}">The Solar Standard checklist</a>.</p>`
  };
});

export const guides = [
  {
    slug: "solar-battery-price",
    short: "Battery prices",
    title: "Solar battery prices in 2026: what you'll pay after the rebate",
    seoTitle: "Solar Battery Prices 2026: Cost After the Rebate",
    description: "Typical installed prices for 5, 10 and 13.5 kWh home batteries after the federal rebate, what changes on 1 January and how to compare quotes.",
    sources: ["priceSolax", "priceSolarCalc", "priceSolarNerds", "batteries"],
    html: ({ R, money, L }) => {
      const now = R.currentWindow(), next = R.nextWindow(now) || now, step = R.longDate(R.addDays(now.to, 1));
      const bp = marketPrices.batteryPerKwh, rp = marketPrices.batteryRetrofitPerKwh;
      const rows = marketPrices.battery.map((b) => `<tr><td>${b.kwh} kWh</td><td>${money(R.batteryStcs(b.kwh, now.factor) * R.stcPrice)}</td><td>${money(b.low)} to ${money(b.high)}</td><td>${money((R.batteryStcs(b.kwh, now.factor) - R.batteryStcs(b.kwh, next.factor)) * R.stcPrice)}</td></tr>`).join("");
      return `
<p class="lead-sm"><b>Short answer:</b> most Australian homes pay about ${money(bp.low)} to ${money(bp.high)} per usable kWh for a battery installed with solar, after the federal rebate. A 10 kWh battery usually lands around ${money(marketPrices.battery[1].low)} to ${money(marketPrices.battery[1].high)}. Adding a battery to an existing solar system tends to cost more per kWh, about ${money(rp.low)} to ${money(rp.high)}.</p>
<h2>Typical battery prices after the federal rebate</h2>
<div class="table-wrap"><table><thead><tr><th>Usable size</th><th>Federal rebate if installed by ${R.longDate(now.to)}</th><th>Typical installed price after the rebate</th><th>Rebate lost from ${step}</th></tr></thead><tbody>${rows}</tbody></table></div>
<p class="small muted">Prices are market ranges as at ${marketPrices.asAt} from the sources below, including installation and GST. Rebates use ${R.stcLabel} per certificate. Your quote depends on the brand, your switchboard and whether you want blackout backup.</p>
<h2>What happens to prices on ${step}</h2>
<p>The federal rebate drops from ${now.factor} to ${next.factor} certificates per kWh, so the same battery costs more by the amount in the last column. The rate is set by the install date, so a battery signed now but installed after ${R.longDate(now.to)} gets the lower rebate. See <a href="${L("guides/battery-rebate-2027/")}">the battery rebate change, explained</a>.</p>
<h2>What moves the price</h2>
<ul>
<li><b>With solar or added later.</b> Installing the battery with new panels shares one inverter and one install day. Adding it to existing solar often needs a second inverter or a hybrid swap.</li>
<li><b>Size.</b> The cost per kWh falls as batteries get bigger, but the rebate is tiered: the first 14 kWh gets the full rate, 14 to 28 kWh gets 60% and 28 to 50 kWh gets 15%.</li>
<li><b>Backup.</b> Whole-home or essential-circuit backup during a blackout adds hardware and wiring. Not every battery offers it.</li>
<li><b>Switchboard and site.</b> An old switchboard, a long cable run or a battery that has to go inside can add hundreds to thousands of dollars.</li>
<li><b>Brand and warranty.</b> Compare warranty years and the guaranteed energy throughput, not just the badge.</li>
</ul>
<h2>How to compare two battery quotes</h2>
<p>Divide the price after the rebate by the <b>usable</b> kWh, check that the federal rebate is its own line, and make sure the quote names the battery model, the inverter and whether backup is included. Then check it against <a href="${L("guides/how-to-read-a-solar-quote/")}">how to read a solar quote</a>, or <a href="${L("rebate-quiz/")}">see the rebate for your postcode</a>.</p>`;
    }
  },
  {
    slug: "solar-panel-cost",
    short: "Solar panel cost",
    title: "How much do solar panels cost in 2026?",
    seoTitle: "Solar Panel Cost 2026: 6.6 kW and 10 kW Prices",
    description: "Typical installed prices for 6.6 kW and 10 kW solar systems after the STC rebate, the rebate in each capital city and what changes on 1 January.",
    sources: ["priceGridly", "priceSolarx"],
    html: ({ R, money, L }) => {
      const year = Math.min(Math.max(R.yearOf(R.ymd()), 2026), 2030), next = Math.min(year + 1, 2030);
      const sizes = marketPrices.solar.map((s) => `<tr><td>${s.kw} kW</td><td>${R.solarStcs(s.kw, 3, year)} STCs, ${money(R.solarStcs(s.kw, 3, year) * R.stcPrice)}</td><td>${money(s.low)} to ${money(s.high)}</td></tr>`).join("");
      const cities = [["Darwin", 2], ["Brisbane", 3], ["Sydney", 3], ["Perth", 3], ["Adelaide", 3], ["Canberra", 3], ["Melbourne", 4], ["Hobart", 4]];
      const cityRows = cities.map(([c, z]) => `<tr><td>${c}</td><td>${z}</td><td>${money(R.solarStcs(6.6, z, year) * R.stcPrice)}</td><td>${money(R.solarStcs(6.6, z, next) * R.stcPrice)}</td></tr>`).join("");
      return `
<p class="lead-sm"><b>Short answer:</b> a 6.6 kW solar system usually costs about ${money(marketPrices.solar[0].low)} to ${money(marketPrices.solar[0].high)} installed in ${year}, after the federal STC rebate. A 10 kW system usually costs about ${money(marketPrices.solar[1].low)} to ${money(marketPrices.solar[1].high)}. The rebate is already taken off those prices.</p>
<h2>Typical solar prices after the rebate</h2>
<div class="table-wrap"><table><thead><tr><th>System</th><th>STC rebate in zone 3, installed in ${year}</th><th>Typical installed price after the rebate</th></tr></thead><tbody>${sizes}</tbody></table></div>
<p class="small muted">Market ranges as at ${marketPrices.asAt} from the sources below, for standard-tier panels and a string inverter, including GST. Rebates use ${R.stcLabel} per certificate.</p>
<h2>The solar rebate in each capital city</h2>
<p>The STC rebate depends on how much sun your area gets (its STC zone) and how many years are left in the scheme. Here's the rebate on a 6.6 kW system.</p>
<div class="table-wrap"><table><thead><tr><th>City</th><th>STC zone</th><th>Rebate if installed in ${year}</th><th>Rebate if installed in ${next}</th></tr></thead><tbody>${cityRows}</tbody></table></div>
<p>The solar rebate drops each 1 January as the scheme counts down to 2030. Find your exact figure with the <a href="${L("tools/stc-calculator/")}">STC calculator</a>.</p>
<h2>What moves the price</h2>
<ul>
<li><b>Panels and inverter.</b> Premium panels, microinverters or optimisers can add 20 to 30% over a standard system.</li>
<li><b>Your roof.</b> Two-storey, steep, tiled or multi-direction roofs take longer to install.</li>
<li><b>Switchboard and meter.</b> An old switchboard may need upgrading, and your retailer arranges a solar-ready meter.</li>
<li><b>Network rules.</b> Your electricity network may limit how much you can export, which changes the best system size.</li>
</ul>
<h2>Is a bigger system worth it?</h2>
<p>Extra panels are cheap per kW, but exported power earns a low feed-in tariff. Size the system to your daytime use plus any battery you plan to charge. Try the <a href="${L("tools/solar-savings-calculator/")}">savings calculator</a> or <a href="${L("rebate-quiz/")}">see the rebate for your postcode</a>.</p>`;
    }
  },
  {
    slug: "solar-installation-process",
    short: "Installation, step by step",
    title: "Solar and battery installation: what happens from quote to switch-on",
    seoTitle: "Solar & Battery Installation: Step by Step",
    description: "The steps from first quote to switch-on for solar panels and home batteries: site check, network approval, install day, inspection and the meter.",
    sources: ["batteries"],
    html: ({ R, money, L }) => `
<p class="lead-sm"><b>Short answer:</b> most home solar and battery jobs take two to six weeks from signing to switch-on. The install itself is usually one day for solar and about half a day to a day for a battery. Most of the wait is network approval and the meter change.</p>
<h2>1. Quote and site check</h2>
<p>The installer checks your bills, roof, shading and switchboard, often by satellite first and in person before the install. You should get a written, itemised quote naming the panels, inverter and battery, with the federal rebate as its own line. See <a href="${L("guides/how-to-read-a-solar-quote/")}">how to read a solar quote</a>.</p>
<h2>2. Signing and cooling-off</h2>
<p>If the sale was unsolicited, such as a door-knock or a cold call, Australian Consumer Law gives you 10 business days to cancel. Either way, read the payment terms and warranty before you sign, and don't pay a large deposit up front.</p>
<h2>3. Design and network approval</h2>
<p>The installer applies to your electricity network (for example Energex or Ergon in Queensland, Ausgrid in Sydney, SA Power Networks in South Australia) for approval to connect. The network can limit how much power you export, which may change the design.</p>
<h2>4. Install day</h2>
<p>A Solar Accreditation Australia (SAA) accredited installer has to design and install the system for it to earn the federal rebate, using panels, inverters and batteries on the Clean Energy Council approved lists. Batteries are installed to AS/NZS 5139, which sets where they can go and the clearances around them.</p>
<h2>5. Inspection and paperwork</h2>
<p>The electrician issues a certificate of electrical safety or compliance (the name varies by state), and some states inspect a sample of jobs. The installer creates the STCs for the rebate. You sign to assign them, and they come off your price.</p>
<h2>6. Meter and switch-on</h2>
<p>Your retailer arranges a meter that records exported power, which can take a few weeks. Once it's in, the system can export and you start earning a feed-in tariff. If you're joining a virtual power plant, that's set up after switch-on.</p>
<div class="callout">The rebate is set by the <b>install date</b>, not the signing date. If you're aiming to install before the rebate steps down on ${R.longDate(R.addDays(R.currentWindow().to, 1))}, ask for the install date in writing.</div>
<p><a href="${L("rebate-quiz/")}">See the rebate for your postcode</a> before you get quotes.</p>`
  },
  {
    slug: "how-to-choose-a-home-battery",
    short: "Choosing a battery",
    title: "How to choose a home battery: size, warranty and backup",
    seoTitle: "How to Choose a Home Battery (2026 Guide)",
    description: "How to size a home battery to your evening use, compare warranties, decide on blackout backup and keep the federal rebate.",
    sources: ["batteries"],
    html: ({ R, money, L }) => `
<p class="lead-sm"><b>Short answer:</b> size the battery to the power you use after dark, not to the biggest rebate. Compare usable capacity, the warranty's years and energy throughput, and whether it can keep your lights on in a blackout. To get the federal rebate it must be an approved product, installed by an accredited installer.</p>
<h2>1. Size it to your evenings</h2>
<p>Look at your bill or usage app for the kWh you use from late afternoon to morning. A battery around that size covers your evenings; much bigger only helps if you'll export to a virtual power plant or plan for an EV. The federal rebate pays the full rate on the first 14 kWh, 60% from 14 to 28 kWh and 15% from 28 to 50 kWh, so going past 14 kWh earns less rebate per kWh.</p>
<h2>2. Compare usable capacity</h2>
<p>Batteries list total and usable capacity. Compare usable kWh, because that's what you can actually draw and what the rebate is based on.</p>
<h2>3. Read the warranty properly</h2>
<p>Check the warranty years, the minimum capacity it guarantees at the end (often 60 to 70%), and the energy throughput limit. A battery that cycles daily can reach its throughput cap before its years are up.</p>
<h2>4. Decide on blackout backup</h2>
<p>Not every battery keeps the power on in an outage. Some back up the whole home, others only chosen circuits, and some need extra hardware. If backup matters, ask for it in writing on the quote.</p>
<h2>5. Check it works with your solar</h2>
<p>With new solar, a hybrid inverter runs both panels and battery. With existing solar, an AC-coupled battery with its own inverter is often simpler than replacing a working inverter.</p>
<h2>6. Keep the rebate</h2>
<p>The battery must be on the Clean Energy Council approved list and installed by a Solar Accreditation Australia accredited installer to AS/NZS 5139. State extras such as WA's battery scheme, NSW's VPP incentive and South Australia's REPS incentive may need the battery to join a virtual power plant. See <a href="${L("rebates/")}">rebates by state</a>.</p>
<p>Compare prices with <a href="${L("guides/solar-battery-price/")}">solar battery prices in 2026</a>, or <a href="${L("rebate-quiz/")}">see your rebate</a>.</p>`
  },
  {
    slug: "adelaide-solar-battery-rebates-faq",
    short: "Adelaide rebates FAQ",
    title: "Adelaide and SA solar and battery rebates: questions answered",
    seoTitle: "SA Solar & Battery Rebates 2026: FAQ",
    description: "Short, dated answers on the federal solar and battery rebates in Adelaide, the 1 January step-down and the REPS VPP incentive.",
    sources: ["batteries", "saReps"],
    faq: saFaq,
    html: ({ R, money, L }) => `
<p>Every answer below starts with the figure, worked out with the same rebate maths as the <a href="${L("rebate-quiz/")}">rebate quiz</a>. Certificates are valued at ${R.stcLabel}.</p>
${saFaq({ R, money }).map(([q, a]) => `<h2>${q}</h2><p>${a}</p>`).join("\n")}
<p>See the full figures on the <a href="${L("rebates/sa/")}">South Australia rebates page</a>, or check a quote against <a href="${L("the-standard/")}">The Solar Standard checklist</a>.</p>`
  },
  {
    slug: "queensland-solar-battery-rebates-faq",
    short: "QLD rebates FAQ",
    title: "Queensland solar and battery rebates: questions answered",
    seoTitle: "QLD Solar & Battery Rebates 2026: FAQ",
    description: "Short, dated answers on the federal solar and battery rebates in Queensland, the 1 January step-down and the landlord rebate.",
    sources: ["batteries", "qldBooster", "qldRenters", "qldRentersRules"],
    faq: qldFaq,
    html: ({ R, money, L }) => `
<p>Every answer below starts with the figure, worked out with the same rebate maths as the <a href="${L("rebate-quiz/")}">rebate quiz</a>. Certificates are valued at ${R.stcLabel}.</p>
${qldFaq({ R, money }).map(([q, a]) => `<h2>${q}</h2><p>${a}</p>`).join("\n")}
<p>See the full figures on the <a href="${L("rebates/qld/")}">Queensland rebates page</a>, or check a quote against <a href="${L("the-standard/")}">The Solar Standard checklist</a>.</p>`
  },
  {
    slug: "how-solar-rebates-work",
    short: "How solar rebates work",
    title: "How solar and battery rebates work in Australia",
    description: "STCs, zones, deeming years and the battery program, explained in plain English.",
    sources: ["batteries", "qldRenters"],
    html: ({ R, money, L }) => {
      const s = R.solarStcs(6.6, 3, 2026);
      return `
<p>Most of the money off a solar or battery system comes from one federal scheme, the Small-scale Renewable Energy Scheme. It doesn't pay you cash. Your system creates certificates, called STCs, and your installer buys them from you by taking their value off the price.</p>
<h2>How many certificates a solar system creates</h2>
<p>Three things set the number: the size of the system, how sunny your area is, and how many years are left in the scheme.</p>
<ul><li><b>Size.</b> More kilowatts, more certificates.</li><li><b>Zone.</b> Australia is split into four STC zones. Zone 1 (Alice Springs, the Pilbara) earns the most per kW. Zone 4 (Victoria, Tasmania) earns the least.</li><li><b>Deeming years.</b> A system installed in 2026 is credited with ${R.deeming[2026]} years of output. That drops by one year every 1 January until the scheme ends in 2030.</li></ul>
<p>A 6.6 kW system in zone 3, installed in 2026, works out at 6.6 × ${R.zoneRating[3]} × ${R.deeming[2026]} = <b class="mono">${s} certificates</b>, worth about <b class="mono">${money(s * R.stcPrice)}</b> at ${R.stcLabel} each.</p>
<h2>The battery rebate</h2>
<p>The Cheaper Home Batteries Program uses the same certificates. Until 31 December 2026 a battery earns ${R.batteryWindows[0].factor} certificates per kWh of usable capacity on the first 14 kWh, 60% of that from 14 to 28 kWh, and 15% from 28 to 50 kWh. It needs to be at least 5 kWh. The rate steps down every six months until 2030. Our <a href="${L("guides/battery-rebate-2027/")}">guide to the January change</a> has the numbers.</p>
<h2>State rebates on top</h2>
<p>Victoria's Solar Homes program pays up to $1,400 towards panels for eligible households. WA pays up to $1,300 on a battery for Synergy customers and up to $3,800 for Horizon Power customers, if the battery joins a virtual power plant. Queensland pays eligible landlords up to $3,500 towards solar on a rental through Supercharged Solar for Renters; the landlord applies to the Queensland Government before the install, and owner-occupiers aren't eligible. Other states currently rely on the federal programs, with some VPP incentives. See <a href="${L("rebates/")}">rebates by state</a>.</p>
<h2>What to look for on the quote</h2>
<p>The quote should show the system price, the STC discount and any state rebate as separate lines, plus the number of certificates. If it only shows one total, ask for the breakdown.</p>`;
    }
  },
  {
    slug: "battery-rebate-2027",
    short: "Battery rebate 2027",
    title: "What changes to the battery rebate on 1 January 2027",
    description: "The rate drops from 6.8 to 5.7 certificates per kWh. Here's what that's worth and what to ignore.",
    sources: ["batteries"],
    html: ({ R, money }) => {
      const a = R.batteryWindows[0].factor, b = R.batteryWindows[1].factor;
      const rows = [10, 13.5, 20].map((k) => [k, R.batteryStcs(k, a) * R.stcPrice, R.batteryStcs(k, b) * R.stcPrice]);
      return `
<p>The Cheaper Home Batteries rebate gets smaller on 1 January 2027. It doesn't end. The certificate rate falls from <b>${a}</b> to <b>${b}</b> per kWh, and then keeps falling every six months until the program finishes at the end of 2030.</p>
<h2>What it's worth</h2>
<div class="table-wrap"><table><thead><tr><th>Battery</th><th class="num">Installed in 2026</th><th class="num">Installed Jan to Jun 2027</th><th class="num">Difference</th></tr></thead><tbody>
${rows.map(([k, x, y]) => `<tr><td>${k} kWh</td><td class="num mono">${money(x)}</td><td class="num mono">${money(y)}</td><td class="num mono">${money(x - y)}</td></tr>`).join("")}
</tbody></table></div>
<p class="small muted">At ${R.stcLabel} per certificate, using the size tiers that apply from 1 May 2026.</p>
<h2>The install date is what counts</h2>
<p>The rate is set by when the battery is installed and commissioned, not when you sign. Installers are busy before every step-down, so if you sign in December, ask for an install date in writing.</p>
<h2>Real deadlines and made-up ones</h2>
<p>The program steps down on 1 January and 1 July. A salesperson who says "the rebate drops on 1 January" is telling you something true. One who says the rebate <i>ends</i>, or names any other date, isn't. The Clean Energy Regulator has warned retailers that misleading claims get reported to fair trading regulators.</p>
<h2>Should you rush?</h2>
<p>For a typical battery the January drop is a few hundred dollars, a small share of the job. It's worth acting on if you were going to buy anyway. It isn't worth signing a quote you haven't checked.</p>`;
    }
  },
  {
    slug: "how-to-read-a-solar-quote",
    short: "Reading a solar quote",
    title: "How to read a solar quote",
    description: "The seven things a good quote shows, and what to ask when one is missing.",
    html: () => `
<p>Two quotes for the "same" system can be thousands of dollars apart for good reasons, or bad ones. These are the things a quote should spell out.</p>
<ol>
<li><b>Itemised price.</b> System price, STC discount, any state rebate and the amount you pay, each on its own line.</li>
<li><b>Panel brand, model and quantity.</b> A model number you can look up, not just "tier 1 panels".</li>
<li><b>Inverter brand and model.</b> Including its size and whether it can run a battery now or later.</li>
<li><b>Battery details.</b> Usable capacity in kWh, whether it gives backup power in a blackout, and whether it's on the approved list for the rebate.</li>
<li><b>Warranties and who holds them.</b> Product warranties come from the manufacturer. The workmanship warranty comes from the installer and is only as good as the business behind it.</li>
<li><b>Export limit.</b> Your network may cap how much you can send to the grid, which affects what a bigger system is worth.</li>
<li><b>Paperwork and timing.</b> Who lodges the grid connection, who arranges the electrical certificate and meter change, and the install date.</li>
</ol>
<h2>Questions worth asking</h2>
<ul><li>Who will physically do the install: your own staff or a subcontractor?</li><li>How long has the business traded under its current ABN?</li><li>What happens if a panel or the inverter fails in year six?</li><li>Is the price fixed if the install date moves into next year?</li></ul>
<h2>Your rights</h2>
<p>If a salesperson sells to you at your home, the Australian Consumer Law gives you a 10 business day cooling-off period for most unsolicited agreements. Take the time to read the quote.</p>`
  },
  {
    slug: "is-a-battery-worth-it",
    short: "Is a battery worth it?",
    title: "Is a home battery worth it?",
    description: "When a battery pays for itself, and when you're better off waiting.",
    sources: ["batteries"],
    html: ({ R, money, L }) => {
      const r = R.batteryStcs(13.5, R.batteryWindows[0].factor) * R.stcPrice;
      return `
<p>A battery stores the solar you'd otherwise export for a few cents, and lets you use it in the evening instead of buying power at full price. Whether that pays off depends on your household more than on the battery.</p>
<h2>A battery tends to pay off when</h2>
<ul><li>You use a lot of power after the sun goes down: cooking, air conditioning, pool pumps, an electric car.</li><li>Your feed-in tariff is low, so exporting earns little.</li><li>You're on a time-of-use plan with expensive evening rates.</li><li>You can join a virtual power plant that pays you, or you're in WA where joining one unlocks the state rebate.</li></ul>
<h2>You might wait when</h2>
<ul><li>Your evening use is small, or someone is home using solar during the day.</li><li>Your solar system is small and has little left over to store.</li><li>Your switchboard needs an upgrade that adds a lot to the price. Ask the installer.</li></ul>
<h2>Sizing it</h2>
<p>Size the battery to your evening and overnight use, not to the biggest rebate. Because of the tiers, kWh above 14 earn 60% of the rate and above 28 only 15%. A 13.5 kWh battery currently attracts about <b class="mono">${money(r)}</b> in federal rebate.</p>
<p>Try the <a href="${L("tools/solar-savings-calculator/")}">savings calculator</a> with and without a battery to see the difference for your bill.</p>`;
    }
  },
  ...stateGuides
];
