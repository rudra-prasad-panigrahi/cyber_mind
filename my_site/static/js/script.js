let statsData = { encrypts: 0, decrypts: 0, scores: [] };

function toggleTheme() {
    document.body.classList.toggle("light-mode");
}

function playSound(name) {
    const s = document.getElementById("sound-" + name);
    if (s) { s.currentTime = 0; s.play().catch(()=>{}); }
}

function scrollDown() {
    document.getElementById("main-content").scrollIntoView({behavior:"smooth"});
}

function typeAnimation() {
    const textEl = document.querySelector(".typing-text");
    const text = textEl.innerText;
    textEl.innerText = "";
    let idx=0;  
    function type() {
        if(idx<text.length){
            textEl.innerText += text[idx++];
            setTimeout(type, 90);
        }
    }
    type();
}
window.onload = typeAnimation;

function updateLiveScore(text) {
    fetch("/ai_security", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ text })
    })
    .then(res=>res.json())
    .then(data=>{
        document.getElementById("liveScore").innerText = data.analysis.split("\n")[0];
    });
}

document.getElementById("inputText").addEventListener("input", (e)=>{
    updateLiveScore(e.target.value);
});

function encrypt() {
    const t=document.getElementById("inputText").value;
    if(!t)return alert("Enter text!");
    playSound("click");
    fetch("/encrypt", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ text: t })
    })
    .then(res=>res.json())
    .then(d=>{
        statsData.encrypts++;
        document.getElementById("statEncrypts").innerText = statsData.encrypts;
        document.getElementById("encryptedText").innerText = d.encrypted;
    });
}

function decrypt() {
    const t = document.getElementById("decryptInput").value;
    if(!t)return alert("Paste text!");
    playSound("click");
    fetch("/decrypt", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ encrypted: t })
    })
    .then(res=>res.json())
    .then(d=>{
        statsData.decrypts++;
        document.getElementById("statDecrypts").innerText = statsData.decrypts;
        document.getElementById("decryptedText").innerText = d.decrypted;
    });
}

function downloadEncrypted() {
    const text=document.getElementById("encryptedText").innerText;
    if(!text)return;
    const blob=new Blob([text],{type:"text/plain"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;a.download="encrypted.txt";a.click();
    URL.revokeObjectURL(url);
}

function analyzeSecurity() {
    const t=document.getElementById("aiInput").value;
    if(!t)return alert("Enter text!");
    fetch("/ai_security", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ text: t })
    })
    .then(res=>res.json())
    .then(d=>{
        document.getElementById("aiSecurityOutput").innerText=d.analysis;
        statsData.scores.push(parseInt(d.analysis.split("/")[0]));
        let avg = statsData.scores.reduce((a,b)=>a+b,0)/statsData.scores.length;
        document.getElementById("statAvgScore").innerText = avg.toFixed(1);
        updateStatsChart();
    });
}

function explainDecrypted() {
    const t=document.getElementById("decryptedText").innerText;
    if(!t)return alert("Nothing to explain!");
    fetch("/ai_explain", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ text: t })
    })
    .then(res=>res.json())
    .then(d=>document.getElementById("aiExplainOutput").innerText=d.explanation);
}

// Cybersecurity tips tooltip
const tooltip=document.getElementById("tip-tooltip");
document.querySelectorAll(".icon-circle").forEach(icon=>{
    icon.addEventListener("mousemove",function(e){
        tooltip.innerText=icon.getAttribute("data-info");
        tooltip.style.opacity=1;
        tooltip.style.left=e.pageX+10+"px";
        tooltip.style.top=e.pageY+10+"px";
    });
    icon.addEventListener("mouseout",()=>{tooltip.style.opacity=0});
    icon.addEventListener("mouseover",()=>{playSound("hover")});
});

// ambient background
document.body.addEventListener("click",function once(){ 
    document.getElementById("sound-ambient").play().catch(()=>{});
}, {once:true});

// stats chart
let statsChart;
function updateStatsChart(){
    const ctx=document.getElementById("statsChart").getContext("2d");
    const data={
        labels:["Encrypts","Decrypts"],
        datasets:[{
            label:"Usage count",
            data:[statsData.encrypts,statsData.decrypts],
            backgroundColor:["#33ccff","#ffcc00"]
        }]
    };
    if(statsChart) statsChart.destroy();
    statsChart=new Chart(ctx,{type:"bar",data});
}
