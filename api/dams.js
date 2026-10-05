// FloodSense Thailand: ข้อมูลเขื่อนขนาดใหญ่ 35 แห่ง จากกรมชลประทาน
module.exports = async (req, res) => {
  try {
    const r = await fetch("https://app.rid.go.th/reservoir/api/dam/public", { headers: { "User-Agent": "Mozilla/5.0 FloodSense", "Accept": "application/json" } });
    if (!r.ok) { res.status(502).json({ error: "rid " + r.status }); return; }
    const j = await r.json();
    res.setHeader("Cache-Control", "s-maxage=1800, stale-while-revalidate=21600");
    res.status(200).json(j);
  } catch (e) {
    res.status(502).json({ error: String(e) });
  }
};
