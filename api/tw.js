// FloodSense Thailand: ดึงระดับน้ำจริงจาก สสน. (ThaiWater) ผ่านเซิร์ฟเวอร์ Vercel
module.exports = async (req, res) => {
  try {
    const r = await fetch("https://api-v3.thaiwater.net/api/v1/thaiwater30/public/waterlevel_load", {
      headers: { "User-Agent": "Mozilla/5.0 FloodSense", "Referer": "https://www.thaiwater.net/", "Accept": "application/json" }
    });
    if (!r.ok) { res.status(502).json({ error: "thaiwater " + r.status }); return; }
    const j = await r.json();
    const data = ((j.waterlevel_data && j.waterlevel_data.data) || []).filter(d => +d.situation_level >= 4);
    res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate=1800");
    res.status(200).json({ waterlevel_data: { result: "OK", data } });
  } catch (e) {
    res.status(502).json({ error: String(e) });
  }
};

