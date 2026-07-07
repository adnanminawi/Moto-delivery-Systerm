import db from "@/lib/db";

export async function GET() {
  try {
    const [customers] = await db.query(
      "SELECT COUNT(*) as count FROM customer"
    );

    const [drivers] = await db.query(
      "SELECT COUNT(*) as count FROM driver"
    );

    const [rides] = await db.query(
      "SELECT COUNT(*) as count FROM ride"
    );

    const [completed] = await db.query(
      "SELECT COUNT(*) as count FROM ride WHERE status = 'completed'"
    );

    const [pending] = await db.query(
      "SELECT COUNT(*) as count FROM ride WHERE status = 'pending'"
    );

    const [cancelled] = await db.query(
      "SELECT COUNT(*) as count FROM ride WHERE status = 'cancelled'"
    );

    const [online] = await db.query(
      "SELECT COUNT(*) as count FROM driver WHERE status = 'online'"
    );

    const [busy] = await db.query(
      "SELECT COUNT(*) as count FROM driver WHERE status = 'busy'"
    );

    const [offline] = await db.query(
      "SELECT COUNT(*) as count FROM driver WHERE status = 'offline'"
    );

    return Response.json({
      customers: (customers as any)[0].count,
      drivers: (drivers as any)[0].count,
      rides: (rides as any)[0].count,
      completed: (completed as any)[0].count,
      pending: (pending as any)[0].count,
      cancelled: (cancelled as any)[0].count,
      online: (online as any)[0].count,
      busy: (busy as any)[0].count,
      offline: (offline as any)[0].count,
    });

  } catch (error: any) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}