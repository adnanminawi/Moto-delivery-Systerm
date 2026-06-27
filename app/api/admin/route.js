import db from "@/lib/db";

export async function GET() {
  try {
    const [drivers] = await db.query("SELECT COUNT(*) AS total FROM driver");
    const [customers] = await db.query("SELECT COUNT(*) AS total FROM customer");
    const [rides] = await db.query("SELECT COUNT(*) AS total FROM ride WHERE status = 'completed'");

    return Response.json({
      total_drivers: drivers,
      total_customers: customers,
      completed_rides: rides
    });
  } catch (error) {
    return Response.json({ error: String(error) }, { status: 500 });
  }
}