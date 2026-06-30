import db from "@/lib/db";
import { RowDataPacket } from "mysql2";

export async function GET() {
  try {
    const [drivers] = await db.query<RowDataPacket[]>("SELECT COUNT(*) AS total FROM driver");
    const [customers] = await db.query<RowDataPacket[]>("SELECT COUNT(*) AS total FROM customer");
    const [rides] = await db.query<RowDataPacket[]>("SELECT COUNT(*) AS total FROM ride WHERE status = 'completed'");

    return Response.json({
      total_drivers: drivers[0].total,
      total_customers: customers[0].total,
      completed_rides: rides[0].total,
    });
  } catch (error) {
    return Response.json({ error: String(error) }, { status: 500 });
  }
}