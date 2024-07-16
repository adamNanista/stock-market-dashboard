export async function generateStaticParams() {
	const stocks = await fetch("https://api.polygon.io/v3/reference/tickers?active=true&limit=10&apiKey=rLdG0SNWBFY4CfpFmtA1l3uMpo7k5eXR").then((res) => res.json());

	return stocks.results.map((stock: { ticker: string }) => ({
		slug: stock.ticker,
	}));
}

export default function Page({ params }: { params: { slug: string } }) {
	return <div>{params.slug}</div>;
}
