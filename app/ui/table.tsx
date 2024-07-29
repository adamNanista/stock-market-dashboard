import Link from "next/link";

async function getFilteredStocks(query: string) {
	const stocks = await fetch(`https://api.polygon.io/v3/reference/tickers?ticker.gte=${query}&active=true&limit=10&apiKey=rLdG0SNWBFY4CfpFmtA1l3uMpo7k5eXR`).then((res) => res.json());

	return stocks;
}

export default async function Table({ query }: { query: string }) {
	const stocks = await getFilteredStocks(query);

	return (
		<ul>
			{stocks?.results?.map((stock: { ticker: string; name: string }) => (
				<li key={stock.ticker}>
					<Link href={`/stock/${stock.ticker}`}>
						{stock.name}
						<br />
						{stock.ticker}
					</Link>
				</li>
			))}
		</ul>
	);
}
