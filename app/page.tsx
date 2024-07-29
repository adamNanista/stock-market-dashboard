import Search from "./ui/search";
import Table from "./ui/table";

export default async function Home({ searchParams }: { searchParams?: { query?: string; page?: string } }) {
	const query = searchParams?.query || "";

	return (
		<>
			<Search />
			<Table query={query} />
		</>
	);
}
