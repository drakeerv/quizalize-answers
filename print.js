const path = window.location.pathname;
const paths = path.split("/");
const quiz_id = paths[paths.length - 1].split("?")[0];

function parseFreetext(text) {
    return text.trim().replace("<P>", "").replace("</P>", "");
}

function parseAnswer(text) {
    return text.split("://")[1];
}

fetch("https://app.quizalize.com/ql/apollo", {
    method: "POST",
    body: JSON.stringify({
        variables: {
            contentId: btoa("Content:" + quiz_id)
        },
        query: "query ContentPreviewModalRendererQuery($contentId:ID!){content:node(id:$contentId){... on Content{payload}}}",
    }),
    headers: {
        "content-type": "application/json",
    },
}).then(response => response.json()).then(questions => {
    questions = JSON.parse(questions.data.content.payload).questions;
    // console.log(questions);

    output = "";
    questions.forEach(question => {
        output += `${parseFreetext(question.question)}: ${parseAnswer(parseFreetext(question.answer))}\n`;
    });
    console.log(output);
});