const playerName = localStorage.getItem("playerName") || "Speler";
if(!playerName){
    alert("Vul eerst je naam in op de startpagina!");
    window.location.href = "index.html";
}

const questions = [
  // 5 meerkeuze
  {type:"meerkeuze", question:"Hoe beïnvloedt social media ons gedrag?", options:["Geen effect","Verandering van mening","Altijd positief"], answer:1},
  {type:"meerkeuze", question:"Wat kan leiden tot verslaving aan social media?", options:["Tijdslimiet","Constante notificaties","Geen notificaties"], answer:1},
  {type:"meerkeuze", question:"Wat helpt om social media gezond te gebruiken?", options:["Continu scrollen","Pauzes nemen","Alles geloven"], answer:1},
  {type:"meerkeuze", question:"Wat is een echo chamber?", options:["Een muziekkamer","Een omgeving met alleen dezelfde meningen","Een nieuwstype"], answer:1},
  {type:"meerkeuze", question:"Welke actie kan social media stress verminderen?", options:["Continu scrollen","Minder vergelijken","Alles geloven"], answer:1},

  // 5 waar/onwaar
  {type:"waarOnwaar", question:"Likes kunnen je stemming beïnvloeden", answer:true},
  {type:"waarOnwaar", question:"We worden nooit beïnvloed door online advertenties", answer:false},
  {type:"waarOnwaar", question:"Het vergelijken van jezelf met anderen online kan stress veroorzaken", answer:true},
  {type:"waarOnwaar", question:"Commentaar op social media beïnvloedt niemand", answer:false},
  {type:"waarOnwaar", question:"Bewust omgaan met social media kan positief zijn", answer:true},

  // 5 open vragen
  {type:"open", question:"Noem een manier om je tijd op social media te beperken", answer:["pauze","tijdslimiet","offline gaan"]},
  {type:"open", question:"Wat kun je doen om nep-informatie op social media te vermijden?", answer:["checken","verifiëren","controleren"]},
  {type:"open", question:"Waarom is bewust omgaan met social media belangrijk?", answer:["mentale gezondheid","gezondheid","stress verminderen"]},
  {type:"open", question:"Noem een effect van social media op gedrag", answer:["invloed","verandering","stimulans"]},
  {type:"open", question:"Wat helpt tegen online verslaving?", answer:["pauzes","limiet","tijdslimiet"]}
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