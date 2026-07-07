import db from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { name, phone, password, status } = await request.json();

    if (!name || !phone || !password) {
      return Response.json(
        {
          success: false,
          message: "All fields are required.",
        },
        { status: 400 }
      );
    }

    // Check if phone already exists
    const [rows]: any = await db.query(
      "SELECT id FROM driver WHERE phone = ?",
      [phone]
    );

    if (rows.length > 0) {
      return Response.json(
        {
          success: false,
          message: "Phone already exists.",
        },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert driver
    await db.query(
      `INSERT INTO driver
      (name, phone, password_hash, status, current_lat, current_lng)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        name,
        phone,
        hashedPassword,
        status || "available",
        0,
        0,
      ]
    );

    return Response.json({
      success: true,
      message: "Driver added successfully.",
    });

  } catch (error: any) {
  console.error("ERROR:", error);

  return Response.json(
    {
      success: false,
      message: error.message,
      error,
    },
    { status: 500 }
  );
}
}