import db from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // 1. Missing fields
    if (!username || !password) {
      return Response.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    // 2. Get admin from DB
    const [rows]: any = await db.query(
      "SELECT * FROM admin WHERE username = ?",
      [username]
    );

    const admin = rows[0];

    // 3. User not found
    if (!admin) {
      return Response.json(
        { error: "Account not found" },
        { status: 404 }
      );
    }

    // 4. Check password
    const isMatch = await bcrypt.compare(
      password,
      admin.password_hash
    );

    if (!isMatch) {
      return Response.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    // 5. Success
    return Response.json({
      message: "Login successful",
      admin: {
        id: admin.id,
        username: admin.username,
      },
    });

  } catch (error) {
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}