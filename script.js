const serviceContent = {
  preventive: {
    badge: "Preventive Care",
    title: "Cleanings, diagnostics, and enamel protection with a relaxed pace.",
    text: "High-resolution scans, gentle polishing, and personalized maintenance plans keep every smile bright without feeling clinical or cold.",
    features: [
      "Airy hygiene suites with music-friendly appointments",
      "Digital imaging for precise, low-stress checkups",
      "Fluoride and night-guard plans tailored to your bite"
    ]
  },
  cosmetic: {
    badge: "Cosmetic Design",
    title: "Whitening, contouring, and veneer artistry for camera-ready confidence.",
    text: "We design smile upgrades with preview-led decisions, shade mapping, and facial-balance details so the result feels refined rather than overdone.",
    features: [
      "Custom whitening intensity matched to your enamel tone",
      "Digital smile mockups before veneer or bonding work",
      "Subtle contouring that keeps your smile natural"
    ]
  },
  restorative: {
    badge: "Restorative Care",
    title: "Repair strength and comfort with beautifully blended restorations.",
    text: "Cracks, cavities, and worn edges are restored with durable materials chosen to support both bite function and aesthetics.",
    features: [
      "Tooth-colored fillings and crowns with natural translucency",
      "Bite-balanced repairs for long-term comfort",
      "Clear explanations before every procedure begins"
    ]
  },
  kids: {
    badge: "Family Care",
    title: "Playful, patient-centered dentistry for children, teens, and parents.",
    text: "Our family appointments feel welcoming and positive, using kid-friendly language and gentle pacing that helps everyone feel at ease.",
    features: [
      "Friendly introductions and sensory-aware visits",
      "Preventive education that feels fun, not scary",
      "Scheduling options built for busy families"
    ]
  }
};

const moodContent = {
  calm: {
    title: "Calm appointment flow",
    text: "Soft lighting, reassuring consultation time, and extra explanation for every treatment step."
  },
  fresh: {
    title: "Fresh and energizing visit",
    text: "Minty tones, bright visuals, and a brisk but gentle rhythm for patients who like a lively atmosphere."
  },
  glow: {
    title: "Golden glow experience",
    text: "Warmer light, cosmetic-focus energy, and celebratory finishing touches for smile-makeover days."
  }
};

const serviceTabs = document.querySelectorAll(".service-tab");
const servicePanel = document.getElementById("service-panel");
const moodButtons = document.querySelectorAll(".mood-button");
const moodCard = document.getElementById("mood-card");
const smileMeter = document.getElementById("smile-meter");
const smileMeterFill = document.querySelector(".smile-meter-fill");
const bookingForm = document.getElementById("booking-form");
const formNote = document.getElementById("form-note");
const scrollButtons = document.querySelectorAll("[data-scroll]");

const renderService = (key) => {
  const item = serviceContent[key];
  if (!item || !servicePanel) return;

  servicePanel.innerHTML = `
    <div class="service-badge">${item.badge}</div>
    <h3>${item.title}</h3>
    <p>${item.text}</p>
    <ul class="feature-list">
      ${item.features.map((feature) => `<li>${feature}</li>`).join("")}
    </ul>
  `;
};

serviceTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const key = tab.dataset.service;
    serviceTabs.forEach((item) => {
      item.classList.toggle("is-active", item === tab);
      item.setAttribute("aria-selected", String(item === tab));
    });
    renderService(key);
  });
});

moodButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const mood = button.dataset.mood;
    const content = moodContent[mood];
    if (!content || !moodCard) return;

    moodButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    moodCard.innerHTML = `
      <h3>${content.title}</h3>
      <p>${content.text}</p>
    `;

    document.body.classList.remove("mood-fresh", "mood-glow");
    if (mood === "fresh") document.body.classList.add("mood-fresh");
    if (mood === "glow") document.body.classList.add("mood-glow");
  });
});

if (smileMeter && smileMeterFill) {
  const animateMeter = (scale) => {
    smileMeterFill.style.transform = `scaleX(${scale})`;
  };

  smileMeter.addEventListener("mouseenter", () => animateMeter(1));
  smileMeter.addEventListener("mouseleave", () => animateMeter(0.52));
  smileMeter.addEventListener("touchstart", () => animateMeter(1), { passive: true });
  smileMeter.addEventListener("touchend", () => animateMeter(0.68));
}

if (bookingForm && formNote) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = bookingForm.elements.namedItem("name");
    const safeName = name && "value" in name ? String(name.value).trim() : "friend";
    formNote.textContent = `Thanks ${safeName || "friend"}! Your smile consultation request is ready for follow-up.`;
    bookingForm.reset();
  });
}

scrollButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.getAttribute("data-scroll");
    if (!target) return;
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  });
});
