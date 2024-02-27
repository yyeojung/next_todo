import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
   
    const response = {
        message: '깍깍각',
        data: '넥스트 배우는 중임니더'
    }
    
    return NextResponse.json(response, {status: 200});
  }