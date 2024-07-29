import PriceChart from "@/app/components/priceChart";

export async function generateStaticParams() {
	const stocks = await fetch(`https://api.polygon.io/v3/reference/tickers?market=stocks&active=true&apiKey=rLdG0SNWBFY4CfpFmtA1l3uMpo7k5eXR`).then((res) => res.json());

	return stocks.results.map((stock: { ticker: string }) => ({
		slug: stock.ticker,
	}));
}

async function getStockData(slug: string) {
	const stock = await fetch(`https://api.polygon.io/v3/reference/tickers/${slug}?apiKey=rLdG0SNWBFY4CfpFmtA1l3uMpo7k5eXR`).then((res) => res.json());

	return stock;
}

export default async function Page({ params }: { params: { slug: string } }) {
	const stock = await getStockData(params.slug);

	return (
		<div className="max-w-xl mx-auto p-8 space-y-8 border border-neutral-300 rounded-lg">
			<div className="space-y-4">
				<h1 className="text-3xl font-black">{stock.results.name}</h1>
				{stock.results.description && <p>{stock.results.description}</p>}
			</div>
			<PriceChart />
		</div>
	);
}
