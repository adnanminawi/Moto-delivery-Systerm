import db from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { phone, password } = await req.json();

    if (!phone || !password) {
      return Response.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const [rows]: any = await db.query(
      "SELECT * FROM driver WHERE phone = ?",
      [phone]
    );

    const driver = rows[0];

    // Driver not found
    if (!driver) {
      return Response.json(
        { error: "Account not found" },
        { status: 404 }
      );
    }

    // Check password
    const isMatch = await bcrypt.compare(
      password,
      driver.password_hash
    );

    if (!isMatch) {
      return Response.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    // Success
    return Response.json({
      message: "Login successful",
      driver: {
        id: driver.id,
        name: driver.name,
        phone: driver.phone,
        status: driver.status,
      },
    });

  } catch (error) {
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}