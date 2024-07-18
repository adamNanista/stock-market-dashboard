import Link from "next/link";

async function getMenuData() {
	const data = await fetch(`https://api.polygon.io/v3/reference/tickers?market=stocks&active=true&limit=10&apiKey=rLdG0SNWBFY4CfpFmtA1l3uMpo7k5eXR`).then((res) => res.json());

	return data;
}

export default async function Home() {
	const menuData = await getMenuData();

	return (
		<main>
			<ul className="flex flex-wrap space-x-4">
				{menuData.results.map((ticker: { ticker: string }) => {
					return (
						<li key={ticker.ticker}>
							<Link href={`/stock/${ticker.ticker}`}>{ticker.ticker}</Link>
						</li>
					);
				})}
			</ul>
		</main>
	);
}
