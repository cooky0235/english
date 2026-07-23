export async function onRequest(context) {

    const url = new URL(context.request.url);

    const group = Number(url.searchParams.get("group"));

    const result = await env.DB.prepare(
`
SELECT *
FROM words
WHERE id BETWEEN ? AND ?
ORDER BY id
`
)
.bind(start,end)
.all();

    return Response.json(result.results);

}
