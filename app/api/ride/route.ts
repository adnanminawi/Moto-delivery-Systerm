import db from "@/lib/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";
export async function GET() {
    try{
        const [ride_info] = await db.query("SELECT r.id,c.name AS customer_name, d.name AS driver_name, r.pickup_address, r.destination_address, r.status FROM ride r LEFT JOIN driver d ON driver_id=d.id JOIN customer c ON customer_id=c.id");
        return Response.json({ rides_info: ride_info});
    }catch(error){
    return Response.json({error: String(error) }, { status: 500 });
    }
}

export async function POST(request:Request){
  const {name, phone,pickup_lat,pickup_lng,pickup_address,destination_lat,destination_lng,destination_address,status} = await request.json();
  try{
    const[get_cust]= await db.query<RowDataPacket[]>("SELECT id FROM customer Where phone=?",
    [phone]);


let customer_id;
if (get_cust.length > 0) {
customer_id = get_cust[0].id;
} else {
const [newCust] = await db.query<ResultSetHeader>("INSERT INTO customer (name, phone) VALUES (?, ?)", [name, phone]);
customer_id = newCust.insertId;
}

    const [create_ride] = await db.query("INSERT INTO ride(customer_id,pickup_lat,pickup_lng,pickup_address,destination_lat,destination_lng,destination_address,status) VALUES (?,?,?,?,?,?,?,?)",
    [customer_id,pickup_lat,pickup_lng,pickup_address,destination_lat,destination_lng,destination_address,'searching']);
    return Response.json({ ok: true }, { status: 201 });
  }catch(error){
    return Response.json({error: String(error) }, { status: 500 });

  }

}