export async function onRequest(context) {


    // 查询成绩
    if(context.request.method === "GET"){


        const result = await context.env.DB
        .prepare(
            `
            SELECT *
            FROM results
            ORDER BY id DESC
            `
        )
        .all();


        return Response.json(result.results);

    }



    // 保存成绩
    if(context.request.method === "POST"){


        const data = await context.request.json();


        await context.env.DB.prepare(
            `
            INSERT INTO results
            (name, test_date, total, correct, rate)
            VALUES (?, ?, ?, ?, ?)
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


}
