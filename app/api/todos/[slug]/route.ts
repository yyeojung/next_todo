import { fetchATodo, deleteATodo, editATodo } from "@/data/firestore";
import { NextRequest, NextResponse } from "next/server";

// 할 일 단일 조회
export async function GET(request: NextRequest, 
    { params }: { params: { slug: string } }) {
   
        
    const searchParams = request.nextUrl.searchParams
    
    const search = searchParams.get('search')
    
    // URL -> `/dashboard?search=my-project`
    // `search` -> 'my-project'

    const fetchedTodo = await fetchATodo(params.slug);

    if (fetchedTodo === null) {
        return new Response(null, {status: 204});
    }
    const response = {
        message: '단일 할 일 가져오기',
        data: fetchedTodo
    }
    
    return NextResponse.json(response, {status: 200});
  }
// 할 일 단일 삭제 id
export async function DELETE(request: NextRequest, 
    { params }: { params: { slug: string } }) {
    
    const deletedTodo = await deleteATodo(params.slug);

    if(deletedTodo === null) {
        return new Response(null, {status: 204});
    }
    const response = {
        message: '단일 할 일 삭제 성공!',
        data: deletedTodo
    }
    
    return NextResponse.json(response, {status: 200});
}
// 할 일 단일 수정 id
export async function POST(request: NextRequest, 
    { params }: { params: { slug: string } }) {
    
    const {title, is_done} = await request.json();

    const editedTodo = await editATodo(params.slug, {title, is_done});

    if (editedTodo === null) {
        return new Response(null, {status: 204});
    }
    const response = {
        message: '단일 할 일 수정!',
        data: editedTodo
    }
    
    return NextResponse.json(response, {status: 200});
}