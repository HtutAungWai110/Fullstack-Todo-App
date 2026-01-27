import { NextRequest, NextResponse } from "next/server";
import getUser from "@/app/lib/getUserInfo";
import { createNewList } from "@/app/controllers/todoController";
export async function POST(req: NextRequest){
 
  const {input} = await req.json();
  const user = await getUser();
  
  if (!user || typeof user === 'string') {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = user;

  try {
    const newList = await createNewList(id, input);

    return NextResponse.json({
      message: "success",
      data: newList,
      status: 200
    })
  } catch (e) {
    return NextResponse.json({
      message: (e as Error).message,
      status: 400
    }) 
  }
  
}

