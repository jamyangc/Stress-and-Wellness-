/* =========================================
   PAGE NAVIGATION
========================================= */
let pageHistory = [];


window.showPage = function(id) {
  const current = document.querySelector('.page.active');
  if (current) {
    const currentId = current.id.replace('page-', '');
    pageHistory.push(currentId);
  }
   // merged logic from the deleted function
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.querySelector(`#page-${id}`);
  if (page) {
    page.classList.add('active');
  } else {
    console.error(`Page not found: page-${id}`);
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (id === 'findings') {
    setTimeout(animateCounters, 300);
  }

  const backBtn = document.getElementById('back-btn');
  if (backBtn) {
    backBtn.style.display = pageHistory.length > 0 ? 'block' : 'none';
  }
};



function goBack() {
  if (pageHistory.length === 0) return;
  const prev = pageHistory.pop();

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.querySelector(`#page-${prev}`);
  if (page) page.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });

  const backBtn = document.getElementById('back-btn');
  if (backBtn) {
    backBtn.style.display = pageHistory.length > 0 ? 'block' : 'none';
  }
}

/* =========================================
   MOOD CHECK
========================================= */
function setMood(mood) {
  const result = document.getElementById("moodResult");

  let message = "";
  let suggestion = "";
  let action = "";

  if (mood === "happy") {
    message = "You're doing great!";
    suggestion = "Keep your positive energy going.";
    action = `
      <br><br>
      <button onclick="showPage('resources')" class="pema-btn">Play a Fun Game</button>
    `;
  }

  else if (mood === "neutral") {
    message = "You're feeling okay, maybe a bit low.";
    suggestion = "A short meditation can help refresh your mind.";
    action = `
      <button onclick="showPage('resources')" class="pema-btn">Play a Fun Game</button>
    `;
  }

  else if (mood === "stressed") {
    message = "Your stress level seems high.";
    suggestion = "Take a break and try breathing exercises.";
    action = `
      <button onclick="showPage('resources')" class="pema-btn">Start Breathing</button>
      <br><br>
      <button onclick="showPage('contact')" class="pema-btn">Get Help</button>
      <br><br>
      <button onclick="showPage('resources')" class="pema-btn">Play a Fun Game</button>
    `;
  }

  else if (mood === "sad") {
    message = "You are feeling down.";
    suggestion = "You are not alone. Consider calming music or reaching out.";
    action = `
      <br><br>
      <button onclick="showPage('resources')" class="pema-btn">Play a Fun Game</button>
    `;
  }

  result.innerHTML = `
    <div style="background:#fff; padding:20px; border-radius:12px; max-width:500px; margin:auto;">
      <h3>${message}</h3>
      <p>${suggestion}</p>
      <div style="margin-top:15px;">${action}</div>
    </div>
  `;
}

/* =========================================
   DAILY VIDEO PLAYER
========================================= */
const musicVideos = [
  "ys_fN3uy7bQ", "bjZ5kIBnlZU", "9Zq79uu_o5E", "Fp5ghKduTK8",
  "zFs8CnOeAA4", "t14n8Uhq-5U", "hgUGe1cf3So", "JdqL89ZZwFw",
  "Njt1io9jakQ", "b4q1q0DawYg", "roAnTo-AJWQ", "I3OJUwILelU",
  "1ZYbU82GVz4", "FjHGZj2IjBk", "f-i_nJLG2Is", "tKM3w2drwWo",
];

const meditationVideos = [
  "j734gLbQFbU", "inpok4MKVLM", "ru4hdcMmlwQ",
  "ssss7V1_eyA", "zSkFFW--Ma0", "LDs7jglje_U"
];

const breathingVideos = [
  "YRPh_GaiL8s", "aXItOY0sLRY", "odADwWzHR24", "tEmt1Znux58"
];

function getOrCreateDiv(id, styles) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('div');
    el.id = id;
    Object.assign(el.style, styles);

    // Insert right after the 3 tool cards, before the fun slider section
    const funSection = document.getElementById('fun-section');
    funSection.parentNode.insertBefore(el, funSection);
  }
  return el;
}

function playCategory(type) {
  let videos = [];
  let message = "";

  if (type === "music")           { videos = musicVideos;     message = "Relax with soothing music 🎵"; }
  else if (type === "meditation") { videos = meditationVideos; message = "Take a moment to meditate 🧘"; }
  else if (type === "breathing")  { videos = breathingVideos;  message = "Follow this breathing exercise 💨"; }

  const videoId = videos[Math.floor(Math.random() * videos.length)];

  const msg = getOrCreateDiv('message', {
    textAlign: 'center',
    width: '100%',
    paddingTop: '16px',
    fontSize: '1rem',
    fontWeight: '500',
    color: '#2e6b45'
  });

  const vp = getOrCreateDiv('videoPlayer', {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    paddingBottom: '16px'
  });

  msg.innerText = message;
  vp.innerHTML = `
    <iframe width="400" height="220" loading="lazy"
      src="https://www.youtube.com/embed/${videoId}"
      frameborder="0" allowfullscreen
      style="border-radius:12px; margin-top:10px; max-width:100%;">
    </iframe>
  `;
}



/* =========================================
   RESOURCES FILTER
========================================= */
function filterRes(btn, tag) {
  document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');

  const toolCards = document.querySelectorAll('#tool-cards [data-tag]');
  toolCards.forEach(card => {
    card.style.display = (tag === 'all' || card.dataset.tag === tag) ? '' : 'none';
  });

  const toolSection = document.getElementById('tool-cards');
  if (toolSection) toolSection.style.display = tag === 'fun' ? 'none' : 'flex';

  const funSection  = document.querySelector('#fun-section');
  const gameSource  = document.querySelector('.game-source');
  const showFun     = tag === 'all' || tag === 'fun';

  if (funSection) funSection.style.display = showFun ? 'flex' : 'none';
  if (gameSource) gameSource.style.display = showFun ? 'block' : 'none';

  // Remove player divs entirely when switching to fun tab
  if (tag === 'fun') {
    const msg = document.getElementById('message');
    const vp  = document.getElementById('videoPlayer');
    if (msg) msg.remove();
    if (vp)  vp.remove();
  }
}

/* =========================================
   MOBILE MENU
========================================= */
function toggleMenu() {
  document.getElementById('nav-links').classList.toggle('open');
}

function closeMenu() {
  document.getElementById('nav-links').classList.remove('open');
}

/* =========================================
   ACCORDION
========================================= */
function toggleAcc(btn) {
  const item   = btn.parentElement;
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.facc-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

/* =========================================
   BREATHING EXERCISE
========================================= */
let breathPaused  = false;
let breathInterval = null;
const breathSteps     = ["Breathe in…", "Hold…", "Breathe out…", "Rest…"];
const breathDurations = [4000, 4000, 4000, 2000];
let breathStep = 0;

function startBreath() {
  const text = document.getElementById("breathText");
  if (!text) return;

  function step() {
    if (breathPaused) return;
    text.textContent = breathSteps[breathStep];
    const duration = breathDurations[breathStep];
    breathStep = (breathStep + 1) % breathSteps.length;
    breathInterval = setTimeout(step, duration);
  }
  step();
}

function toggleBreath() {
  breathPaused = !breathPaused;
  if (!breathPaused) startBreath();
}

startBreath();

/* =========================================
   FINDINGS COUNTERS
========================================= */
function animateCounters() {
  document.querySelectorAll('.fstat-num').forEach(el => {
    const target = parseInt(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    if (isNaN(target)) return;

    let current = 0;
    const increment = Math.ceil(target / 60);
    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      el.textContent = current + suffix;
      if (current >= target) clearInterval(timer);
    }, 30);
  });
}

/* =========================================
   SELF CARE TIPS
========================================= */
let activeTip = 0;
const pills = document.querySelectorAll('.tip-pill');

if (pills.length > 0) {
  setInterval(() => {
    pills[activeTip].classList.remove('active-tip');
    activeTip = (activeTip + 1) % pills.length;
    pills[activeTip].classList.add('active-tip');
  }, 3000);
}

/* =========================================
   CHATBOT
========================================= */
let history = [];
let greetingSent = false;

const win     = document.getElementById("chat-win");
const toggle  = document.getElementById("chat-toggle");
const msgs    = document.getElementById("cmsgs");
const input   = document.getElementById("cci");
const sendBtn = document.getElementById("csb");

function buildGreeting() {
  const hour = new Date().getHours();
  let timePhrase;
  if (hour >= 5 && hour < 12)       timePhrase = "Good morning";
  else if (hour >= 12 && hour < 17) timePhrase = "Good afternoon";
  else if (hour >= 17 && hour < 21) timePhrase = "Good evening";
  else                               timePhrase = "Hey, night owl";

  const openers = [
    `${timePhrase}! 👋 How are you feeling right now?`,
    `${timePhrase}! 😊 What's on your mind today?`,
    `${timePhrase}! 🌿 Whether you're stressed, curious, or just need a moment — I'm here. How can I help?`,
    `${timePhrase}! ✨ Glad you're here. How's your day going so far?`,
  ];
  return openers[Math.floor(Math.random() * openers.length)];
}

function lockBodyScroll()   { document.body.style.overflow = 'hidden'; }
function unlockBodyScroll() { document.body.style.overflow = ''; }
function isMobile() { return window.innerWidth <= 600; }

function openChat() {
  const chatWin = document.getElementById('chat-win');
  if (!chatWin) return;

  chatWin.classList.add('open');
  if (isMobile()) lockBodyScroll();

  if (!greetingSent) {
    greetingSent = true;
    setTimeout(() => {
      showTypingIndicator();
      setTimeout(() => {
        removeTypingIndicator();
        addMsg("ai", buildGreeting() + "\n\n🇧🇹 Did you know? The PEMA is Bhutan's national mental health agency — dedicated to \"Touching People, Building Lives\". If you or someone you know needs support, you can call 1098 for mental health help, or 1010 in an emergency. For resources, services, and more, visit thepema.gov.bt 💙 You're never alone in this.");
        renderQuickReplies();
      }, 900);
    }, 400);
  }

  if (!isMobile()) {
    chatWin.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }
}

toggle.onclick = () => {
  const isOpen = win.classList.contains('open');
  if (isOpen) { win.classList.remove('open'); unlockBodyScroll(); }
  else { openChat(); }
};

document.getElementById("chx").onclick = () => {
  win.classList.remove("open");
  unlockBodyScroll();
};

window.addEventListener("resize", () => {
  if (!isMobile()) unlockBodyScroll();
});

/* =========================================
   QUICK REPLIES
========================================= */
const quickReplyPools = {
  initial: [
    "I'm feeling stressed 😓",
    "Help me relax 🌿",
    "I need motivation 💪",
    "I'm feeling anxious 😰",
  ],
  followUp: [
    ["Tell me a calming tip 🧘", "I can't focus today", "I feel overwhelmed"],
    ["What's a quick breathing exercise?", "Help me journal my thoughts 📓", "I need a distraction"],
    ["I'm having trouble sleeping 😴", "I feel lonely", "Give me a positivity boost ☀️"],
    ["I'm burnt out from work", "How do I talk to someone I trust?", "Remind me to take breaks ⏰"],
    ["I feel like I'm not enough", "I need to vent", "What should I do when I'm sad?"],
    ["How do I manage my anger?", "Help me set boundaries", "I want to practice gratitude 🙏"],
    ["I'm nervous about something", "I need a mindfulness moment", "Cheer me up! 🎉"],
  ],
};

let followUpIndex = 0;

function renderQuickReplies(pool = 'initial') {
  const container = document.getElementById("chat-quick-replies");
  if (!container) return;

  let prompts;
  if (pool === 'initial') {
    prompts = quickReplyPools.initial;
  } else {
    prompts = quickReplyPools.followUp[followUpIndex % quickReplyPools.followUp.length];
    followUpIndex++;
  }

  container.innerHTML = prompts
    .map(p => `<button class="cqr-btn" onclick="csq(this)">${p}</button>`)
    .join('');

  container.querySelectorAll('.cqr-btn').forEach((btn, i) => {
    btn.style.animationDelay = `${i * 60}ms`;
    btn.classList.add('cqr-slide-in');
  });
}

function csq(btn) {
  const container = document.getElementById("chat-quick-replies");
  if (container) container.innerHTML = '';
  send(btn.innerText);
}

/* =========================================
   SEND
========================================= */
function handleSend() {
  const value = input.value.trim();
  if (!value) return;
  send(value);
  input.value = "";
}

sendBtn.onclick = () => handleSend();

input.addEventListener("keypress", function(e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleSend();
  }
});

function showTypingIndicator() {
  const div = document.createElement("div");
  div.className = "cmsg";
  div.id = "typing-indicator";
  div.innerHTML = `<div class="cmb typing-indicator"><span></span><span></span><span></span></div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function removeTypingIndicator() {
  const indicator = document.getElementById("typing-indicator");
  if (indicator) indicator.remove();
}

async function send(text) {
  if (!text || text.trim() === "") return;

  const qrContainer = document.getElementById("chat-quick-replies");
  if (qrContainer) qrContainer.innerHTML = '';

  addMsg("user", text);
  history.push({ role: "user", content: text });
  if (history.length > 12) history = history.slice(-12);

  showTypingIndicator();
  sendBtn.disabled = true;
  sendBtn.innerText = "Sending...";

  try {
    const res = await fetch("https://stress-and-wellbeing.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: `You are a warm and supportive wellbeing companion for interns and anyone feeling stressed or overwhelmed. Keep responses concise, empathetic, and encouraging.

When relevant, naturally recommend these pages on the Pema website:
- Feeling stressed or overwhelmed → suggest the Resources page (breathing, meditation, music)
- Needs professional support → suggest the Contact page
- Wants to learn about wellbeing data → suggest the Findings page
- Needs a distraction or fun activity → suggest the Resources page (games section)
- Checking in on mood → suggest the Mood Check page

Mention these as gentle suggestions, not commands. Never suggest all pages at once; only recommend what fits the moment.`
          },
          ...history
        ]
      })
    });

    const data = await res.json();
    removeTypingIndicator();

    const reply = data?.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";

    history.push({ role: "assistant", content: reply });
    addMsg("ai", reply);
    addMsg("ai", "📅 Want to track how you're feeling today? Open your mood calendar →", "calendar.html");

    setTimeout(() => renderQuickReplies('followUp'), 400);

  } catch (err) {
    console.error(err);
    removeTypingIndicator();
    addMsg("ai", "Sorry, something went wrong. Please try again.");
  } finally {
    sendBtn.disabled = false;
    sendBtn.innerText = "Send";
  }
}

function addMsg(role, text, link = null) {
  const div = document.createElement("div");
  div.className = "cmsg " + (role === "user" ? "user" : "");

  const bubble = document.createElement("div");
  bubble.className = "cmb";

  if (link) {
    bubble.innerHTML = `${text} <a href="${link}" target="_blank" style="color:#2e6b45; font-weight:600; display:block; margin-top:6px;">Open Calendar 📅</a>`;
  } else {
    bubble.textContent = text;
  }

  div.appendChild(bubble);
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

/* =========================================
   TABLEAU
========================================= */
function openTableau() {
  document.getElementById('tableau-fullscreen').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeTableau() {
  document.getElementById('tableau-fullscreen').style.display = 'none';
  document.body.style.overflow = '';
}

/* =========================================
   FUN SLIDER BUTTONS
========================================= */
window.addEventListener("DOMContentLoaded", () => {
  const funSlider = document.querySelector(".fun-slider");
  const nextFun   = document.querySelector(".next-fun");
  const prevFun   = document.querySelector(".prev-fun");

  if (nextFun && funSlider) {
    nextFun.addEventListener("click", () => {
      funSlider.scrollBy({ left: 260, behavior: "smooth" });
    });
  }

  if (prevFun && funSlider) {
    prevFun.addEventListener("click", () => {
      funSlider.scrollBy({ left: -260, behavior: "smooth" });
    });
  }
});


/* =========================================
   CHATBOT CSS INJECTION
========================================= */
(function injectChatStyles() {
  const style = document.createElement("style");
  style.textContent = `
    #chat-quick-replies {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      padding: 6px 10px 4px;
      min-height: 0;
      transition: min-height 0.2s ease;
    }

    .cqr-btn {
      background: #f0f7ff;
      color: #2a6db5;
      border: 1.5px solid #b8d8f8;
      border-radius: 20px;
      padding: 5px 13px;
      font-size: 0.78rem;
      cursor: pointer;
      white-space: nowrap;
      opacity: 0;
      transform: translateY(6px);
      transition: background 0.18s, border-color 0.18s, transform 0.15s;
    }

    .cqr-btn:hover {
      background: #d6ecff;
      border-color: #80bef5;
    }

    @keyframes cqrSlideIn {
      to { opacity: 1; transform: translateY(0); }
    }

    .cqr-slide-in {
      animation: cqrSlideIn 0.28s ease forwards;
    }

    @media (max-width: 600px) {
      #chat-win.open {
        position: fixed !important;
        top: 0 !important; left: 0 !important;
        right: 0 !important; bottom: 0 !important;
        width: 100% !important; height: 100% !important;
        max-height: 100dvh !important;
        border-radius: 0 !important;
        z-index: 9999 !important;
        flex-direction: column;
        display: flex;
      }

      #cmsgs {
        flex: 1 1 auto;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
      }

      #chat-input-bar {
        flex-shrink: 0;
        padding-bottom: env(safe-area-inset-bottom, 8px);
      }

      #chx { display: block !important; }
    }
  `;
  document.head.appendChild(style);
})();

/* =========================================
   INTRO TOGGLE
========================================= */
function toggleIntro() {
  const full = document.getElementById("introFull");
  const btn  = document.getElementById("readMoreBtn");
  const isOpen = full.style.display === "block";
  full.style.display = isOpen ? "none" : "block";
  btn.textContent    = isOpen ? "Read More ↓" : "Read Less ↑";
}