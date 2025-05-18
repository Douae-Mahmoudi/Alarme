const alarmList = [];
const alarmSound = document.getElementById("alarmSound");
const alarmListElement = document.getElementById("alarmList");

// Affichage de l'heure en temps réel
function updateClock() {
  const now = new Date();
  const clock = document.getElementById("clock");
  clock.textContent = now.toLocaleTimeString();
  checkAlarms(now);
}
setInterval(updateClock, 1000);

function addAlarm() {
  const alarmInput = document.getElementById("alarmInput");
  const time = alarmInput.value;

  if (!time || alarmList.includes(time)) return;

  alarmList.push(time);
  displayAlarms();
  alarmInput.value = '';
}

// Affichage des alarmes
function displayAlarms() {
  alarmListElement.innerHTML = '';
  alarmList.forEach((time, index) => {
    const li = document.createElement('li');
    li.textContent = `🔔 ${time}`;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Supprimer";
    deleteBtn.onclick = () => removeAlarm(index);
    li.appendChild(deleteBtn);
    alarmListElement.appendChild(li);
  });
}

// Supprimer une alarme
function removeAlarm(index) {
  alarmList.splice(index, 1);
  displayAlarms();
}

// Vérifier les alarmes toutes les secondes
function checkAlarms(now) {
  const currentTime = now.toTimeString().slice(0, 5); // HH:MM
  alarmList.forEach((time, index) => {
    if (time === currentTime) {
      alarmSound.play();
      alert(` Il est ${time} !`);
      removeAlarm(index);
    }
  });
}
