import db from "@/lib/db";


export async function GET(request, { params }) {
    const { id } = await params;
    try{
        const [one_cust] = await db.query("SELECT id, name, phone FROM customer Where id =?",
        [id]);
        return Response.json({ driver_Profile : one_cust });

    }catch(error){
    return Response.json({error: String(error) }, { status: 500 });
  }
}