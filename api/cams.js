// FloodSense Thailand: รายชื่อกล้องจราจรสาธารณะ (ฟีด iTIC ผ่าน Longdo)
module.exports = async (req, res) => {
  try {
    const r = await fetch("https://camera.longdo.com/feed/?command=json", { headers: { "User-Agent": "Mozilla/5.0 FloodSense" } });
    if (!r.ok) { res.status(502).json({ error: "feed " + r.status }); return; }
    const j = await r.json();
    const out = (Array.isArray(j) ? j : []).filter(c => c.hls_url && !/tempsus/.test(c.hls_url) && +c.latitude)
      .map(c => ({ t: c.title, lat: +c.latitude, lon: +c.longitude, u: c.hls_url, o: c.organization || "" }));
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
    res.status(200).json(out);
  } catch (e) {
    res.status(502).json({ error: String(e) });
  }
};
