const playerName = localStorage.getItem("playerName") || "Speler";
if(!playerName){
    alert("Vul eerst je naam in op de startpagina!");
    window.location.href = "index.html";
}

const questions = [

  {type:"meerkeuze", question:"Wat is nepnieuws?", options:["Feitelijk nieuws","Verzonnen nieuws","Nieuws van gisteren"], answer:1},
  {type:"meerkeuze", question:"Wat kan helpen nepnieuws te herkennen?", options:["Bron controleren","Alles geloven","Snelle reactie"], answer:0},
  {type:"meerkeuze", question:"Een betrouwbare bron is:", options:["Satire site","Bekende krant","Instagram post"], answer:1},
  {type:"meerkeuze", question:"Wat is een virale nepvideo?", options:["Video die viraal gaat","Video van de krant","Documentaire"], answer:0},
  {type:"meerkeuze", question:"Welke bron is meestal betrouwbaar?", options:["Blogpost","Krant","Onbekend forum"], answer:1},


  {type:"waarOnwaar", question:"Nepnieuws is altijd bedoeld om mensen te misleiden", answer:true},
  {type:"waarOnwaar", question:"Alle nieuwswebsites zijn betrouwbaar", answer:false},
  {type:"waarOnwaar", question:"Foto's kunnen ook nep zijn", answer:true},
  {type:"waarOnwaar", question:"Nieuws delen zonder te controleren kan gevaarlijk zijn", answer:true},
  {type:"waarOnwaar", question:"Satire nieuws is hetzelfde als nepnieuws", answer:false},

 
  {type:"open", question:"Noem een manier om feiten te checken", answer:["factcheck","fact check","controle"]},
  {type:"open", question:"Wie kan nepnieuws verspreiden?", answer:["iedereen"]},
  {type:"open", question:"Wat kun je doen als je nepnieuws ziet?", answer:["niet delen","niet verspreiden"]},
  {type:"open", question:"Waarom is nepnieuws schadelijk?", answer:["misleiding","misinformatie"]},
  {type:"open", question:"Noem een manier om nepnieuws te herkennen", answer:["bron controleren","checken","verifiëren"]}
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