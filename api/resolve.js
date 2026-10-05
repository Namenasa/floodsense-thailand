// FloodSense Thailand: แปลงลิงก์ย่อ Google Maps (maps.app.goo.gl) เป็นลิงก์เต็ม เพื่ออ่านพิกัด
module.exports = async (req, res) => {
  let u = String(req.query.u || "");
  const ok = s => /^https:\/\/(maps\.app\.goo\.gl|goo\.gl\/maps|(www\.)?google\.[a-z.]+\/maps|maps\.google\.[a-z.]+)/i.test(s);
  if (!ok(u)) { res.status(400).json({ error: "not a Google Maps link" }); return; }
  try {
    for (let i = 0; i < 6; i++) {
      const r = await fetch(u, { redirect: "manual", headers: { "User-Agent": "Mozilla/5.0" } });
      const loc = r.headers.get("location");
      if (!loc) break;
      u = new URL(loc, u).toString();
    }
    res.status(200).json({ url: u });
  } catch (e) { res.status(502).json({ error: String(e) }); }
};
