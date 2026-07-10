import db from "@/lib/db";
import { RowDataPacket } from "mysql2";

export async function GET() {
  try {
    // drivers
    const [drivers] = await db.query<RowDataPacket[]>(
      "SELECT COUNT(*) AS total FROM driver"
    );

    // customers
    const [customers] = await db.query<RowDataPacket[]>(
      "SELECT COUNT(*) AS total FROM customer"
    );

    // total rides
    const [rides] = await db.query<RowDataPacket[]>(
      "SELECT COUNT(*) AS total FROM ride"
    );

    // completed rides
    const [completed] = await db.query<RowDataPacket[]>(
      "SELECT COUNT(*) AS total FROM ride WHERE status = 'completed'"
    );

    // pending rides
    const [pending] = await db.query<RowDataPacket[]>(
      "SELECT COUNT(*) AS total FROM ride WHERE status = 'pending'"
    );

    // cancelled rides
    const [cancelled] = await db.query<RowDataPacket[]>(
      "SELECT COUNT(*) AS total FROM ride WHERE status = 'cancelled'"
    );

    
    const [online] = await db.query<RowDataPacket[]>(
      "SELECT COUNT(*) AS total from driver WHERE status = 'online'"
    );
    const [offline] = await db.query<RowDataPacket[]>(
      "SELECT COUNT(*) as total from driver WHERE status= 'offline'"
    );
    const [busy] = await db.query<RowDataPacket[]>(
      "SELECT COUNT(*) as total FROM driver WHERE status = 'busy'"
    );

  
    // recent customers
    const [recentCustomers] = await db.query<RowDataPacket[]>(
      `SELECT id, name, phone, created_at
       FROM customer
       ORDER BY created_at DESC
       LIMIT 5`
    );

    return Response.json({
      total_drivers: drivers[0].total,
      total_customers: customers[0].total,
      total_rides: rides[0].total,
      completed_rides: completed[0].total,
      pending_rides: pending[0].total,
      cancelled_rides: cancelled[0].total,
      online: online[0].total,
      busy: busy[0].total,
      offline: offline[0].total,
      recent_customers: recentCustomers,

    });
  } catch (error) {
    return Response.json({ error: String(error) }, { status: 500 });
  }
}