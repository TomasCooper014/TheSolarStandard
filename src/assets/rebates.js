/*
 * Rebate maths shared by the browser (quiz + calculators) and the build.
 * Every number here is an assumption you can change in one place.
 * Figures checked 29 October 2026. Re-check each January and July.
 */
(function (root) {
  var R = {};

  R.asAt = "12 November 2026";
  R.stcPrice = 37; // $ per certificate, moves with the market. Shown as "assumed" on every estimate.

  // Solar STCs: rating (MWh per kW per year) by zone
  R.zoneRating = { 1: 1.622, 2: 1.536, 3: 1.382, 4: 1.185 };
  // Deeming years by install year (scheme ends 2030)
  R.deeming = { 2026: 5, 2027: 4, 2028: 3, 2029: 2, 2030: 1 };

  // Cheaper Home Batteries: STCs per usable kWh, by install window.
  // Legislated schedule from 1 May 2026 (Clean Energy Regulator). Dates are inclusive, AEST.
  R.batteryWindows = [
    { id: "2026", label: "Installed by 31 Dec 2026", from: "2026-05-01", to: "2026-12-31", factor: 6.8 },
    { id: "2027h1", label: "Installed Jan to Jun 2027", from: "2027-01-01", to: "2027-06-30", factor: 5.7 },
    { id: "2027h2", label: "Installed Jul to Dec 2027", from: "2027-07-01", to: "2027-12-31", factor: 5.2 },
    { id: "2028h1", label: "Installed Jan to Jun 2028", from: "2028-01-01", to: "2028-06-30", factor: 4.6 },
    { id: "2028h2", label: "Installed Jul to Dec 2028", from: "2028-07-01", to: "2028-12-31", factor: 4.1 },
    { id: "2029h1", label: "Installed Jan to Jun 2029", from: "2029-01-01", to: "2029-06-30", factor: 3.6 },
    { id: "2029h2", label: "Installed Jul to Dec 2029", from: "2029-07-01", to: "2029-12-31", factor: 3.1 },
    { id: "2030h1", label: "Installed Jan to Jun 2030", from: "2030-01-01", to: "2030-06-30", factor: 2.6 },
    { id: "2030h2", label: "Installed Jul to Dec 2030", from: "2030-07-01", to: "2030-12-31", factor: 2.1 }
  ];
  R.batteryNextStep = "1 January 2027";

  // Date helpers. Dates are "YYYY-MM-DD" strings so the browser and the build agree.
  R.ymd = function (d) {
    d = d || new Date();
    // Queensland time (UTC+10, no daylight saving) is close enough for every state here
    var t = new Date(d.getTime() + 10 * 3600000);
    return t.toISOString().slice(0, 10);
  };
  R.addDays = function (ymd, days) {
    var t = new Date(ymd + "T00:00:00Z");
    t.setUTCDate(t.getUTCDate() + days);
    return t.toISOString().slice(0, 10);
  };
  R.windowFor = function (ymd) {
    for (var i = 0; i < R.batteryWindows.length; i++) {
      var w = R.batteryWindows[i];
      if (ymd >= w.from && ymd <= w.to) return w;
    }
    return ymd < R.batteryWindows[0].from ? R.batteryWindows[0] : null;
  };
  R.currentWindow = function () { return R.windowFor(R.ymd()) || R.batteryWindows[R.batteryWindows.length - 1]; };
  R.nextWindow = function (w) { var i = R.batteryWindows.indexOf(w); return i > -1 ? R.batteryWindows[i + 1] || null : null; };
  R.yearOf = function (ymd) { return parseInt(ymd.slice(0, 4), 10); };
  R.monthLabel = function (ymd) {
    var m = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return m[parseInt(ymd.slice(5, 7), 10) - 1] + " " + ymd.slice(0, 4);
  };
  R.longDate = function (ymd) { return parseInt(ymd.slice(8, 10), 10) + " " + R.monthLabel(ymd); };

  // Likely install date from the quiz's timeframe answer. Installers usually need
  // two to three weeks from signing, so "as soon as possible" is about three weeks out.
  R.timeframeDays = { "asap": 21, "1-3m": 60, "3-6m": 135, "researching": 180 };
  R.installDateFor = function (timeframe, today) {
    var days = R.timeframeDays[timeframe];
    if (days == null) days = R.timeframeDays["1-3m"];
    return R.addDays(today || R.ymd(), days);
  };

  // Queensland's Supercharged Solar for Renters: paid to eligible landlords, solar only,
  // on a rental with a current tenancy and no existing solar. Conditional approval is needed before install.
  R.qldRentersRebate = function (kw) {
    if (kw >= 5) return 3500;
    if (kw >= 4) return 3000;
    if (kw >= 3) return 2500;
    return 0;
  };

  R.states = {
    NSW: "New South Wales", VIC: "Victoria", QLD: "Queensland", WA: "Western Australia",
    SA: "South Australia", TAS: "Tasmania", ACT: "Australian Capital Territory", NT: "Northern Territory"
  };

  R.stateFromPostcode = function (pc) {
    var n = parseInt(String(pc || "").trim(), 10);
    if (!/^\d{4}$/.test(String(pc || "").trim()) || isNaN(n)) return null;
    if ((n >= 200 && n <= 299) || (n >= 2600 && n <= 2618) || (n >= 2900 && n <= 2920)) return "ACT";
    if (n >= 800 && n <= 999) return "NT";
    if (n >= 1000 && n <= 2999) return "NSW";
    if ((n >= 3000 && n <= 3999) || (n >= 8000 && n <= 8999)) return "VIC";
    if ((n >= 4000 && n <= 4999) || (n >= 9000 && n <= 9999)) return "QLD";
    if (n >= 5000 && n <= 5999) return "SA";
    if (n >= 6000 && n <= 6999) return "WA";
    if (n >= 7000 && n <= 7999) return "TAS";
    return null;
  };

  // Estimated STC zone. The Clean Energy Regulator sets the exact zone per postcode;
  // this is a close approximation and the installer's quote is final.
  R.zoneFromPostcode = function (pc) {
    var st = R.stateFromPostcode(pc);
    var n = parseInt(pc, 10);
    if (!st) return null;
    if (st === "VIC" || st === "TAS") return 4;
    if (st === "NT") return n >= 870 && n <= 879 ? 1 : 2;
    if (st === "WA") return n >= 6700 && n <= 6799 ? 1 : 3;
    return 3;
  };

  R.solarStcs = function (kw, zone, year) {
    var d = R.deeming[year] || 0;
    var r = R.zoneRating[zone] || 0;
    if (!(kw > 0)) return 0;
    return Math.floor(kw * r * d);
  };

  R.batteryStcs = function (kwh, factor) {
    var k = Math.min(Math.max(kwh || 0, 0), 50);
    if (k < 5) return 0;
    var weighted = Math.min(k, 14) + 0.6 * Math.max(0, Math.min(k, 28) - 14) + 0.15 * Math.max(0, k - 28);
    return Math.floor(weighted * factor);
  };

  R.waBattery = function (kwh, retailer) {
    if (!(kwh >= 5)) return 0;
    if (retailer === "horizon") return Math.min(380 * kwh, 3800);
    if (retailer === "synergy") return Math.min(130 * kwh, 1300);
    return 0;
  };

  // Typical sizes by quarterly bill band, used only to illustrate the rebate
  R.sizeForBill = {
    "lt300": { kw: 6.6, kwh: 10 },
    "300-500": { kw: 10, kwh: 13.5 },
    "500-750": { kw: 13.3, kwh: 16 },
    "gt750": { kw: 13.3, kwh: 20 }
  };

  // Full estimate shown at the end of the quiz
  R.estimate = function (o) {
    // o: { postcode, product: solar|battery|both, bill, waRetailer, ownership, existing, timeframe, today }
    var state = R.stateFromPostcode(o.postcode);
    var zone = R.zoneFromPostcode(o.postcode);
    var size = R.sizeForBill[o.bill] || R.sizeForBill["300-500"];
    var installDate = R.installDateFor(o.timeframe, o.today);
    var installYear = Math.min(Math.max(R.yearOf(installDate), 2026), 2030);
    var win = R.windowFor(installDate) || R.batteryWindows[R.batteryWindows.length - 1];
    var lines = [];
    var wantSolar = o.product === "solar" || o.product === "both";
    var wantBattery = o.product === "battery" || o.product === "both";
    if (wantSolar && zone) {
      var s = R.solarStcs(size.kw, zone, installYear);
      lines.push({ key: "stc", label: "Federal solar rebate (STCs)", detail: size.kw + " kW, zone " + zone + ", " + R.deeming[installYear] + " deeming years: " + s + " certificates at an assumed $" + R.stcPrice, amount: s * R.stcPrice });
    }
    if (wantBattery) {
      var b = R.batteryStcs(size.kwh, win.factor);
      lines.push({ key: "chb", label: "Federal battery rebate", detail: size.kwh + " kWh battery, " + win.factor + " certificates per kWh (" + win.label + "): " + b + " certificates at an assumed $" + R.stcPrice, amount: b * R.stcPrice });
    }
    if (state === "QLD" && wantSolar && o.ownership === "landlord" && o.existing !== "has-solar") {
      lines.push({ key: "qldrent", label: "Supercharged Solar for Renters (QLD)", detail: "Paid by the Queensland Government to eligible landlords with a current tenancy and the tenant's consent. You apply yourself and need conditional approval before the install.", amount: R.qldRentersRebate(size.kw), conditional: true });
    }
    if (state === "VIC" && wantSolar) {
      lines.push({ key: "vic", label: "Solar Homes rebate (VIC)", detail: "Up to $1,400 if eligible: owner occupier, household income under $150,000, no earlier Solar Homes rebate", amount: 1400, conditional: true });
    }
    if (state === "WA" && wantBattery && (o.waRetailer === "synergy" || o.waRetailer === "horizon")) {
      lines.push({ key: "wa", label: "WA Residential Battery Scheme", detail: (o.waRetailer === "horizon" ? "Horizon Power customer" : "Synergy customer") + ", battery joined to a VPP", amount: R.waBattery(size.kwh, o.waRetailer), conditional: true });
    }
    var total = lines.reduce(function (t, l) { return t + l.amount; }, 0);
    // If the likely install falls after a step-down, say what installing before it would add
    var earlier = null;
    var today = o.today || R.ymd();
    var nowWin = R.windowFor(today);
    if (nowWin && nowWin !== win && (wantSolar || wantBattery)) {
      var nowYear = R.yearOf(today);
      var gain = 0;
      if (wantBattery) gain += (R.batteryStcs(size.kwh, nowWin.factor) - R.batteryStcs(size.kwh, win.factor)) * R.stcPrice;
      if (wantSolar && zone) gain += (R.solarStcs(size.kw, zone, nowYear) - R.solarStcs(size.kw, zone, installYear)) * R.stcPrice;
      if (gain > 0) earlier = { by: nowWin.to, gain: gain };
    }
    return { state: state, zone: zone, size: size, lines: lines, total: total, installDate: installDate, installYear: installYear, window: win, earlier: earlier };
  };

  R.money = function (n) {
    return "$" + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  root.Rebates = R;
})(typeof globalThis !== "undefined" ? globalThis : this);
