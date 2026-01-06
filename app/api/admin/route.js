import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { user } = auth();
  
  if (!user || user.publicMetadata.role !== 'admin') {
    return new NextResponse("Unauthorized", { status: 403 });
  }
  
  return NextResponse.json({ message: "Admin data" });
}