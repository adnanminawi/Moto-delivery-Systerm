import db from "@/lib/db";
import bcrypt from "bcrypt";

export async function GET() {
  try { 
    const [driv_info] = await db.query("SELECT id, name, phone, status, current_lat, current_lng FROM driver");
    return Response.json({ drivers: driv_info });
  } catch (error) {
    return Response.json({error: String(error) }, { status: 500 });
  }
}

export async function POST(request: Request){
  const { name, phone, password } = await request.json();
  try{
    const password_hash = await bcrypt.hash(password, 10);
    const [add_driver]= await db.query("INSERT into driver(name,phone,password_hash,status) VALUES (?,?,?,?)",
    [name,phone,password_hash,'offline']
    ); 
    return Response.json({ ok: true }, { status: 201 })
  }catch(error){
    return Response.json({error: String(error) }, { status: 500 });

  }
}

