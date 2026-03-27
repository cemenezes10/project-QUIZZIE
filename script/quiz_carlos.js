const playerName = localStorage.getItem("playerName") || "Speler";
if(!playerName){
    alert("Vul eerst je naam in op de startpagina!");
    window.location.href = "index.html";
}

const questions = [

  {type:"meerkeuze", question:"Wat betekent privacy online?", options:["Alles delen","Persoonlijke gegevens beschermen","Gamen"], answer:1},
  {type:"meerkeuze", question:"Wat is een sterk wachtwoord?", options:["123456","Uniek en lang","Naam van huisdier"], answer:1},
  {type:"meerkeuze", question:"Welke actie beschermt je privacy?", options:["Alles posten","Twee-factor authenticatie gebruiken","Wachtwoorden delen"], answer:1},
  {type:"meerkeuze", question:"Wat is phishing?", options:["E-mailfraude","Nieuwssite","Video"], answer:0},
  {type:"meerkeuze", question:"Welke bron is betrouwbaar?", options:["Blogpost","Krant","Onbekend forum"], answer:1},


  {type:"waarOnwaar", question:"Je gegevens zijn altijd veilig online", answer:false},
  {type:"waarOnwaar", question:"Het delen van persoonlijke info op sociale media kan risico's geven", answer:true},
  {type:"waarOnwaar", question:"Openbare wifi is altijd veilig", answer:false},
  {type:"waarOnwaar", question:"Een VPN kan helpen je privacy te beschermen", answer:true},
  {type:"waarOnwaar", question:"Het delen van wachtwoorden is veilig", answer:false},

  // 5 open vragen
  {type:"open", question:"Noem een manier om je gegevens te beschermen", answer:["versleuteling","encryptie"]},
  {type:"open", question:"Wat kun je doen om je privacy te verbeteren?", answer:["instellingen aanpassen","privacy instellingen"]},
  {type:"open", question:"Waarom is het belangrijk om je wachtwoorden niet te delen?", answer:["veiligheid","bescherming"]},
  {type:"open", question:"Wat is het risico van teveel persoonlijke info online?", answer:["misbruik","identiteitsdiefstal"]},
  {type:"open", question:"Noem een manier om te controleren of een link veilig is", answer:["checken","controle","inspecteren"]}
];

let current = 0;
let score = 0;
const container = document.getElementById("quiz-container");

function clean(str){ return str.toLowerCase().replace(/[^a-z0-9]/g,""); }

function showQuestion(){
  const q = questions[current];
  let html = `<div class="question"><h3>Vraag ${current+1}: ${q.question}</h3>`;
  if(q.type==="meerkeuze") q.options.forEach((opt,i)=>{html+=`<div><input type="radio" name="answer" value="${i}"> ${opt}</div>`});
  else if(q.type==="waarOnwaar") html+=`<div><input type="radio" name="answer" value="true"> Waar</div><div><input type="radio" name="answer" value="false"> Onwaar</div>`;
  else if(q.type==="open") html+=`<input type="text" id="open-answer" placeholder="Typ je antwoord hier">`;
  html+=`<button onclick="next()">Volgende</button></div>`;
  container.innerHTML=html;
}

function next(){
  const q = questions[current];
  let correct=false;
  
  if(q.type==="open"){
    const ans = document.getElementById("open-answer").value.trim();
    if(ans===""){ alert("Vul een antwoord in!"); return; }
    correct = q.answer.some(a=>clean(ans)===clean(a));
  } else {
    const selected = document.querySelector('input[name="answer"]:checked');
    if(!selected){ alert("Kies een antwoord!"); return; }
    const val = q.type==="meerkeuze"? parseInt(selected.value) : selected.value==="true";
    correct = val===q.answer;
  }
  
  if(correct) score++;
  current++;
  if(current<questions.length) showQuestion();
  else container.innerHTML=`<div class="score-block"><h2>Eindscore: ${score} van ${questions.length}</h2><p>Goed gedaan, ${playerName}!</p><button onclick="window.location.href='index.html'">Terug naar startpagina</button></div>`;
}

showQuestion();