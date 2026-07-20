export async function onRequestPost(context){

    const data = await context.request.json();

    await context.env.DB.prepare(
        `
        INSERT INTO results
        (name,test_date,total,correct,rate)
        VALUES (?,?,?,?,?)
        `
    )
    .bind(
        data.name,
        data.date,
        data.total,
        data.correct,
        data.rate
    )
    .run();


    return Response.json({
        success:true
    });
}
