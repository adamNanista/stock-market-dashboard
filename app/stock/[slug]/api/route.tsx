export async function GET(request: Request, { params }: { params: { slug: string } }) {
	const res = fetch(`https://api.polygon.io/v2/aggs/ticker/${params.slug}/range/1/day/2024-07-10/2024-07-17?adjusted=true&sort=asc&apiKey=rLdG0SNWBFY4CfpFmtA1l3uMpo7k5eXR`);
	const data = (await res).json();

	return Response.json({ data });
}
