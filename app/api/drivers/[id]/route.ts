import db from "@/lib/db";


export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try{
        const [one_dri] = await db.query("SELECT id, name, phone, status, current_lat, current_lng FROM driver Where id =?",
        [id]);
        return Response.json({ driver_Profile : one_dri });

    }catch(error){
    return Response.json({error: String(error) }, { status: 500 });
  }
}
export async function PUT(request:Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { name, phone, status, current_lat, current_lng } = await request.json();
  try {
    await db.query("UPDATE driver SET name = ?, phone = ?, status = ?, current_lat = ?, current_lng = ? WHERE id = ?",
      [name, phone, status, current_lat, current_lng, id]);
    return Response.json({ message: "Driver updated successfully" });
  } catch (error) {
    return Response.json({ error: String(error) }, { status: 500 });
  }
}