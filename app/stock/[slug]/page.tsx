import PriceChart from "@/app/components/priceChart";

export async function generateStaticParams() {
	const data = await fetch(`https://api.polygon.io/v3/reference/tickers?market=stocks&active=true&limit=10&apiKey=rLdG0SNWBFY4CfpFmtA1l3uMpo7k5eXR`).then((res) => res.json());

	return data.results.map((stock: { ticker: string }) => ({
		slug: stock.ticker,
	}));
}

async function getData({ params }: { params: { slug: string } }) {
	const data = await fetch(`https://api.polygon.io/v3/reference/tickers/${params.slug}?apiKey=rLdG0SNWBFY4CfpFmtA1l3uMpo7k5eXR`).then((res) => res.json());

	return data;
}

export default async function Page({ params }: { params: { slug: string } }) {
	const data = await getData({ params });

	return (
		<div className="max-w-xl mx-auto p-8 space-y-8 border border-neutral-300 rounded-lg">
			<div className="space-y-4">
				<h1 className="text-3xl font-black">{data.results.name}</h1>
				{data.results.description && <p>{data.results.description}</p>}
			</div>
			<PriceChart slug={params.slug} />
		</div>
	);
}
