import { NextRequest, NextResponse } from "next/server";
import { getLists } from "@/app/controllers/todoController";
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const {id} = await params;
  try {
    const lists = await getLists(id);
    return NextResponse.json({
      message: "success",
      lists,
      status: 200
    })
  } catch(e){
    return NextResponse.json({
      message: (e as Error).message,
      status: 200
    })
  }
}


