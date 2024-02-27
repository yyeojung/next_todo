import { Counter } from "@/components/counter";
import { title } from "@/components/primitives";

async function  getInitialCount() {
    console.log('call');
    await new Promise(f => setTimeout(f, 1000))
    return 4;
}

export default async function CounterPage() {

    const fetchedInitialCount = await getInitialCount()
	return (
		<div className="flex flex-col space-y-16">
			<h1 className={title()}>CounterPage</h1>
            <Counter initialCount={fetchedInitialCount}>
                <h1>서버 컴포넌트에서 들어옴</h1>
            </Counter>
		</div>
	);
}
