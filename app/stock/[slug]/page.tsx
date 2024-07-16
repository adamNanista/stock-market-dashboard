import PriceChart from "@/app/components/priceChart";

export async function generateStaticParams() {
	const data = await fetch(`https://api.polygon.io/v3/reference/tickers?active=true&limit=10&apiKey=rLdG0SNWBFY4CfpFmtA1l3uMpo7k5eXR`).then((res) => res.json());

	return data.results.map((stock: { ticker: string }) => ({
		slug: stock.ticker,
	}));
}

async function getDetailData({ params }: { params: { slug: string } }) {
	const data = await fetch(`https://api.polygon.io/v3/reference/tickers/${params.slug}?apiKey=rLdG0SNWBFY4CfpFmtA1l3uMpo7k5eXR`).then((res) => res.json());

	return data;
}

async function getChartData({ params }: { params: { slug: string } }) {
	const data = await fetch(`https://api.polygon.io/v2/aggs/ticker/${params.slug}/range/1/day/2023-01-09/2023-02-10?adjusted=true&sort=asc&apiKey=rLdG0SNWBFY4CfpFmtA1l3uMpo7k5eXR`).then((res) => res.json());

	return data;
}

export default async function Page({ params }: { params: { slug: string } }) {
	const detailData = await getDetailData({ params });
	const chartData = await getChartData({ params });

	const labels = chartData.results.map((result: { t: number }) => new Date(result.t).toDateString());
	const values = chartData.results.map((result: { c: number }) => result.c);

	const chartParams = {
		labels: labels,
		values: values,
	};

	return (
		<div>
			<h1>{detailData.results.name}</h1>
			<p>{detailData.results.description}</p>
			<PriceChart params={chartParams} />
		</div>
	);
}
