import { NextRequest, NextResponse } from "next/server";
import { getLists } from "@/app/controllers/listController";
export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const {userId} = await params;
  try {
    const lists = await getLists(userId);
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


