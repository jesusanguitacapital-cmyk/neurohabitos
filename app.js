const STORAGE_KEY = "neurohabitos-pro-v1";
const DAYS = [
  { key: "mon", label: "Lun" },
  { key: "tue", label: "Mar" },
  { key: "wed", label: "Mie" },
  { key: "thu", label: "Jue" },
  { key: "fri", label: "Vie" },
  { key: "sat", label: "Sab" },
  { key: "sun", label: "Dom" }
];
const COLORS = ["#0b7a75", "#1d4ed8", "#b45309", "#9d174d", "#7c3aed", "#15803d"];
const STICKERS = ["🌅", "🏋️", "📚", "🧠", "💧", "🛌", "🧘", "🔥", "🎯", "✨"];

const neuroContent = [
  {
    label: "Automaticidad",
    title: "Los habitos funcionan mejor cuando dependen menos de la motivacion.",
    body:
      "La repeticion en un contexto estable fortalece asociaciones entre señal y conducta. La app convierte eso en disparadores, horarios, version minima y recompensas inmediatas."
  },
  {
    label: "Sueño y control",
    title: "Dormir mal no solo cansa: tambien reduce atencion, regulacion emocional y autocontrol.",
    body:
      "Por eso los habitos tempranos pueden alterar la calidad del resto del dia. El sistema detecta cadenas donde el sueño y la hora de despertar afectan ejercicio, enfoque y estudio."
  },
  {
    label: "Friccion",
    title: "Si una accion exige demasiadas decisiones, el cerebro la retrasa.",
    body:
      "Reducimos friccion con planes tipo si-entonces, ventanas de cumplimiento, señal ambiental y una version minima de cada habito para evitar el abandono total."
  }
];

const sampleState = {
  habits: [
    {
      id: crypto.randomUUID(),
      name: "Despertarme a las 06:00",
      description: "Levantarme sin posponer y abrir la ventana en menos de 5 minutos.",
      category: "Sueno",
      days: ["mon", "tue", "wed", "thu", "fri"],
      time: "06:00",
      windowStart: "06:00",
      windowEnd: "06:20",
      priority: "Alta",
      difficulty: "Media",
      targetRate: 85,
      color: "#0b7a75",
      sticker: "🌅",
      motivationalNote: "Empiezo el dia antes de reaccionar al mundo.",
      reminderType: "insistente",
      reminderLead: 10,
      dependsOn: [],
      impacts: [],
      expectedBenefit: "Mas energia, menos prisa y mejor margen para entrenar.",
      missCost: "Pierdo orden mental desde el inicio del dia.",
      minimumVersion: "Sentarme en la cama y poner ambos pies en el suelo.",
      idealVersion: "Levantarse, hidratarse y abrir la ventana.",
      fallbackPlan: "Si me cuesta, dejo el movil lejos y cuento 5 segundos.",
      environmentalCue: "Alarma lejos de la cama",
      reward: "Check visual + primer vaso de agua",
      identity: "Soy una persona que lidera su mañana",
      logs: {}
    },
    {
      id: crypto.randomUUID(),
      name: "Ir al gimnasio",
      description: "Entrenamiento de fuerza breve para activar cuerpo y mente.",
      category: "Ejercicio",
      days: ["mon", "wed", "fri"],
      time: "08:00",
      windowStart: "07:45",
      windowEnd: "08:45",
      priority: "Alta",
      difficulty: "Media",
      targetRate: 80,
      color: "#1d4ed8",
      sticker: "🏋️",
      motivationalNote: "Mover el cuerpo limpia la mente.",
      reminderType: "normal",
      reminderLead: 20,
      dependsOn: [],
      impacts: [],
      expectedBenefit: "Aumento de energia, claridad y disciplina.",
      missCost: "Llego al estudio con menos activacion.",
      minimumVersion: "10 minutos de movilidad o caminata.",
      idealVersion: "Sesion completa de 45 minutos.",
      fallbackPlan: "Si no llego al gym, hago version minima en casa.",
      environmentalCue: "Mochila lista desde la noche anterior",
      reward: "Ducha + sensacion de impulso ganado",
      identity: "Soy una persona que se activa antes de exigir rendimiento",
      logs: {}
    },
    {
      id: crypto.randomUUID(),
      name: "Estudiar enfoque profundo",
      description: "Bloque de 60 minutos sin distracciones para avanzar en lo importante.",
      category: "Estudio",
      days: ["mon", "tue", "wed", "thu", "fri", "sat"],
      time: "17:00",
      windowStart: "16:45",
      windowEnd: "18:30",
      priority: "Alta",
      difficulty: "Alta",
      targetRate: 78,
      color: "#9d174d",
      sticker: "📚",
      motivationalNote: "Cada sesion deja rastro en mi futuro.",
      reminderType: "suave",
      reminderLead: 15,
      dependsOn: [],
      impacts: [],
      expectedBenefit: "Mayor avance, memoria y confianza.",
      missCost: "Acumulo deuda mental y sensacion de improvisacion.",
      minimumVersion: "10 minutos de lectura o repaso.",
      idealVersion: "Bloque de 60 minutos con movil fuera.",
      fallbackPlan: "Si estoy saturado, hago solo la version minima.",
      environmentalCue: "Mesa limpia y temporizador encendido",
      reward: "Marcar progreso y anotar una idea clave",
      identity: "Soy una persona que avanza incluso en dias imperfectos",
      logs: {}
    }
  ],
  settings: {
    userName: "Jesus",
    celebrationMode: true,
    dailyReflection: true
  }
};

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function getDayKey(date = new Date()) {
  return ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][date.getDay()];
}

function loadState() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return hydrateDependencies(structuredClone(sampleState));

  try {
    return hydrateDependencies(JSON.parse(stored));
  } catch {
    return hydrateDependencies(structuredClone(sampleState));
  }
}

function hydrateDependencies(state) {
  if (state.habits.length >= 3) {
    const [wake, gym, study] = state.habits;
    wake.impacts = wake.impacts?.length ? wake.impacts : [
      { targetId: gym.id, effect: "positive", strength: "strong", area: "energia" },
      { targetId: study.id, effect: "positive", strength: "medium", area: "disciplina" }
    ];
    gym.dependsOn = gym.dependsOn?.length ? gym.dependsOn : [
      { sourceId: wake.id, effect: "positive", strength: "strong", area: "energia" }
    ];
    gym.impacts = gym.impacts?.length ? gym.impacts : [
      { targetId: study.id, effect: "positive", strength: "strong", area: "foco" }
    ];
    study.dependsOn = study.dependsOn?.length ? study.dependsOn : [
      { sourceId: wake.id, effect: "positive", strength: "medium", area: "disciplina" },
      { sourceId: gym.id, effect: "positive", strength: "strong", area: "foco" }
    ];
  }

  return state;
}

const state = loadState();
const ui = {
  currentView: "today",
  editingId: null,
  detailId: null
};

const screenTitle = document.querySelector("#screenTitle");
const quickAddButton = document.querySelector("#quickAddButton");
const views = {
  today: document.querySelector("#view-today"),
  habits: document.querySelector("#view-habits"),
  form: document.querySelector("#view-form"),
  detail: document.querySelector("#view-detail"),
  neuro: document.querySelector("#view-neuro"),
  analysis: document.querySelector("#view-analysis"),
  settings: document.querySelector("#view-settings")
};

document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => navigate(button.dataset.view));
});
quickAddButton.addEventListener("click", () => openForm());

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function navigate(view) {
  ui.currentView = view;
  Object.entries(views).forEach(([key, node]) => node.classList.toggle("hidden", key !== view));
  document.querySelectorAll(".nav-item").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === view);
  });
  screenTitle.textContent = {
    today: "Hoy",
    habits: "Habitos",
    form: ui.editingId ? "Editar habito" : "Nuevo habito",
    detail: "Detalle",
    neuro: "Neurociencia",
    analysis: "Analisis IA",
    settings: "Ajustes"
  }[view];
  render();
}

function activeHabitsForToday() {
  const today = getDayKey();
  return state.habits.filter((habit) => habit.days.includes(today));
}

function statusForHabit(habit) {
  const log = habit.logs[todayKey()];
  if (!log) return "pendiente";
  return log.status;
}

function streakForHabit(habit) {
  const days = lastSevenDays();
  let streak = 0;
  for (const day of days.reverse()) {
    const log = habit.logs[day];
    if (log?.status === "done") {
      streak += 1;
    } else if (log) {
      break;
    } else {
      break;
    }
  }
  return streak;
}

function lastSevenDays() {
  const days = [];
  for (let index = 6; index >= 0; index -= 1) {
    const date = new Date();
    date.setDate(date.getDate() - index);
    days.push(date.toISOString().slice(0, 10));
  }
  return days;
}

function completionRate(habit) {
  const scheduledDays = lastSevenDays().filter((day) => {
    const date = new Date(day);
    return habit.days.includes(getDayKey(date));
  });
  if (!scheduledDays.length) return 0;
  const completed = scheduledDays.filter((day) => habit.logs[day]?.status === "done").length;
  return Math.round((completed / scheduledDays.length) * 100);
}

function energyScore() {
  return Math.max(
    20,
    Math.min(
      100,
      55 +
        activeHabitsForToday().reduce((score, habit) => {
          const status = statusForHabit(habit);
          if (status === "done") return score + 8;
          if (status === "missed") return score - 10;
          return score;
        }, 0)
    )
  );
}

function buildDailyInsights() {
  const habits = activeHabitsForToday();
  const insights = [];
  habits.forEach((habit) => {
    if (statusForHabit(habit) !== "missed") return;
    habit.impacts.forEach((impact) => {
      const target = state.habits.find((item) => item.id === impact.targetId);
      if (!target) return;
      insights.push({
        label: "Cadena activa",
        title: `${habit.name} esta afectando a ${target.name}`,
        body: `Cuando falla ${habit.name.toLowerCase()}, cae ${impact.area} para ${target.name.toLowerCase()}. Reduce friccion: prepara una version minima y adelanta la señal ambiental.`
      });
    });
  });

  if (!insights.length) {
    insights.push({
      label: "Estabilidad",
      title: "Tu red de hoy esta relativamente estable.",
      body:
        "Ahora mismo no hay fallos en cascada fuertes. Mantener primero los habitos gatillo suele proteger mejor el resto del dia."
    });
  }

  return insights.slice(0, 3);
}

function buildAnalysis() {
  const habits = activeHabitsForToday();
  const issues = [];

  habits.forEach((habit) => {
    const status = statusForHabit(habit);
    if (status === "missed") {
      issues.push({
        title: `${habit.name}: fallo con coste de arrastre`,
        body: `Hoy no se cumplio dentro de la ventana ${habit.windowStart}-${habit.windowEnd}. Coste esperado: ${habit.missCost}. Ajuste recomendado: ${habit.fallbackPlan}.`
      });
    }

    if (completionRate(habit) < habit.targetRate - 15) {
      issues.push({
        title: `${habit.name}: objetivo demasiado exigente`,
        body: `Tu cumplimiento real esta en ${completionRate(habit)}% frente a un objetivo de ${habit.targetRate}%. Conviene bajar dificultad, mejorar la señal ambiental o reforzar una version minima.`
      });
    }
  });

  const overloaded = habits.filter((habit) => habit.difficulty === "Alta").length >= 2;
  if (overloaded) {
    issues.push({
      title: "Carga cognitiva elevada",
      body:
        "Tienes varios habitos exigentes el mismo dia. Reparte mejor la friccion: mueve uno a otra franja o define una version minima para evitar saturacion."
    });
  }

  if (!issues.length) {
    issues.push({
      title: "Dia funcional",
      body:
        "No aparecen señales fuertes de friccion sistémica. La mejor mejora para mañana es sostener tus habitos gatillo y cerrar el dia preparando el entorno."
    });
  }

  return issues;
}

function renderTodayView() {
  const habits = activeHabitsForToday();
  const energy = energyScore();
  const done = habits.filter((habit) => statusForHabit(habit) === "done").length;

  views.today.innerHTML = `
    <section class="hero-panel">
      <p class="small">Panel diario de ${state.settings.userName}</p>
      <h2>Tu red de hoy depende de pequeños cierres bien hechos.</h2>
      <div class="hero-panel__grid">
        <div class="metric"><strong>${habits.length}</strong><span>habitos hoy</span></div>
        <div class="metric"><strong>${done}</strong><span>cumplidos</span></div>
        <div class="metric"><strong>${energy}%</strong><span>energia estimada</span></div>
      </div>
    </section>
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">Agenda de hoy</h2>
        <span class="small muted">${done}/${habits.length || 0} cerrados</span>
      </div>
      <div id="todayHabitList"></div>
    </section>
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">Alertas de cadena</h2>
      </div>
      <div id="insightList"></div>
    </section>
  `;

  const list = views.today.querySelector("#todayHabitList");
  if (!habits.length) {
    list.innerHTML = `<div class="panel empty-state"><p>No hay habitos para hoy. Crea uno para empezar.</p></div>`;
  } else {
    habits
      .sort((left, right) => left.time.localeCompare(right.time))
      .forEach((habit) => list.appendChild(renderHabitCard(habit)));
  }

  const insightList = views.today.querySelector("#insightList");
  buildDailyInsights().forEach((insight) => insightList.appendChild(renderInsightCard(insight)));
}

function renderHabitCard(habit) {
  const template = document.querySelector("#habitCardTemplate");
  const node = template.content.firstElementChild.cloneNode(true);
  const status = statusForHabit(habit);
  const badge = node.querySelector(".habit-card__badge");
  badge.style.background = habit.color;
  badge.textContent = habit.sticker;

  node.querySelector(".habit-card__name").textContent = habit.name;
  node.querySelector(".habit-card__time").textContent = `${habit.time} · ${habit.category} · ${status}`;
  node.querySelector(".habit-card__summary").textContent = habit.description;
  node.querySelector(".habit-card__stats").innerHTML = `
    <span class="pill">racha ${streakForHabit(habit)} dias</span>
    <span class="pill">objetivo ${habit.targetRate}%</span>
    <span class="pill">real ${completionRate(habit)}%</span>
  `;

  node.querySelector(".habit-card__detail-button").addEventListener("click", () => openDetail(habit.id));
  const complete = node.querySelector(".habit-card__complete");
  const skip = node.querySelector(".habit-card__skip");
  complete.disabled = status === "done";
  skip.disabled = status === "missed";
  complete.addEventListener("click", () => logHabit(habit.id, "done"));
  skip.addEventListener("click", () => logHabit(habit.id, "missed"));
  return node;
}

function renderInsightCard(insight) {
  const template = document.querySelector("#insightTemplate");
  const node = template.content.firstElementChild.cloneNode(true);
  node.querySelector(".insight-card__label").textContent = insight.label;
  node.querySelector(".insight-card__title").textContent = insight.title;
  node.querySelector(".insight-card__body").textContent = insight.body;
  return node;
}

function renderHabitsView() {
  const rows = state.habits
    .map(
      (habit) => `
        <article class="panel">
          <div class="habit-row">
            <div class="habit-card__badge" style="background:${habit.color}">${habit.sticker}</div>
            <div style="flex:1">
              <strong>${habit.name}</strong>
              <p class="muted small">${habit.category} · ${habit.days.map((day) => DAYS.find((item) => item.key === day).label).join(", ")}</p>
            </div>
            <button class="ghost-button js-detail" data-id="${habit.id}" type="button">Abrir</button>
          </div>
          <div class="legend">
            <span class="mini-stat">hora ${habit.time}</span>
            <span class="mini-stat">objetivo ${habit.targetRate}%</span>
            <span class="mini-stat">recordatorio ${habit.reminderLead} min</span>
          </div>
        </article>
      `
    )
    .join("");

  views.habits.innerHTML = `
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">Todos los habitos</h2>
        <button class="primary-button" id="createHabitFromList" type="button">Crear</button>
      </div>
      ${rows || `<div class="panel empty-state"><p>No hay habitos todavia.</p></div>`}
    </section>
  `;

  views.habits.querySelector("#createHabitFromList")?.addEventListener("click", () => openForm());
  views.habits.querySelectorAll(".js-detail").forEach((button) => {
    button.addEventListener("click", () => openDetail(button.dataset.id));
  });
}

function renderFormView() {
  const habit = state.habits.find((item) => item.id === ui.editingId);
  const selectedDays = habit?.days || [];
  const selectedColor = habit?.color || COLORS[0];
  const selectedSticker = habit?.sticker || STICKERS[0];
  const habitOptions = state.habits
    .filter((item) => item.id !== ui.editingId)
    .map((item) => `<option value="${item.id}">${item.name}</option>`)
    .join("");

  views.form.innerHTML = `
    <section class="sheet">
      <div class="section-header">
        <h2 class="section-title">${habit ? "Editar habito" : "Nuevo habito"}</h2>
        <div class="sticker-preview" style="background:${selectedColor}">${selectedSticker}</div>
      </div>
      <form id="habitEditor">
        <label><span>Nombre</span><input name="name" value="${habit?.name || ""}" required /></label>
        <label><span>Descripcion</span><textarea name="description" required>${habit?.description || ""}</textarea></label>
        <div class="dual-grid">
          <label><span>Categoria</span>
            <select name="category">
              ${["Sueno", "Ejercicio", "Estudio", "Alimentacion", "Trabajo", "Bienestar", "Espiritualidad", "Otro"]
                .map((option) => `<option value="${option}" ${habit?.category === option ? "selected" : ""}>${option}</option>`)
                .join("")}
            </select>
          </label>
          <label><span>Hora objetivo</span><input name="time" type="time" value="${habit?.time || "07:00"}" required /></label>
        </div>
        <div class="dual-grid">
          <label><span>Ventana inicio</span><input name="windowStart" type="time" value="${habit?.windowStart || "07:00"}" required /></label>
          <label><span>Ventana fin</span><input name="windowEnd" type="time" value="${habit?.windowEnd || "07:30"}" required /></label>
        </div>
        <div class="dual-grid">
          <label><span>Prioridad</span>
            <select name="priority">
              ${["Alta", "Media", "Baja"].map((option) => `<option value="${option}" ${habit?.priority === option ? "selected" : ""}>${option}</option>`).join("")}
            </select>
          </label>
          <label><span>Dificultad</span>
            <select name="difficulty">
              ${["Alta", "Media", "Baja"].map((option) => `<option value="${option}" ${habit?.difficulty === option ? "selected" : ""}>${option}</option>`).join("")}
            </select>
          </label>
        </div>
        <label><span>Porcentaje objetivo</span><input name="targetRate" type="number" min="1" max="100" value="${habit?.targetRate || 80}" required /></label>
        <label><span>Dias de la semana</span></label>
        <div class="week-selector">
          ${DAYS.map(
            (day) => `<button class="toggle-chip ${selectedDays.includes(day.key) ? "active" : ""}" data-day="${day.key}" type="button">${day.label}</button>`
          ).join("")}
        </div>
        <label><span>Color</span></label>
        <div class="color-selector">
          ${COLORS.map(
            (color) => `<button class="color-swatch ${selectedColor === color ? "active" : ""}" data-color="${color}" style="background:${color}" type="button"></button>`
          ).join("")}
        </div>
        <label><span>Sticker</span></label>
        <div class="sticker-selector">
          ${STICKERS.map(
            (sticker) => `<button class="sticker-chip ${selectedSticker === sticker ? "active" : ""}" data-sticker="${sticker}" type="button">${sticker}</button>`
          ).join("")}
        </div>
        <div class="dual-grid">
          <label><span>Tipo de recordatorio</span>
            <select name="reminderType">
              ${["suave", "normal", "insistente"]
                .map((option) => `<option value="${option}" ${habit?.reminderType === option ? "selected" : ""}>${option}</option>`)
                .join("")}
            </select>
          </label>
          <label><span>Antelacion en minutos</span><input name="reminderLead" type="number" min="0" max="180" value="${habit?.reminderLead || 10}" required /></label>
        </div>
        <label><span>Señal ambiental</span><input name="environmentalCue" value="${habit?.environmentalCue || ""}" required /></label>
        <label><span>Version minima</span><input name="minimumVersion" value="${habit?.minimumVersion || ""}" required /></label>
        <label><span>Version ideal</span><input name="idealVersion" value="${habit?.idealVersion || ""}" required /></label>
        <label><span>Recompensa inmediata</span><input name="reward" value="${habit?.reward || ""}" required /></label>
        <label><span>Identidad que refuerza</span><input name="identity" value="${habit?.identity || ""}" required /></label>
        <label><span>Beneficio esperado</span><textarea name="expectedBenefit" required>${habit?.expectedBenefit || ""}</textarea></label>
        <label><span>Coste de no cumplirlo</span><textarea name="missCost" required>${habit?.missCost || ""}</textarea></label>
        <label><span>Plan si fallo</span><textarea name="fallbackPlan" required>${habit?.fallbackPlan || ""}</textarea></label>
        <label><span>Nota motivacional</span><textarea name="motivationalNote" required>${habit?.motivationalNote || ""}</textarea></label>
        <div class="dual-grid">
          <label><span>Habito del que depende</span><select name="dependsOnId"><option value="">Ninguno</option>${habitOptions}</select></label>
          <label><span>Habito al que impacta</span><select name="impactsId"><option value="">Ninguno</option>${habitOptions}</select></label>
        </div>
        <p class="field-help">Las dependencias se usan en el analisis diario para explicar efectos en energia, foco y disciplina.</p>
        <div class="form-actions">
          <button class="primary-button" type="submit">${habit ? "Guardar cambios" : "Crear habito"}</button>
          <button class="ghost-button" id="cancelForm" type="button">Cancelar</button>
        </div>
      </form>
    </section>
  `;

  const daySet = new Set(selectedDays);
  let chosenColor = selectedColor;
  let chosenSticker = selectedSticker;
  views.form.querySelectorAll("[data-day]").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.day;
      daySet.has(key) ? daySet.delete(key) : daySet.add(key);
      button.classList.toggle("active");
    });
  });
  views.form.querySelectorAll("[data-color]").forEach((button) => {
    button.addEventListener("click", () => {
      chosenColor = button.dataset.color;
      views.form.querySelectorAll("[data-color]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
    });
  });
  views.form.querySelectorAll("[data-sticker]").forEach((button) => {
    button.addEventListener("click", () => {
      chosenSticker = button.dataset.sticker;
      views.form.querySelectorAll("[data-sticker]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
    });
  });

  views.form.querySelector("#cancelForm").addEventListener("click", () => navigate("habits"));
  views.form.querySelector("#habitEditor").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const id = habit?.id || crypto.randomUUID();
    const newHabit = {
      id,
      name: String(formData.get("name")).trim(),
      description: String(formData.get("description")).trim(),
      category: String(formData.get("category")),
      days: [...daySet].length ? [...daySet] : ["mon"],
      time: String(formData.get("time")),
      windowStart: String(formData.get("windowStart")),
      windowEnd: String(formData.get("windowEnd")),
      priority: String(formData.get("priority")),
      difficulty: String(formData.get("difficulty")),
      targetRate: Number(formData.get("targetRate")),
      color: chosenColor,
      sticker: chosenSticker,
      motivationalNote: String(formData.get("motivationalNote")).trim(),
      reminderType: String(formData.get("reminderType")),
      reminderLead: Number(formData.get("reminderLead")),
      dependsOn: [],
      impacts: [],
      expectedBenefit: String(formData.get("expectedBenefit")).trim(),
      missCost: String(formData.get("missCost")).trim(),
      minimumVersion: String(formData.get("minimumVersion")).trim(),
      idealVersion: String(formData.get("idealVersion")).trim(),
      fallbackPlan: String(formData.get("fallbackPlan")).trim(),
      environmentalCue: String(formData.get("environmentalCue")).trim(),
      reward: String(formData.get("reward")).trim(),
      identity: String(formData.get("identity")).trim(),
      logs: habit?.logs || {}
    };

    state.habits = state.habits.filter((item) => item.id !== id);
    state.habits.unshift(newHabit);

    const dependsOnId = String(formData.get("dependsOnId"));
    const impactsId = String(formData.get("impactsId"));
    if (dependsOnId) {
      newHabit.dependsOn.push({ sourceId: dependsOnId, effect: "positive", strength: "strong", area: "energia" });
      const source = state.habits.find((item) => item.id === dependsOnId);
      source?.impacts.push({ targetId: id, effect: "positive", strength: "strong", area: "energia" });
    }
    if (impactsId) {
      newHabit.impacts.push({ targetId: impactsId, effect: "positive", strength: "medium", area: "foco" });
      const target = state.habits.find((item) => item.id === impactsId);
      target?.dependsOn.push({ sourceId: id, effect: "positive", strength: "medium", area: "foco" });
    }

    saveState();
    ui.editingId = id;
    openDetail(id);
  });
}

function renderDetailView() {
  const habit = state.habits.find((item) => item.id === ui.detailId);
  if (!habit) {
    views.detail.innerHTML = `<div class="panel empty-state"><p>No se encontro el habito.</p></div>`;
    return;
  }

  const dependencyNames = habit.dependsOn
    .map((link) => state.habits.find((item) => item.id === link.sourceId)?.name)
    .filter(Boolean)
    .join(", ");
  const impactNames = habit.impacts
    .map((link) => state.habits.find((item) => item.id === link.targetId)?.name)
    .filter(Boolean)
    .join(", ");

  views.detail.innerHTML = `
    <section class="sheet">
      <div class="detail-head">
        <div class="habit-card__badge" style="background:${habit.color}">${habit.sticker}</div>
        <div>
          <h2 class="section-title">${habit.name}</h2>
          <p class="muted small">${habit.category} · ${habit.time} · ${statusForHabit(habit)}</p>
        </div>
      </div>
      <p class="muted">${habit.description}</p>
      <div class="detail-grid">
        <div class="detail-tile"><strong>${completionRate(habit)}%</strong><p class="muted small">cumplimiento real</p></div>
        <div class="detail-tile"><strong>${habit.targetRate}%</strong><p class="muted small">objetivo esperado</p></div>
        <div class="detail-tile"><strong>${streakForHabit(habit)} dias</strong><p class="muted small">racha actual</p></div>
        <div class="detail-tile"><strong>${habit.reminderLead} min</strong><p class="muted small">recordatorio</p></div>
      </div>
      <section class="section">
        <h3>Historial semanal</h3>
        <div class="weekly-bar">${lastSevenDays()
          .map((day) => `<span class="${habit.logs[day]?.status === "done" ? "active" : ""}"></span>`)
          .join("")}</div>
      </section>
      <section class="section panel">
        <strong>Conexion neurocientifica</strong>
        <p class="muted small">Este habito reduce friccion cuando activa una señal estable, una version minima viable y una recompensa inmediata. Importa porque ${habit.expectedBenefit}</p>
        <p class="muted small">Depende de: ${dependencyNames || "sin dependencias directas"}.</p>
        <p class="muted small">Impacta a: ${impactNames || "sin salidas directas"}.</p>
      </section>
      <section class="section panel">
        <strong>Arquitectura del habito</strong>
        <p class="muted small">Señal ambiental: ${habit.environmentalCue}</p>
        <p class="muted small">Version minima: ${habit.minimumVersion}</p>
        <p class="muted small">Version ideal: ${habit.idealVersion}</p>
        <p class="muted small">Si falla: ${habit.fallbackPlan}</p>
      </section>
      <div class="inline-actions">
        <button class="primary-button" id="editHabit" type="button">Editar</button>
        <button class="ghost-button" id="duplicateHabit" type="button">Duplicar</button>
        <button class="warning-button" id="deleteHabit" type="button">Eliminar</button>
      </div>
    </section>
  `;

  views.detail.querySelector("#editHabit").addEventListener("click", () => openForm(habit.id));
  views.detail.querySelector("#duplicateHabit").addEventListener("click", () => duplicateHabit(habit.id));
  views.detail.querySelector("#deleteHabit").addEventListener("click", () => removeHabit(habit.id));
}

function renderNeuroView() {
  views.neuro.innerHTML = `
    <section class="section">
      <div class="section-header"><h2 class="section-title">Conector neurocientifico</h2></div>
      ${neuroContent.map((item) => renderInsightHTML(item)).join("")}
      <article class="panel">
        <strong>Patrones de comportamiento conectados</strong>
        <p class="muted small">La app asume que ciertos habitos son gatillo: sueño, despertar, hidratacion, ejercicio y preparacion del entorno. Cuando uno de esos falla, la probabilidad de cumplimiento de habitos posteriores cae por energia, foco o decision fatigue.</p>
      </article>
    </section>
  `;
}

function renderInsightHTML(item) {
  return `
    <article class="insight-card">
      <p class="insight-card__label">${item.label}</p>
      <h3 class="insight-card__title">${item.title}</h3>
      <p class="insight-card__body">${item.body}</p>
    </article>
  `;
}

function renderAnalysisView() {
  views.analysis.innerHTML = `
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">Analisis IA diario</h2>
        <span class="small muted">${todayKey()}</span>
      </div>
      ${buildAnalysis()
        .map(
          (item) => `
            <article class="analysis-item">
              <strong>${item.title}</strong>
              <p>${item.body}</p>
            </article>
          `
        )
        .join("")}
      <article class="panel">
        <strong>Resumen estrategico</strong>
        <p class="muted small">${buildStrategicSummary()}</p>
      </article>
    </section>
  `;
}

function buildStrategicSummary() {
  const missed = activeHabitsForToday().filter((habit) => statusForHabit(habit) === "missed");
  if (!missed.length) {
    return "Tu sistema esta operando con poca friccion hoy. El siguiente salto de calidad no es añadir mas habitos, sino proteger los disparadores y el cierre del dia anterior.";
  }

  const first = missed[0];
  return `El cuello de botella principal de hoy parece ser ${first.name.toLowerCase()}. Si ese habito cae, el resto deja de apoyarse en automaticidad y vuelve a depender de fuerza de voluntad. Prioriza señal ambiental clara, version minima y horario mas realista.`;
}

function renderSettingsView() {
  views.settings.innerHTML = `
    <section class="section">
      <div class="settings-card">
        <div class="settings-row">
          <strong>Usuario</strong>
          <span class="muted">${state.settings.userName}</span>
        </div>
      </div>
      <div class="settings-card section">
        <div class="settings-row">
          <strong>Celebraciones</strong>
          <button class="ghost-button" id="toggleCelebration" type="button">${state.settings.celebrationMode ? "Activadas" : "Desactivadas"}</button>
        </div>
      </div>
      <div class="settings-card section">
        <div class="settings-row">
          <strong>Reflexion diaria</strong>
          <button class="ghost-button" id="toggleReflection" type="button">${state.settings.dailyReflection ? "Activa" : "Inactiva"}</button>
        </div>
      </div>
      <div class="settings-card section">
        <strong>Notas de producto</strong>
        <p class="muted small">Esta version funciona completamente en local. La arquitectura deja preparada una futura capa de backend, notificaciones y un modelo de IA real.</p>
      </div>
    </section>
  `;

  views.settings.querySelector("#toggleCelebration").addEventListener("click", () => {
    state.settings.celebrationMode = !state.settings.celebrationMode;
    saveState();
    renderSettingsView();
  });
  views.settings.querySelector("#toggleReflection").addEventListener("click", () => {
    state.settings.dailyReflection = !state.settings.dailyReflection;
    saveState();
    renderSettingsView();
  });
}

function render() {
  renderTodayView();
  renderHabitsView();
  renderFormView();
  renderDetailView();
  renderNeuroView();
  renderAnalysisView();
  renderSettingsView();
}

function openForm(id = null) {
  ui.editingId = id;
  navigate("form");
}

function openDetail(id) {
  ui.detailId = id;
  navigate("detail");
}

function logHabit(id, status) {
  const habit = state.habits.find((item) => item.id === id);
  if (!habit) return;
  habit.logs[todayKey()] = { status, timestamp: new Date().toISOString() };
  saveState();
  render();
}

function duplicateHabit(id) {
  const habit = state.habits.find((item) => item.id === id);
  if (!habit) return;
  const copy = structuredClone(habit);
  copy.id = crypto.randomUUID();
  copy.name = `${copy.name} copia`;
  copy.logs = {};
  copy.dependsOn = [];
  copy.impacts = [];
  state.habits.unshift(copy);
  saveState();
  openDetail(copy.id);
}

function removeHabit(id) {
  state.habits = state.habits.filter((item) => item.id !== id);
  state.habits.forEach((habit) => {
    habit.dependsOn = habit.dependsOn.filter((item) => item.sourceId !== id);
    habit.impacts = habit.impacts.filter((item) => item.targetId !== id);
  });
  saveState();
  navigate("habits");
}

navigate("today");
