// FloodSense Thailand: ค้นหาสถานที่ด้วย Longdo Map (ต้องตั้งค่า LONGDO_KEY ใน Vercel)
module.exports = async (req, res) => {
  const key = process.env.LONGDO_KEY;
  if (!key) { res.status(501).json({ error: "LONGDO_KEY not set" }); return; }
  const q = String(req.query.q || "").slice(0, 100);
  if (!q) { res.status(200).json([]); return; }
  const near = req.query.lat && req.query.lon ? `&lat=${+req.query.lat}&lon=${+req.query.lon}&span=300km` : "";
  try {
    const r = await fetch(`https://search.longdo.com/mapsearch/json/search?keyword=${encodeURIComponent(q)}&limit=10&locale=th${near}&key=${key}`);
    const j = await r.json();
    const out = (j.data || []).filter(x => x.lat && x.lon).map(x => ({ name: x.name, sub: x.address || "", lat: +x.lat, lon: +x.lon }));
    res.setHeader("Cache-Control", "s-maxage=86400");
    res.status(200).json(out);
  } catch (e) { res.status(502).json({ error: String(e) }); }
};
