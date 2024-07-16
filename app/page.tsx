"use client";

import useSWR from "swr";
import Link from "next/link";

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

function TickerPicker() {
	const { data, isLoading } = useSWR(`https://api.polygon.io/v3/reference/tickers?active=true&limit=10&apiKey=rLdG0SNWBFY4CfpFmtA1l3uMpo7k5eXR`, fetcher);

	if (isLoading) return <div>Loading...</div>;
	if (!data) return <div>Fail</div>;

	return (
		<ul className="flex flex-wrap space-x-4">
			{data.results.map((ticker: { ticker: string }) => {
				return (
					<li key={ticker.ticker}>
						<Link href={`/stock/${ticker.ticker}`}>{ticker.ticker}</Link>
					</li>
				);
			})}
		</ul>
	);
}

export default function Home() {
	return (
		<main>
			<TickerPicker />
		</main>
	);
}
