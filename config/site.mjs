// Everything brand-specific lives here. Change the name, domain and contact
// details once and rebuild; every page picks them up.
export const brand = {
  name: "The Solar Standard",
  short: "Solar Standard",
  domain: "https://thesolarstandard.com.au", // canonical links and sitemap
  email: "hello@thesolarstandard.com.au",
  phone: "0458 307 697",
  partner: "XF Energy",                // the installation partner that quotes every enquiry
  abn: "84 683 749 153",               // TMC Innovations
  legalName: "TMC Innovations Pty Ltd",
  tagline: "See your solar and battery rebate, then get a free, itemised written quote from an accredited installation partner.",
  metaPixelId: "",                    // e.g. "1234567890"; leave empty to turn the pixel off
  googleTagId: "",                    // Google Analytics 4, e.g. "G-XXXXXXX"
  googleAdsId: "",                    // Google Ads account tag, e.g. "AW-1234567890"
  googleAdsConversion: "",            // Google Ads lead conversion, e.g. "AW-1234567890/AbCdEfGhIj"
  googleSiteVerification: "",         // Search Console "HTML tag" code, the content="..." value only
  // What a lead of each grade is worth to us, in dollars, sent to Google with every conversion
  // so Ads bids towards the leads that sell. Roughly A$6,000 commission × the expected close rate.
  // Renters (R) are never counted. Revisit once the pilot has real close rates.
  leadValues: { A: 450, B: 250, C: 60, R: 0 },
  // Named reviewer shown on guides and rebate pages, and in structured data. AI search and
  // Google both weigh who checked a page and when.
  reviewer: { name: "Tomas Cooper", role: "Director, TMC Innovations" },
  published: "2026-10-29"              // first publish date of the guides
};

// Typical installed prices AFTER the federal rebate, as ranges the market sources broadly agree on.
// Shown on the cost guides with their sources. Re-check every quarter and when the rebate steps down.
export const marketPrices = {
  asAt: "November 2026",
  solar: [
    { kw: 6.6, low: 5000, high: 8000 },
    { kw: 10, low: 8000, high: 12000 }
  ],
  batteryPerKwh: { low: 800, high: 1000 },            // installed with solar, after the federal rebate
  batteryRetrofitPerKwh: { low: 950, high: 1350 },    // added to an existing solar system
  battery: [
    { kwh: 5, low: 4000, high: 7000 },
    { kwh: 10, low: 8000, high: 10000 },
    { kwh: 13.5, low: 10000, high: 13000 }
  ]
};

// Official pages the rebate figures are checked against. Shown as "Sources" on guides and
// rebate pages, and listed in llms.txt, so answers can be traced back.
export const officialSources = {
  batteries: { title: "Clean Energy Regulator: Cheaper Home Batteries changes from 1 May 2026", url: "https://cer.gov.au/node/5406" },
  qldRenters: { title: "Queensland Government: Supercharged Solar for Renters", url: "https://www.qld.gov.au/solar-for-renters" },
  qldRentersRules: { title: "Queensland Treasury: Supercharged Solar for Renters eligibility", url: "https://www.treasury.qld.gov.au/policies-and-programs/energy/supercharged-solar-for-renters/" },
  saReps: { title: "SA Government: Retailer Energy Productivity Scheme (REPS)", url: "https://www.energymining.sa.gov.au/consumers/energy-advisory-service/energy-saving-rebates" },
  // Market price sources for the cost guides (not official; checked 13 November 2026)
  priceGridly: { title: "Gridly: Solar panel cost Australia 2026", url: "https://www.gridly.com.au/blog/solar-panel-cost-australia-2026" },
  priceSolarx: { title: "SolarX Energy: Solar installation cost in Australia, 2026 homeowner guide", url: "https://solarxenergy.com.au/solar-installation-cost-in-australia-2026-homeowner-guide/" },
  priceSolax: { title: "SolaX: Solar battery cost in Australia 2026 (June 2026)", url: "https://au.solaxpower.com/blogs/solar-battery-cost-australia-2026-complete-price-guide.html" },
  priceSolarCalc: { title: "SolarCalculator: Solar battery price, savings and payback (May 2026)", url: "https://solarcalculator.com.au/battery-storage/price/" },
  priceSolarNerds: { title: "Solar Nerds: How much does a mid-tier battery cost? (mid-2026)", url: "https://solarnerds.com.au/your-solar-journey/how-much-do-solar-and-batteries-cost/how-much-does-a-mid-tier-battery-cost" },
  qldBooster: { title: "Queensland Government: Battery Booster (closed)", url: "https://qld.gov.au/housing/home-modifications-energy-savings/battery-booster-program" }
};

// State pages. Only figures that were checked against official or
// industry sources go here; anything uncertain is described, not quantified.
export const stateInfo = {
  NSW: {
    slug: "nsw", zone: 3, short: "NSW also pays an incentive when a battery joins a virtual power plant, set by the VPP provider.", city: "Sydney", note: "Most of NSW is STC zone 3. Far western NSW can sit in a higher zone.",
    extras: [
      { title: "VPP incentive for batteries", body: "NSW pays an incentive under its Peak Demand Reduction Scheme when a battery is connected to a virtual power plant. The amount depends on the battery and the VPP provider, so your installer confirms it on the quote." }
    ]
  },
  VIC: {
    slug: "vic", zone: 4, short: "Victoria adds up to $1,400 towards solar panels through Solar Homes for eligible owner-occupiers with household income under $150,000.", city: "Melbourne", note: "Victoria is STC zone 4, so solar earns slightly fewer certificates per kW than in the northern states.",
    extras: [
      { title: "Solar Homes panel rebate: up to $1,400", body: "Solar Victoria pays up to $1,400 towards solar panels, with an optional interest-free loan of the same amount repaid over four years. From 1 July 2026 the combined household income cap is $150,000. The address must not have had an earlier Solar Homes panel or battery rebate." }
    ]
  },
  QLD: {
    slug: "qld", zone: 3, short: "", city: "Brisbane", note: "South-east Queensland is STC zone 3. Parts of central and northern Queensland can sit in zone 2.",
    extras: [
      { title: "Federal rebates for owner-occupiers", body: "If you own and live in your home, the federal STC rebate and the Cheaper Home Batteries rebate are the ones that apply. Queensland has no state rebate for owner-occupiers at present. Both federal rebates come off the installer's price, so there's nothing to apply for." },
      { title: "Landlords: Supercharged Solar for Renters, up to $3,500", body: "The Queensland Government pays eligible landlords $2,500 to $3,500 towards rooftop solar on a rental property, depending on system size (3 kW and up). The property must have a current tenancy and no existing solar, the tenant must consent, and the landlord applies directly to the Queensland Government and needs conditional approval before the install. The rebate is paid to the landlord after final approval, not taken off the quote. It covers solar panels, not batteries. Check the current rules at qld.gov.au/solar-for-renters." }
    ]
  },
  WA: {
    slug: "wa", zone: 3, short: "WA adds $130 per kWh up to $1,300 for Synergy customers, or $380 per kWh up to $3,800 for Horizon Power customers, when the battery joins a virtual power plant.", city: "Perth", note: "Perth and the south-west are STC zone 3. The Pilbara and Kimberley are zone 1.",
    extras: [
      { title: "WA Residential Battery Scheme", body: "Synergy customers get $130 per kWh up to $1,300. Horizon Power customers in regional WA get $380 per kWh up to $3,800. The battery must be 5 kWh or more and join a virtual power plant. No-interest loans are also available, subject to a credit check." }
    ]
  },
  SA: {
    slug: "sa", zone: 3, short: "", city: "Adelaide", note: "Adelaide and most of settled South Australia are STC zone 3.",
    extras: [
      { title: "Federal rebates come off the price", body: "South Australian homes get the federal STC rebate on solar and the Cheaper Home Batteries rebate on a battery, both taken off the installer's price. The state's Home Battery Scheme has closed." },
      { title: "REPS virtual power plant incentive", body: "Under the state's Retailer Energy Productivity Scheme (REPS), some households can get an extra incentive for connecting a battery to an approved virtual power plant. It's offered through energy retailers and VPP operators, the amount depends on the provider and the battery, eligibility rules apply, and it's paid after the VPP connection is approved, not taken off the quote. Your installer can tell you which VPPs your battery can join." }
    ]
  },
  TAS: {
    slug: "tas", zone: 4, short: "Tasmania has no state solar or battery rebate at present.", city: "Hobart", note: "Tasmania is STC zone 4.",
    extras: [
      { title: "Federal rebates apply", body: "Tasmania has no state-wide solar or battery rebate at present. Homeowners use the federal STC and battery rebates." }
    ]
  },
  ACT: {
    slug: "act", zone: 3, short: "The ACT also runs energy support programs for eligible concession holders.", city: "Canberra", note: "Canberra is STC zone 3.",
    extras: [
      { title: "ACT support programs", body: "The ACT runs energy support programs for eligible concession holders. Eligibility and amounts change, so your installer checks what applies before quoting." }
    ]
  },
  NT: {
    slug: "nt", zone: 2, short: "The Northern Territory has no state solar or battery rebate at present.", city: "Darwin", note: "Darwin is STC zone 2. Alice Springs is zone 1, which earns the most certificates per kW in Australia.",
    extras: [
      { title: "Federal rebates apply", body: "The federal STC and battery rebates apply across the Territory." }
    ]
  }
};

// Average daily output per kW of panels (kWh), used by the savings calculator.
export const yieldPerKw = { NSW: 3.9, VIC: 3.6, QLD: 4.2, WA: 4.4, SA: 4.2, TAS: 3.5, ACT: 4.3, NT: 4.4 };
