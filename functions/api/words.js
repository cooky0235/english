export async function onRequest(context) {


    const url = new URL(context.request.url);


    const start =
    Number(url.searchParams.get("start"));


    const end =
    Number(url.searchParams.get("end"));



    const result =
    await context.env.DB.prepare(
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
