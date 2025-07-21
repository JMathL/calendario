const daysContainer = document.getElementById('dias');
const monthYear = document.getElementById('mes-ano');
const prevBtn = document.getElementById('antes');
const nextBtn = document.getElementById('prox');

let date = new Date();

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
  
  for (let i = firstDay; i > 0; i--) {
    const day = document.createElement("div");
    day.classList.add("prox-data");
    day.textContent = prevLastDate - i + 1;
    day.style.opacity = 0.3;
    daysContainer.appendChild(day);
  }

  
  for (let i = 1; i <= lastDate; i++) {
    const day = document.createElement("div");
    const today = new Date();
    if (
      i === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      day.classList.add("hoje");
    }
    day.textContent = i;
    daysContainer.appendChild(day);
  }
}

  function showDateDifference() {
  const targetDate = new Date(2025, 6, 17); // Julho é mês 6 (zero-based)
  const today = new Date();

  // Zerar horas para evitar diferenças parciais
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

renderCalendar();
showDateDifference();