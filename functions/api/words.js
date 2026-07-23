export async function onRequest(context) {

    const url = new URL(context.request.url);

    const group = Number(url.searchParams.get("group"));

    const result = await context.env.DB.prepare(`
        SELECT jp,en
        FROM words
        WHERE group_no = ?
        ORDER BY question_no
    `)
    .bind(group)
    .all();

    return Response.json(result.results);

}
