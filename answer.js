const path = window.location.pathname;
const paths = path.split("/");
const quiz_id = paths[paths.length - 1].split("?")[0];

function similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
        return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
            if (i == 0)
                costs[j] = j;
            else {
                if (j > 0) {
                    var newValue = costs[j - 1];
                    if (s1.charAt(i - 1) != s2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue),
                            costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0)
            costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}

function parseFreetext(text) {
    return text.trim().replace("<P>", "").replace("</P>", "");

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
    console.log(questions);
    setInterval(() => {
        if (document.getElementsByClassName("CamxkuikD8Jtm6wCwTk21").length == 0) {
            return;
        }
    
        const questionTe = document.getElementsByClassName("CamxkuikD8Jtm6wCwTk21")[0].children[0].innerText;
        const responeEl = document.getElementsByClassName("_2dj-BbvpndYIEn2OVvgLks")[0];

        if (!responeEl) {
            return;
        }
    
        let max_similarity = 0;
        let max_question = "";
        questions.forEach((question) => {
            sim = similarity(questionTe, question["question"]);
            if (sim > max_similarity) {
                max_similarity = sim;
                max_question = question;
            }
        });

        // const answer = max_question["answer"].replace("freetext://", "").replace("<P>", "").replace("</P>", "");
        if (max_question["answer"].includes("freetext://")) {
            answer = parseFreetext(max_question["answer"].replace("freetext://", ""));
        //} else if ("freetextm://" in max_question["answer"]) {
        } else if (max_question["answer"].includes("freetextm://")) {
            answers = max_question["answer"].replace("freetextm://", "").split(" : ");
            answer = parseFreetext(answers[Math.floor(Math.random() * answers.length)]);
        }

        responeEl.children[0].value = answer;
    
        setTimeout(() => {
            responeEl.children[1].click();

            setTimeout(() => {
                const next = document.getElementsByClassName("_2PSgLZCXVR-nlobGH6VlHf")[0];
                next.click();
            }, 100);
        }, 100);
    }, 250);
});