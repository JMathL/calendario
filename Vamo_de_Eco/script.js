const daysContainer = document.getElementById('dias');
const monthYear = document.getElementById('mes-ano');
const prevBtn = document.getElementById('antes');
const nextBtn = document.getElementById('prox');

let date = new Date();

function saveCheckedDates() {
  const checked = Array.from(document.querySelectorAll(".day-container input[type='checkbox']"))
    .filter(cb => cb.checked)
    .map(cb => cb.value);
  localStorage.setItem("checkedDates", JSON.stringify(checked));
}

function loadCheckedDates() {
  return JSON.parse(localStorage.getItem("checkedDates") || "[]");
}

function renderCalendar() {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const prevLastDate = new Date(year, month, 0).getDate();

  daysContainer.innerHTML = "";
  monthYear.textContent = date.toLocaleString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  const savedChecked = loadCheckedDates();

  for (let i = firstDay; i > 0; i--) {
    const day = document.createElement("div");
    day.classList.add("prev-date");
    day.textContent = prevLastDate - i + 1;
    day.style.opacity = 0.3;
    daysContainer.appendChild(day);
  }

  for (let i = 1; i <= lastDate; i++) {
    const fullDate = new Date(year, month, i);
    const fullDateStr = fullDate.toISOString().split("T")[0];

    const dayContainer = document.createElement("div");
    dayContainer.classList.add("day-container");

    const dayLabel = document.createElement("div");
    dayLabel.textContent = i;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = fullDateStr;

    if (savedChecked.includes(fullDateStr)) {
      checkbox.checked = true;
    }

    checkbox.addEventListener("change", saveCheckedDates);

    const today = new Date();
    if (
      i === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      dayLabel.classList.add("today");
    }

    dayContainer.appendChild(dayLabel);
    dayContainer.appendChild(checkbox);
    daysContainer.appendChild(dayContainer);
  }
}


  function showDateDifference() {
  const targetDate = new Date(2025, 6, 17); 
  const today = new Date();

  
  targetDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffMs = targetDate - today;
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  const diffElement = document.getElementById("data-diff");

  if (diffDays > 0) {
    diffElement.textContent = `Faltam ${diffDays} dias para 17 de julho de 2025.`;
  } else if (diffDays < 0) {
    diffElement.textContent = `Já se passaram ${Math.abs(diffDays)} dias desde 17 de julho de 2025.`;
  } else {
    diffElement.textContent = `Hoje é dia 17 de julho de 2025!`;
  }
}


prevBtn.addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

nextBtn.addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

document.getElementById("check-unmarked").addEventListener("click", () => {
  const checkboxes = document.querySelectorAll(".day-container input[type='checkbox']");
  const unmarked = [];

  const cutoff = new Date(2025, 6, 17);

  checkboxes.forEach((cb) => {
    const cbDate = new Date(cb.value);
    if (cbDate > cutoff && !cb.checked) {
      const formatted = cbDate.toLocaleDateString("pt-BR");
      unmarked.push(formatted);
    }
  });

  if (unmarked.length > 0) {
    alert("Dias após 17/07/2025 que NÃO foram marcados:\n\n" + unmarked.join("\n"));
  } else {
    alert("Todos os dias após 17/07/2025 foram marcados!");
  }
});

renderCalendar();
showDateDifference();