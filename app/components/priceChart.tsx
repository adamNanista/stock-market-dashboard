"use client";

import { Chart as ChartJS, registerables } from "chart.js/auto";
import { Chart } from "react-chartjs-2";

ChartJS.register(...registerables);

async function getData({ params }: { params: { slug: string } }) {
	const data = await fetch(`https://api.polygon.io/v2/aggs/ticker/${params.slug}/range/1/day/2024-07-10/2024-07-17?adjusted=true&sort=asc&apiKey=rLdG0SNWBFY4CfpFmtA1l3uMpo7k5eXR`).then((res) => res.json());

	return data;
}

export default async function PriceChart(params: { slug: string }) {
	const data = await getData({ params });

	const labels = data.results?.map((result: { t: number }) => new Date(result.t).toLocaleDateString());
	const values = data.results?.map((result: { c: number }) => result.c);

	const chartData = {
		labels: labels,
		values: values,
	};

	return <>{data.results && <Chart type="line" data={{ labels: chartData.labels, datasets: [{ label: "Price", data: chartData.values, tension: 0.5, pointHoverBorderWidth: 8, pointBorderWidth: 4, borderWidth: 4 }] }} options={{ plugins: { legend: { display: false } } }} />}</>;
}
