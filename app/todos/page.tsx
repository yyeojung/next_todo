import { title } from "@/components/primitives";
import TodosTable from "@/components/todos-table";
import { fetchTodos } from "@/data/firestore";

async function fetchTodosApiCall() {
    const res = await fetch(`${process.env.BASE_URL}/api/todos/`)

    if(!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json();
}
export default async function TodosgPage() {
    const response = await fetchTodosApiCall();
	return (
        <div className="flex flex-col space-y-8">
			<h1 className={title()}>TodosgPage</h1>
            <TodosTable todos={response.data ?? []}/>
            {/* <TodosTable todos={[]}/> */}
		</div>
	);
}
