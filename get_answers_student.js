// get all items with class dfeeWD
questions = document.getElementsByClassName("clXhQX");
answers = {};

for (var i = 0; i < questions.length; i++) {
    question = questions[i].children[0].innerText;
    possible_answers = questions[i].children[1].innerText;
    correct_answer = questions[i].getElementsByClassName("fSjJzw")[0].innerText;
    answers[question] = correct_answer;
}

// create modal that has the json string of answers and a copy button
css = `
    .modal {
        display: none;
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgb(0,0,0);
        background-color: rgba(0,0,0,0.4);
    }
    .modal-content {
        background-color: #fefefe;
        margin: 15% auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
        color: #000;
    }
    .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }
    .close:hover,
    .close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
    }
`;

if (!document.getElementById("answersStyle")) {
    var style = document.createElement("style");
    style.id = "answersStyle";
    style.innerHTML = css;
    document.head.appendChild(style);
}

if (!document.getElementById("answersModal")) {
    modal = document.createElement("div");
    modal.className = "modal";
    modal.id = "answersModal";
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <pre id="answers"></pre>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementsByClassName("close")[0].onclick = function() {
        document.getElementById("answersModal").style.display = "none";
    }
}

document.getElementById("answers").innerText = JSON.stringify(answers, null, 4);
document.getElementById("answersModal").style.display = "block";