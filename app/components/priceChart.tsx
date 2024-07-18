"use client";

import { Chart as ChartJS, registerables } from "chart.js/auto";
import { Chart } from "react-chartjs-2";

ChartJS.register(...registerables);

export default function PriceChart({ params }: { params: { labels: string[]; values: number[] } }) {
	return <Chart type="line" data={{ labels: params.labels, datasets: [{ label: "Price", data: params.values, tension: 0.5, pointHoverBorderWidth: 8, pointBorderWidth: 4, borderWidth: 4 }] }} options={{ plugins: { legend: { display: false } } }} />;
}
