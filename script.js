


const quizzes = {
    kai: {
        questions: [
            {type: "meerkeuze", question: "Wat is nepnieuws?", options:["Feitelijk nieuws","Verzonnen nieuws","Nieuws van gisteren"], answer:1},
            {type: "meerkeuze", question: "Wat kan helpen nepnieuws te herkennen?", options:["Bron controleren","Alles geloven","Snelle reactie"], answer:0},
            {type: "waarOnwaar", question: "Nepnieuws is altijd bedoeld om mensen te misleiden", answer:true},
            {type: "waarOnwaar", question: "Alle nieuwswebsites zijn betrouwbaar", answer:false},
            {type: "meerkeuze", question: "Een betrouwbare bron is:", options:["Satire site","Bekende krant","Instagram post"], answer:1},
            {type: "waarOnwaar", question: "Foto's kunnen ook nep zijn", answer:true},
            {type: "open", question: "Noem een manier om feiten te checken", answer:"factcheck"},
            {type: "open", question: "Wie kan nepnieuws verspreiden?", answer:"iedereen"},
            {type: "meerkeuze", question: "Wat is een virale nepvideo?", options:["Video die viraal gaat","Video van de krant","Documentaire"], answer:0},
            {type: "waarOnwaar", question: "Nieuws delen zonder te controleren kan gevaarlijk zijn", answer:true},
            {type: "open", question: "Wat kun je doen als je nepnieuws ziet?", answer:"niet delen"},
            {type: "open", question: "Waarom is nepnieuws schadelijk?", answer:"misleiding"}
        ]
    },
    carlos: {
        questions: [
            {type:"meerkeuze", question:"Wat betekent privacy online?", options:["Alles delen","Persoonlijke gegevens beschermen","Gamen"], answer:1},
            {type:"meerkeuze", question:"Wat is een sterk wachtwoord?", options:["123456","Uniek en lang","Naam van huisdier"], answer:1},
            {type:"waarOnwaar", question:"Je gegevens zijn altijd veilig online", answer:false},
            {type:"waarOnwaar", question:"Het delen van persoonlijke info op sociale media kan risico's geven", answer:true},
            {type:"meerkeuze", question:"Welke van deze acties beschermt je privacy?", options:["Alles posten","Twee-factor authenticatie gebruiken","Wachtwoorden delen"], answer:1},
            {type:"waarOnwaar", question:"Openbare wifi is altijd veilig", answer:false},
            {type:"open", question:"Noem een manier om je gegevens te beschermen", answer:"versleuteling"},
            {type:"open", question:"Wat kun je doen om je privacy te verbeteren?", answer:"instellingen aanpassen"},
            {type:"meerkeuze", question:"Wat is phishing?", options:["E-mailfraude","Nieuwssite","Video"], answer:0},
            {type:"waarOnwaar", question:"Een VPN kan helpen je privacy te beschermen", answer:true},
            {type:"open", question:"Waarom is het belangrijk om je wachtwoorden niet te delen?", answer:"veiligheid"},
            {type:"open", question:"Wat is het risico van teveel persoonlijke info online?", answer:"misbruik"}
        ]
    },
    nikhil: {
        questions: [
            {type:"meerkeuze", question:"Hoe beïnvloedt social media ons gedrag?", options:["Geen effect","Verandering van mening","Altijd positief"], answer:1},
            {type:"meerkeuze", question:"Wat kan leiden tot verslaving aan social media?", options:["Tijdslimiet","Constante notificaties","Geen notificaties"], answer:1},
            {type:"waarOnwaar", question:"Likes kunnen je stemming beïnvloeden", answer:true},
            {type:"waarOnwaar", question:"We worden nooit beïnvloed door online advertenties", answer:false},
            {type:"meerkeuze", question:"Wat helpt om social media gezond te gebruiken?", options:["Continu scrollen","Pauzes nemen","Alles geloven"], answer:1},
            {type:"waarOnwaar", question:"Het vergelijken van jezelf met anderen online kan stress veroorzaken", answer:true},
            {type:"open", question:"Noem een manier om je tijd op social media te beperken", answer:"pauze"},
            {type:"open", question:"Wat kun je doen om nep-informatie op social media te vermijden?", answer:"checken"},
            {type:"meerkeuze", question:"Wat is een echo chamber?", options:["Een muziekkamer","Een omgeving met alleen dezelfde meningen","Een nieuwstype"], answer:1},
            {type:"waarOnwaar", question:"Commentaar op social media beïnvloedt niemand", answer:false},
            {type:"open", question:"Waarom is bewust omgaan met social media belangrijk?", answer:"mentale gezondheid"},
            {type:"open", question:"Noem een effect van social media op gedrag", answer:"invloed"}
        ]
    }
};


function startQuiz(quizId) {
    const quizData = quizzes[quizId];
    let currentQuestion = 0;
    let score = 0;

    const quizContainer = document.getElementById("quiz-container");
    const nameInput = document.getElementById("player-name");

    function showQuestion() {
        const q = quizData.questions[currentQuestion];
        let html = `<div class="question"><h3>Vraag ${currentQuestion+1}: ${q.question}</h3>`;

        if(q.type === "meerkeuze") {
            q.options.forEach((opt, i) => {
                html += `<div><input type="radio" name="answer" value="${i}"> ${opt}</div>`;
            });
        } else if(q.type === "waarOnwaar") {
            html += `<div><input type="radio" name="answer" value="true"> Waar</div>`;
            html += `<div><input type="radio" name="answer" value="false"> Onwaar</div>`;
        } else if(q.type === "open") {
            html += `<input type="text" id="open-answer" placeholder="Typ je antwoord hier">`;
        }

        html += `<button onclick="nextQuestion()">Volgende</button></div>`;
        quizContainer.innerHTML = html;
    }

    window.nextQuestion = function() {
        const q = quizData.questions[currentQuestion];
        let answerCorrect = false;

        if(q.type === "open") {
            const userAnswer = document.getElementById("open-answer").value.toLowerCase().trim();
            answerCorrect = q.answer.toLowerCase() === userAnswer;
        } else {
            const selected = document.querySelector('input[name="answer"]:checked');
            if(selected) {
                const val = q.type === "meerkeuze" ? parseInt(selected.value) : selected.value === "true";
                answerCorrect = val === q.answer;
            } else {
                alert("Kies een antwoord!");
                return;
            }
        }

        if(answerCorrect) score++;

        currentQuestion++;
        if(currentQuestion < quizData.questions.length) {
            showQuestion();
        } else {
            const playerName = nameInput ? nameInput.value || "Speler" : "Speler";
            quizContainer.innerHTML = `<h2>Eindscore: ${score} van ${quizData.questions.length}</h2>
                                       <p>Goed gedaan, ${playerName}!</p>`;
        }
    }

    showQuestion();
}