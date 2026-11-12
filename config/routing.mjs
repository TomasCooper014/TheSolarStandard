// Which region (territory) a lead belongs to, by postcode. First match wins, so put smaller
// territories above the state they sit in. Each region names the installer that holds it and can
// go to its own Pipedrive lead owner (leave ownerId null for Sarina). Postcode ranges are inclusive.
//
// XF Energy holds every region while Ghost builds out the territory model. When a territory is
// sold, change its "retailer" (and ownerId if another rep handles it), or split a state into
// smaller regions above its state-wide entry.
const xf = { "retailer": "XF Energy", "pipedrive": { "ownerId": null } };

export default {
  "regions": [
    { "id": "seq", "name": "South-east Queensland", ...xf, "postcodes": ["4000-4299", "4300-4399", "4500-4579"] },
    { "id": "adelaide", "name": "Greater Adelaide", ...xf, "postcodes": ["5000-5199"] },
    { "id": "act", "name": "Australian Capital Territory", ...xf, "postcodes": ["200-299", "2600-2618", "2900-2920"] },
    { "id": "nsw", "name": "New South Wales", ...xf, "postcodes": ["1000-2599", "2619-2899", "2921-2999"] },
    { "id": "vic", "name": "Victoria", ...xf, "postcodes": ["3000-3999", "8000-8999"] },
    { "id": "qld", "name": "Regional Queensland", ...xf, "postcodes": ["4000-4999", "9000-9999"] },
    { "id": "sa", "name": "Regional South Australia", ...xf, "postcodes": ["5000-5999"] },
    { "id": "wa", "name": "Western Australia", ...xf, "postcodes": ["6000-6999"] },
    { "id": "tas", "name": "Tasmania", ...xf, "postcodes": ["7000-7999"] },
    { "id": "nt", "name": "Northern Territory", ...xf, "postcodes": ["800-999"] }
  ],
  "fallback": { "id": "unassigned", "name": "Unassigned", "retailer": null, "pipedrive": { "ownerId": null } }
};
