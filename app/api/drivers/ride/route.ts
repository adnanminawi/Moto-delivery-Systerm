import db from "@/lib/db";

export async function GET() {
  try {
   const [rides] = await db.query(
  `SELECT
    ride.*,
    customer.name AS customer_name,
    customer.phone AS customer_phone
FROM ride
JOIN customer
    ON ride.customer_id = customer.id
WHERE ride.status = 'searching'
ORDER BY ride.id DESC
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

export async function PUT(req: Request) {
  try {
    const { action, rideId, driverId } = await req.json();

  
  if (action === "accept") {
  await db.query(
    `UPDATE ride
     SET driver_id = ?,
         status = 'en_route',
         assigned_at = NOW()
     WHERE id = ?`,
    [driverId, rideId]
  );

      return Response.json({
        message: "Ride accepted successfully",
      });
    }


  if (action === "complete") {
  const [result]: any = await db.query(
    `UPDATE ride
     SET status = 'completed',
         completed_at = NOW()
     WHERE id = ?`,
    [rideId]
  );

      console.log("Complete update result:", result);

  return Response.json({
    message: "Ride completed successfully",
    result,
  });
}

    
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to update ride" },
      { status: 500 }
    );
  }
}

