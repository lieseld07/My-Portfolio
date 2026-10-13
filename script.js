const themeButton = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("portfolio-theme");
const initialTheme = savedTheme === "dark" ? "dark" : "light";

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;

  const nextTheme = theme === "dark" ? "light" : "dark";
  themeButton.setAttribute("aria-label", "Switch to " + nextTheme + " mode");
  themeButton.setAttribute("title", "Switch to " + nextTheme + " mode");
}

setTheme(initialTheme);

themeButton.addEventListener("click", function () {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme);
  localStorage.setItem("portfolio-theme", nextTheme);
});

const aboutToggle = document.getElementById("about-toggle");
const aboutSection = document.getElementById("about");
const aboutClose = document.getElementById("about-close");
const aboutNavLink = document.querySelector('.nav-links a[href="#about"]');

function setAboutVisible(isVisible, shouldScroll) {
  aboutSection.hidden = !isVisible;
  aboutToggle.setAttribute("aria-expanded", String(isVisible));
  aboutToggle.textContent = isVisible ? "Hide About Me" : "About Me";

  if (isVisible && shouldScroll) {
    aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

aboutToggle.addEventListener("click", function () {
  const shouldShowAbout = aboutSection.hidden;
  setAboutVisible(shouldShowAbout, shouldShowAbout);

  if (!shouldShowAbout) {
    aboutToggle.focus();
  }
});

aboutClose.addEventListener("click", function () {
  setAboutVisible(false, false);
  aboutToggle.focus();
});

aboutNavLink.addEventListener("click", function () {
  setAboutVisible(true, false);
});

const projectFilters = document.querySelectorAll(".project-filter");
const projectCards = document.querySelectorAll(".project-card");

projectFilters.forEach(function (button) {
  button.addEventListener("click", function () {
    const selectedCategory = button.dataset.filter;

    projectCards.forEach(function (card) {
      card.hidden = selectedCategory !== "all" && card.dataset.category !== selectedCategory;
    });

    projectFilters.forEach(function (filterButton) {
      filterButton.setAttribute("aria-pressed", filterButton === button);
    });
  });
});

const skillFilters = document.querySelectorAll(".skill-filter");
const skillGroups = document.querySelectorAll(".skill-group");

skillFilters.forEach(function (button) {
  button.addEventListener("click", function () {
    const selectedCategory = button.dataset.skillFilter;

    skillGroups.forEach(function (group) {
      group.hidden = selectedCategory !== "all" && group.dataset.skillCategory !== selectedCategory;
    });

    skillFilters.forEach(function (filterButton) {
      filterButton.setAttribute("aria-pressed", filterButton === button);
    });
  });
});

const contactForm = document.querySelector(".contact-form");
const formStatus = document.getElementById("form-status");
const contactFields = ["name", "email", "subject", "message"].map(function (fieldName) {
  return document.getElementById(fieldName);
});

function getFieldError(field) {
  const value = field.value.trim();

  if (!value) {
    return "Please enter your " + field.labels[0].textContent.toLowerCase() + ".";
  }

  if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "Please enter a valid email address.";
  }

  return "";
}

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();
  formStatus.hidden = true;
  formStatus.textContent = "";

  let firstInvalidField = null;

  contactFields.forEach(function (field) {
    const errorElement = document.getElementById(field.id + "-error");
    const errorMessage = getFieldError(field);

    errorElement.textContent = errorMessage;
    field.setAttribute("aria-invalid", String(Boolean(errorMessage)));

    if (errorMessage && !firstInvalidField) {
      firstInvalidField = field;
    }
  });

  if (firstInvalidField) {
    firstInvalidField.focus();
    formStatus.textContent = "Please correct the highlighted fields.";
    formStatus.dataset.state = "error";
    formStatus.hidden = false;
    return;
  }

  formStatus.textContent = "Your details are valid, but this form is not connected to a sending service. Nothing has been sent. Please use the email link if you want to send your message.";
  formStatus.dataset.state = "success";
  formStatus.hidden = false;
});

contactFields.forEach(function (field) {
  field.addEventListener("input", function () {
    const errorElement = document.getElementById(field.id + "-error");
    const errorMessage = getFieldError(field);

    errorElement.textContent = errorMessage;
    field.setAttribute("aria-invalid", String(Boolean(errorMessage)));
    formStatus.hidden = true;
    formStatus.textContent = "";
  });
});

const typingText = document.getElementById("typing-text");
const typingPhrase = "Computer vision and applied machine learning";
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reducedMotion) {
  typingText.textContent = typingPhrase;
} else {
  let characterIndex = 0;
  const typingTimer = window.setInterval(function () {
    characterIndex += 1;
    typingText.textContent = typingPhrase.slice(0, characterIndex);

    if (characterIndex >= typingPhrase.length) {
      window.clearInterval(typingTimer);
    }
  }, 65);
}
