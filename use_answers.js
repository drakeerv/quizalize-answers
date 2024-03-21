const answers = {
    "El sábado pasado _________________mucho viento": "hacía",
    "Anoche Sonia _________________muy enferma": "estaba",
    "Durante la escuela secundaria, ellos ______________pruebas todos los viernes. (tener)": "tenían",
    "El mes pasado yo ________________ la película nueva de Brad Pitt (ver)": "vi",
    "Miguel ____________por el parque todas las mañanas (correr)": "corría",
    "Tú_______________(to be) muy amable": "eras",
    "_________________(to be)  el catorce de Abril, cuando te fuiste a New York": "era",
    "15. Ella ____________________en el supermercado esta mañana (to be)": "estaba",
    "Cuando llegué a casa anoche _________________casi la una de la mañana (to be)": "era",
    "Mi hermana______________todos los quehaceres anoche. (hacer)": "hizo",
    "Yo _________________ (ir) a la playa con mis amigos a menudo": "iba",
    "Yo _________________ al parque con mi perro por la mañana. (ir)": "fui",
    "Yo _________________siempre los dibujos animados con mi hermanita. (ver)": "veía",
    "El mes pasado yo __________________por 10 kilómetros (correr)": "corrí",
    "El lunes yo_____________una prueba de biologia (tener)": "tuve",
    "Anoche salimos muy tarde. __________ las 11:00 de la noche.": "eran",
    "Yo _________ a mi amiga Celina para ver si ella estaba en casa. (llamar)": "llamé",
    "El año pasado __________ a chico español muy simpático (conocer)": "conocí",
    "Yo _____________(to cry) mucho cuando era niña.": "lloraba",
    "Yo __________ al ajedrez en tu casa cuando era niña": "jugaba",
    "Después de caminar por 30 minutos, ella _________ a la casa de su amiga. (llegar)": "llegó",
    "Yo ______________ hambre por eso yo desayuné. (tener)": "tenía",
    "Mis padres no _____________ (to be ) en casa anoche": "estaban",
    "Yo me ______________a las nueve, estaba muy cansada. (acostarse)": "acosté",
    "Ella____________a Disney el mes pasado (ir)": "fue"
}

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

setInterval(() => {
    if (document.getElementsByClassName("CamxkuikD8Jtm6wCwTk21").length == 0) {
        return;
    }

    const question = document.getElementsByClassName("CamxkuikD8Jtm6wCwTk21")[0].children[0].innerText;
    const respone = document.getElementsByClassName("_2dj-BbvpndYIEn2OVvgLks")[0];

    let max_similarity = 0;
    let max_question = "";
    for (var key in answers) {
        sim = similarity(question, key);
        if (sim > max_similarity) {
            max_similarity = sim;
            max_question = key;
        }
    }
    const answer = answers[max_question];
    respone.children[0].value = answer;

    setTimeout(() => {
        respone.children[1].click();
    }, 100);
}, 250);