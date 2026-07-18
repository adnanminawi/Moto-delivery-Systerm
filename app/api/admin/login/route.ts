import db from "@/lib/db";
import bcrypt from "bcrypt";
import { RowDataPacket } from "mysql2";

interface Admin extends RowDataPacket {
  id: number;
  username: string;
  password_hash: string;
}

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    console.log("Username:", username);

    const [rows] = await db.query<Admin[]>(
      "SELECT * FROM admin WHERE username = ?",
      [username]
    );
    console.log("Rows:", rows);
    // Username not found
    if (rows.length === 0) {
      return Response.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }
    const admin = rows[0];

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(
      password,
      admin.password_hash
    );

    console.log("Password match:", isMatch);

    if (!isMatch) {
      return Response.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    return Response.json(
      {
        message: "Login successful",
        admin: {
          id: admin.id,
          username: admin.username,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);

    return Response.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}