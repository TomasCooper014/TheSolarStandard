import test from "node:test";
import assert from "node:assert/strict";
import "../src/assets/rebates.js";

const R = globalThis.Rebates;
const today = "2026-11-12";
const base = { postcode: "4152", product: "both", bill: "300-500", ownership: "owner-occupier", existing: "none", today };

test("battery window follows the install date", () => {
  assert.equal(R.windowFor("2026-12-31").factor, 6.8);
  assert.equal(R.windowFor("2027-01-01").factor, 5.7);
  assert.equal(R.windowFor("2027-07-01").factor, 5.2);
  assert.equal(R.windowFor("2030-12-31").factor, 2.1);
});

test("an install this year uses 2026 rates", () => {
  const e = R.estimate({ ...base, timeframe: "asap" });
  assert.equal(e.installYear, 2026);
  assert.equal(e.lines.find((l) => l.key === "stc").amount, Math.floor(10 * 1.382 * 5) * R.stcPrice);
  assert.equal(e.lines.find((l) => l.key === "chb").amount, Math.floor(13.5 * 6.8) * R.stcPrice);
  assert.equal(e.earlier, null);
});

test("an install next year uses 2027 rates and shows what installing earlier is worth", () => {
  const e = R.estimate({ ...base, timeframe: "3-6m" });
  assert.equal(e.installYear, 2027);
  assert.equal(e.lines.find((l) => l.key === "stc").amount, Math.floor(10 * 1.382 * 4) * R.stcPrice);
  assert.equal(e.lines.find((l) => l.key === "chb").amount, Math.floor(13.5 * 5.7) * R.stcPrice);
  assert.equal(e.earlier.by, "2026-12-31");
  assert.ok(e.earlier.gain > 0);
});

test("Queensland landlords see the renters rebate, owner-occupiers don't", () => {
  const landlord = R.estimate({ ...base, product: "solar", ownership: "landlord", timeframe: "asap" });
  assert.equal(landlord.lines.find((l) => l.key === "qldrent").amount, 3500);
  const owner = R.estimate({ ...base, product: "solar", timeframe: "asap" });
  assert.equal(owner.lines.find((l) => l.key === "qldrent"), undefined);
  const nsw = R.estimate({ ...base, postcode: "2000", product: "solar", ownership: "landlord", timeframe: "asap" });
  assert.equal(nsw.lines.find((l) => l.key === "qldrent"), undefined);
  assert.equal(R.qldRentersRebate(3.5), 2500);
  assert.equal(R.qldRentersRebate(4.5), 3000);
});

test("Adelaide and SEQ postcodes route to XF Energy", async () => {
  const { routeFor } = await import("../netlify/lib/lead-core.mjs");
  assert.equal(routeFor("5000").id, "adelaide");
  assert.equal(routeFor("5112").retailer, "XF Energy");
  assert.equal(routeFor("4152").id, "seq");
  assert.equal(routeFor("5700").id, "unassigned");
});
