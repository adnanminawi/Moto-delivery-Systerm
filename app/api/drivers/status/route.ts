import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { driverId, status } = await req.json();

    // 1. Validate input
    if (!driverId || !status) {
      return Response.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    // 2. Validate status value
    if (status !== "online" && status !== "offline") {
      return Response.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    // 3. Update driver status in DB
    await db.query(
      "UPDATE driver SET status = ? WHERE id = ?",
      [status, driverId]
    );

    // 4. Return success response
    return Response.json({
      message: "Driver status updated successfully",
      status,
    });

  }catch (error: any) {
  console.error("FULL ERROR:", error);

  return Response.json(
    {
      error: "Internal server error",
      details: JSON.stringify(error, Object.getOwnPropertyNames(error)),
    },
    { status: 500 }
  );
}
}