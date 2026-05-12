const state = {
  selectedFile: null,
  encryptedBlob: null,
};

const themeToggle = document.getElementById('themeToggle');
const passwordInput = document.getElementById('passwordInput');
const passwordMeter = document.getElementById('passwordMeter');
const scoreValue = document.getElementById('scoreValue');
const crackTime = document.getElementById('crackTime');
const recommendation = document.getElementById('recommendation');
const circleScoreText = document.getElementById('circleScoreText');
const circleScore = document.getElementById('circleScore');
const suggestionsList = document.getElementById('suggestionsList');
const uploadZone = document.getElementById('uploadZone');
const uploadInput = document.getElementById('uploadInput');
const encryptBtn = document.getElementById('encryptBtn');
const decryptBtn = document.getElementById('decryptBtn');
const downloadBtn = document.getElementById('downloadBtn');
const encryptionOutput = document.getElementById('encryptionOutput');
const assistantInput = document.getElementById('assistantInput');
const assistantSend = document.getElementById('assistantSend');
const assistantMessages = document.getElementById('assistantMessages');
const revealPassword = document.getElementById('revealPassword');

function setTheme(mode) {
  if (mode === 'light') {
    document.body.classList.add('light-mode');
  } else {
    document.body.classList.remove('light-mode');
  }
  localStorage.setItem('cyberTheme', mode);
}

function toggleTheme() {
  const next = document.body.classList.contains('light-mode') ? 'dark' : 'light';
  setTheme(next);
}

themeToggle.addEventListener('click', toggleTheme);

const savedTheme = localStorage.getItem('cyberTheme') || 'dark';
setTheme(savedTheme);

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function computePasswordAnalysis(value) {
  const score = clamp(
    Math.round(
      Math.min(100, value.length * 4 +
      (/[A-Z]/.test(value) ? 12 : 0) +
      (/[a-z]/.test(value) ? 12 : 0) +
      (/\d/.test(value) ? 16 : 0) +
      (/[^A-Za-z0-9]/.test(value) ? 20 : 0))
    ),
    0,
    100
  );

  const suggestions = [];
  if (value.length < 12) suggestions.push('Lengthen the password to 12+ characters.');
  if (!/[A-Z]/.test(value)) suggestions.push('Add uppercase letters.');
  if (!/[a-z]/.test(value)) suggestions.push('Add lowercase letters.');
  if (!/\d/.test(value)) suggestions.push('Include numbers.');
  if (!/[^A-Za-z0-9]/.test(value)) suggestions.push('Use special symbols like @!#$.');

  let time;
  if (score < 30) time = 'Instant';
  else if (score < 55) time = 'Minutes';
  else if (score < 75) time = 'Hours';
  else if (score < 90) time = 'Days';
  else time = 'Years';

  return { score, suggestions, time };
}

function updatePasswordUI(value) {
  const analysis = computePasswordAnalysis(value);
  scoreValue.textContent = analysis.score;
  crackTime.textContent = analysis.time;
  recommendation.textContent = analysis.suggestions[0] || 'Strong password configuration.';
  passwordMeter.style.width = `${analysis.score}%`;
  circleScoreText.textContent = analysis.score;
  circleScore.style.background = `conic-gradient(var(--primary) 0%, var(--primary) ${analysis.score}%, rgba(255,255,255,0.08) ${analysis.score}% 100%)`;

  suggestionsList.innerHTML = analysis.suggestions
    .slice(0, 4)
    .map((item) => `<li>${item}</li>`)
    .join('');
}

passwordInput.addEventListener('input', (event) => {
  updatePasswordUI(event.target.value);
});

revealPassword.addEventListener('click', () => {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    revealPassword.textContent = 'Hide';
  } else {
    passwordInput.type = 'password';
    revealPassword.textContent = 'Show';
  }
});

function showAssistantMessage(message, role = 'assistant') {
  const wrapper = document.createElement('div');
  wrapper.className = `message ${role}`;
  wrapper.textContent = message;
  assistantMessages.appendChild(wrapper);
  assistantMessages.scrollTop = assistantMessages.scrollHeight;
}

assistantSend.addEventListener('click', () => {
  const text = assistantInput.value.trim();
  if (!text) return;
  showAssistantMessage(text, 'user');
  assistantInput.value = '';
  setTimeout(() => {
    const response = generateAssistantResponse(text);
    showAssistantMessage(response, 'assistant');
  }, 700);
});

function generateAssistantResponse(text) {
  const lower = text.toLowerCase();
  if (lower.includes('password')) return 'Use a password longer than 12 characters with mixed case, digits, and symbols. Avoid repeated patterns.';
  if (lower.includes('threat')) return 'Current threat intelligence shows elevated phishing and ransomware activity in the APAC region. Increase endpoint isolation now.';
  if (lower.includes('encrypt')) return 'Files are safest when encrypted with a strong passphrase. Use the tool and download the encrypted payload immediately.';
  if (lower.includes('url')) return 'I recommend checking the URL with the safety scanner before any click. Suspicious domains should be blocked.';
  return 'I recommend reviewing multi-factor authentication, endpoint patching, and AI detection tuning to reduce risk exposure.';
}

['Show latest alerts', 'Scan URL', 'Evaluate password'].forEach((label) => {
  const pill = document.createElement('button');
  pill.className = 'pill-chip';
  pill.textContent = label;
  pill.addEventListener('click', () => {
    assistantInput.value = label.replace('Show ', '').replace('Evaluate ', '').toLowerCase();
    assistantSend.click();
  });
  document.querySelector('.suggestions-row').appendChild(pill);
});

uploadZone.addEventListener('dragover', (event) => {
  event.preventDefault();
  uploadZone.style.borderColor = 'rgba(0, 255, 198, 0.8)';
});

uploadZone.addEventListener('dragleave', () => {
  uploadZone.style.borderColor = 'rgba(0, 229, 255, 0.25)';
});

uploadInput.addEventListener('change', (event) => {
  state.selectedFile = event.target.files[0];
  if (state.selectedFile) {
    encryptionOutput.textContent = `Ready: ${state.selectedFile.name} (${Math.round(state.selectedFile.size / 1024)} KB)`;
  }
});

function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

async function encryptFile() {
  if (!state.selectedFile) {
    encryptionOutput.textContent = 'Choose a file first to encrypt.';
    return;
  }
  const content = await readFileAsText(state.selectedFile);
  const response = await fetch('/encrypt', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: content }),
  });
  const data = await response.json();
  state.encryptedBlob = new Blob([data.encrypted], { type: 'text/plain' });
  encryptionOutput.textContent = `Encrypted ${state.selectedFile.name} successfully.`;
}

async function decryptFile() {
  if (!state.selectedFile) {
    encryptionOutput.textContent = 'Choose an encrypted file first.';
    return;
  }
  const content = await readFileAsText(state.selectedFile);
  const response = await fetch('/decrypt', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ encrypted: content }),
  });
  const data = await response.json();
  encryptionOutput.textContent = data.decrypted || 'Unable to decrypt the file.';
}

encryptBtn.addEventListener('click', encryptFile);
decryptBtn.addEventListener('click', decryptFile);

downloadBtn.addEventListener('click', () => {
  if (!state.encryptedBlob) {
    encryptionOutput.textContent = 'No encrypted file available to download.';
    return;
  }
  const url = URL.createObjectURL(state.encryptedBlob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'cyberdefender-encrypted.txt';
  anchor.click();
  URL.revokeObjectURL(url);
});

function initializeCharts() {
  const lineCtx = document.getElementById('lineChart').getContext('2d');
  const lineData = {
    labels: [],
    datasets: [{
      label: 'Threat Events',
      data: [],
      borderColor: 'rgba(0, 229, 255, 0.92)',
      backgroundColor: 'rgba(0, 229, 255, 0.18)',
      fill: true,
      tension: 0.4,
      pointRadius: 0,
    }],
  };
  const lineChart = new Chart(lineCtx, {
    type: 'line',
    data: lineData,
    options: {
      responsive: true,
      animation: { duration: 0 },
      plugins: { legend: { display: false } },
      scales: {
        x: { display: false },
        y: { grid: { color: 'rgba(255,255,255,0.08)' }, ticks: { color: '#afc9ff' } },
      },
    },
  });

  const pieCtx = document.getElementById('pieChart').getContext('2d');
  const pieChart = new Chart(pieCtx, {
    type: 'doughnut',
    data: {
      labels: ['Critical', 'High', 'Medium', 'Low'],
      datasets: [{
        data: [26, 34, 22, 18],
        backgroundColor: ['#ff3d81', '#7b61ff', '#00c7ff', '#49ffb8'],
      }],
    },
    options: {
      responsive: true,
      animation: { animateRotate: true, animateScale: true },
      plugins: { legend: { position: 'bottom', labels: { color: '#a5b8ff' } } },
    },
  });

  // Live updates
  setInterval(() => {
    const now = new Date();
    const time = now.toLocaleTimeString();
    lineData.labels.push(time);
    lineData.datasets[0].data.push(Math.floor(Math.random() * 50) + 100);
    if (lineData.labels.length > 20) {
      lineData.labels.shift();
      lineData.datasets[0].data.shift();
    }
    lineChart.update();
  }, 1000);

  setInterval(() => {
    pieChart.data.datasets[0].data = pieChart.data.datasets[0].data.map(() => Math.floor(Math.random() * 50) + 10);
    pieChart.update();
  }, 5000);
}

function updateLiveMetrics() {
  const attacksPerSec = document.getElementById('attacksPerSec');
  const blockedRequests = document.getElementById('blockedRequests');
  const activeSessions = document.getElementById('activeSessions');
  const aiDetections = document.getElementById('aiDetections');
  const globalAttacks = document.getElementById('globalAttacks');
  const blockedPercent = document.getElementById('blockedPercent');
  const criticalAlerts = document.getElementById('criticalAlerts');

  setInterval(() => {
    attacksPerSec.textContent = Math.floor(Math.random() * 50) + 100;
    blockedRequests.textContent = (parseInt(blockedRequests.textContent.replace(/,/g, '')) + Math.floor(Math.random() * 100)).toLocaleString();
    activeSessions.textContent = Math.floor(Math.random() * 100) + 1200;
    aiDetections.textContent = Math.floor(Math.random() * 10) + 50;
    globalAttacks.textContent = (parseInt(globalAttacks.textContent.replace(/,/g, '')) + Math.floor(Math.random() * 10)).toLocaleString();
    criticalAlerts.textContent = Math.floor(Math.random() * 5) + 15;
  }, 2000);
}

function updateHealthBars() {
  const cpuBar = document.getElementById('cpuBar');
  const firewallBar = document.getElementById('firewallBar');
  const encryptionBar = document.getElementById('encryptionBar');
  const networkBar = document.getElementById('networkBar');
  const cpuValue = document.getElementById('cpuValue');
  const firewallValue = document.getElementById('firewallValue');
  const encryptionValue = document.getElementById('encryptionValue');
  const networkValue = document.getElementById('networkValue');

  setInterval(() => {
    const cpu = Math.floor(Math.random() * 30) + 40;
    const firewall = Math.floor(Math.random() * 10) + 85;
    const encryption = Math.floor(Math.random() * 5) + 95;
    const network = Math.floor(Math.random() * 40) + 50;

    cpuBar.style.width = `${cpu}%`;
    firewallBar.style.width = `${firewall}%`;
    encryptionBar.style.width = `${encryption}%`;
    networkBar.style.width = `${network}%`;

    cpuValue.textContent = `${cpu}%`;
    firewallValue.textContent = `${firewall}%`;
    encryptionValue.textContent = `${encryption}%`;
    networkValue.textContent = `${network}%`;
  }, 3000);
}

function simulateAttacks() {
  const attackLabels = document.getElementById('attackLabels');
  const threatFeed = document.getElementById('threatFeed');
  const packetStream = document.getElementById('packetStream');

  const attackTypes = ['DDoS attack detected', 'Ransomware activity', 'Botnet communication', 'Phishing campaign'];
  const regions = ['Asia', 'EU', 'US', 'Africa'];

  setInterval(() => {
    const label = document.createElement('div');
    label.className = 'attack-label';
    label.textContent = attackTypes[Math.floor(Math.random() * attackTypes.length)] + ' - ' + regions[Math.floor(Math.random() * regions.length)];
    attackLabels.appendChild(label);
    setTimeout(() => attackLabels.removeChild(label), 3000);
  }, 5000);

  setInterval(() => {
    const feedItem = document.createElement('div');
    feedItem.className = 'feed-item';
    feedItem.innerHTML = `<span class="badge danger"></span> ${attackTypes[Math.floor(Math.random() * attackTypes.length)]} - ${regions[Math.floor(Math.random() * regions.length)]}`;
    threatFeed.insertBefore(feedItem, threatFeed.firstChild);
    if (threatFeed.children.length > 4) threatFeed.removeChild(threatFeed.lastChild);
  }, 3000);

  setInterval(() => {
    const packet = document.createElement('div');
    packet.className = 'packet';
    packet.textContent = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)} → ${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    packetStream.insertBefore(packet, packetStream.firstChild);
    if (packetStream.children.length > 3) packetStream.removeChild(packetStream.lastChild);
  }, 1000);
}

function updateEventTable() {
  const eventTableBody = document.getElementById('eventTableBody');
  const threatTypes = ['Phishing', 'Malware', 'DDoS', 'Brute Force'];
  const severities = ['High', 'Critical', 'Medium'];
  const statuses = ['Blocked', 'Quarantined', 'Mitigated'];

  setInterval(() => {
    const row = document.createElement('div');
    row.className = 'table-row';
    const time = new Date().toLocaleTimeString();
    const threat = threatTypes[Math.floor(Math.random() * threatTypes.length)];
    const ip = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    const severity = severities[Math.floor(Math.random() * severities.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    row.innerHTML = `<span>${time}</span><span>${threat}</span><span>${ip}</span><span class="severity ${severity.toLowerCase()}">${severity}</span><span class="status ${status.toLowerCase()}">${status}</span>`;
    eventTableBody.insertBefore(row, eventTableBody.firstChild);
    if (eventTableBody.children.length > 5) eventTableBody.removeChild(eventTableBody.lastChild);
  }, 4000);
}

function initializeAnimations() {
  gsap.from('.topbar', { y: -20, opacity: 0, duration: 1, ease: 'power3.out' });
  gsap.from('.hero-copy h1', { y: 40, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.2 });
  gsap.from('.hero-copy p', { y: 40, opacity: 0, duration: 1.2, delay: 0.3 });
  gsap.from('.hero-actions .btn', { y: 24, opacity: 0, duration: 1, delay: 0.4, stagger: 0.12 });
  gsap.utils.toArray('.glass-card').forEach((card, index) => {
    gsap.from(card, { y: 24, opacity: 0, duration: 1.1, delay: 0.35 + index * 0.06, ease: 'power2.out' });
  });
}

function init() {
  initializeCharts();
  initializeAnimations();
  updatePasswordUI('');
  updateLiveMetrics();
  updateHealthBars();
  simulateAttacks();
  updateEventTable();
}

window.addEventListener('DOMContentLoaded', init);
