import db from "@/lib/db";


export async function GET(request, { params }) {
    const { id } = await params;
    try{
        const [one_dri] = await db.query("SELECT id, name, phone, status, current_lat, current_lng FROM driver Where id =?",
        [id]);
        return Response.json({ driver_Profile : one_dri });

    }catch(error){
    return Response.json({error: String(error) }, { status: 500 });
  }
}