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
(
name,
question_range,
test_date,
total,
correct,
rate,
wrong_words
)
VALUES
(?,?,?,?,?,?,?)
ON CONFLICT(name, question_range)
DO UPDATE SET
    test_date = excluded.test_date,
    total = excluded.total,
    correct = excluded.correct,
    rate = excluded.rate,
    wrong_words = excluded.wrong_words;
            `
        )
       .bind(

    data.name,

    data.questionRange,
    data.date,


    data.total,

    data.correct,

    data.rate,

    data.wrongWords

)
        .run();


        return Response.json({
            success:true
        });

    }


}
