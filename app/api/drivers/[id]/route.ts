import db from "@/lib/db";
import { RowDataPacket } from "mysql2";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    // driver info
    const [driverRows] = await db.query<RowDataPacket[]>(
      "SELECT id, name, phone, status, current_lat, current_lng FROM driver WHERE id = ?",
      [id]
    );

    // rides of driver
    const [ridesRows] = await db.query<RowDataPacket[]>(
      `SELECT 
        r.id,
        r.pickup_address,
        r.destination_address,
        r.status,
        c.name AS customer_name
       FROM ride r
       JOIN customer c ON r.customer_id = c.id
       WHERE r.driver_id = ?
       ORDER BY r.id DESC`,
      [id]
    );

    return Response.json({
      driver: driverRows[0] || null,
      rides: ridesRows || [],
    });

  } catch (error) {
    return Response.json({ error: String(error) }, { status: 500 });
  }
}