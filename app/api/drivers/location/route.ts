import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { driverId, lat, lng } = await req.json();

    if (!driverId || lat == null || lng == null) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    await db.query(
      `UPDATE driver
       SET current_lat = ?,
           current_lng = ?,
           last_location_update = NOW()
       WHERE id = ?`,
      [lat, lng, driverId]
    );

    return Response.json({ message: "Location updated successfully" });

  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}