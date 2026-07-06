import db from "@/lib/db";

export async function GET() {
  try {
   const [rides] = await db.query(
  `SELECT *
   FROM ride
   WHERE status = 'searching'
   ORDER BY id DESC
   LIMIT 1`
);

    return Response.json({
      rides_info: rides,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to fetch rides" },
      { status: 500 }
    );
  }
}