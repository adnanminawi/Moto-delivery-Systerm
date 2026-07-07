import db from "@/lib/db";


export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try{
        const [one_cust] = await db.query("SELECT id, name, phone FROM customers Where id =?",
        [id]);
        return Response.json({ customer_Profile : one_cust });

    }catch(error){
    return Response.json({error: String(error) }, { status: 500 });
  }
}