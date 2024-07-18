import PriceChart from "@/app/components/priceChart";

export async function generateStaticParams() {
	const data = await fetch(`https://api.polygon.io/v3/reference/tickers?market=stocks&active=true&limit=10&apiKey=rLdG0SNWBFY4CfpFmtA1l3uMpo7k5eXR`).then((res) => res.json());

	return data.results.map((stock: { ticker: string }) => ({
		slug: stock.ticker,
	}));
}

async function getDetailData({ params }: { params: { slug: string } }) {
	const data = await fetch(`https://api.polygon.io/v3/reference/tickers/${params.slug}?apiKey=rLdG0SNWBFY4CfpFmtA1l3uMpo7k5eXR`).then((res) => res.json());

	return data;
}

async function getChartData({ params }: { params: { slug: string } }) {
	const data = await fetch(`https://api.polygon.io/v2/aggs/ticker/${params.slug}/range/1/day/2024-07-10/2024-07-17?adjusted=true&sort=asc&apiKey=rLdG0SNWBFY4CfpFmtA1l3uMpo7k5eXR`).then((res) => res.json());

	return data;
}

export default async function Page({ params }: { params: { slug: string } }) {
	const detailData = await getDetailData({ params });
	const chartData = await getChartData({ params });

	const labels = chartData.results?.map((result: { t: number }) => new Date(result.t).toLocaleDateString());
	const values = chartData.results?.map((result: { c: number }) => result.c);

	const chartParams = {
		labels: labels,
		values: values,
	};

	return (
		<div className="max-w-xl mx-auto p-8 space-y-8 border border-neutral-300 rounded-lg">
			<div className="space-y-4">
				<h1 className="text-3xl font-black">{detailData.results.name}</h1>
				{detailData.results.description && <p>{detailData.results.description}</p>}
			</div>
			{chartData.results && <PriceChart params={chartParams} />}
		</div>
	);
}
