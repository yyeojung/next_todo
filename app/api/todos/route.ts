
import { NextRequest, NextResponse } from "next/server";
import {fetchTodos, addATodo} from '@/data/firestore'

//모든 할 일 가져오기
export async function GET(request: NextRequest) {
   
    const fetchedTodos = await fetchTodos();
    const response = {
        message: 'todos 몽땅 가져오기',
        data: fetchedTodos
    }
    
    return NextResponse.json(response, {status: 200});
  }

  // 할 일 추가
  export async function POST(request: NextRequest) {
   
    const {title} = await request.json();

    if (title === undefined) {

        const errMessage = {
            message: 'title이 없습니다.'
        }
        return NextResponse.json(errMessage, {status: 422});
    }

    const addedTodo = await addATodo({title});

    const response = {
        message: '할 일 추가 성공!',
        data: addedTodo
    }
    return Response.json(response, {status: 201})
  }