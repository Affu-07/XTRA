// Mobile navigation menu
var menuButton = document.getElementById("menuBtn");
var menu = document.getElementById("menu");

if (menuButton && menu) {
  menuButton.addEventListener("click", function () {
    var isOpen = menu.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
  });

  menu.querySelectorAll(".dropdown > a, .has-sub > a").forEach(function (toggle) {
    toggle.addEventListener("click", function (event) {
      event.preventDefault();
      var parent = toggle.parentElement;
      var isOpen = parent.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen);
    });
  });

  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      if (link.parentElement.classList.contains("dropdown") ||
          link.parentElement.classList.contains("has-sub")) {
        return;
      }

      menu.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menu.querySelectorAll(".dropdown.open, .has-sub.open").forEach(function (item) {
        item.classList.remove("open");
        var toggle = item.querySelector(":scope > a");
        if (toggle) {
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  });
}

// Sticky header and back-to-top button
var header = document.getElementById("header");
var topButton = document.getElementById("topBtn");

window.addEventListener("scroll", function () {
  if (header) {
    header.classList.toggle("scrolled", window.scrollY > 80);
  }
  if (topButton) {
    topButton.classList.toggle("show", window.scrollY > 500);
  }
});

if (topButton) {
  topButton.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Search overlay
var searchBox = document.getElementById("searchBox");
var searchButton = document.getElementById("searchBtn");
var searchClose = document.getElementById("searchClose");

if (searchBox && searchButton && searchClose) {
  searchButton.addEventListener("click", function () {
    searchBox.classList.add("open");
    searchBox.querySelector("input").focus();
  });

  searchClose.addEventListener("click", function () {
    searchBox.classList.remove("open");
  });
}

// Video popup
var videoModal = document.getElementById("videoModal");
var videoFrame = document.getElementById("videoFrame");
var videoClose = document.getElementById("videoClose");

function closeVideo() {
  if (videoModal && videoFrame) {
    videoModal.classList.remove("open");
    videoFrame.src = "";
  }
}

if (videoModal && videoFrame && videoClose) {
  document.querySelectorAll(".watch").forEach(function (button) {
    button.addEventListener("click", function () {
      videoFrame.src = "https://www.youtube.com/embed/FyS_zcvmUr4?autoplay=1";
      videoModal.classList.add("open");
    });
  });

  videoClose.addEventListener("click", closeVideo);
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    if (searchBox) {
      searchBox.classList.remove("open");
    }
    closeVideo();

    if (menu) {
      menu.classList.remove("open");
      menu.querySelectorAll(".dropdown.open, .has-sub.open").forEach(function (item) {
        item.classList.remove("open");
        var toggle = item.querySelector(":scope > a");
        if (toggle) {
          toggle.setAttribute("aria-expanded", "false");
        }
      });
      if (menuButton) {
        menuButton.setAttribute("aria-expanded", "false");
      }
    }
  }
});

// Home page hero slider
var slides = document.querySelectorAll(".slide");
var currentSlide = 0;

function showSlide(index) {
  if (slides.length === 0) {
    return;
  }

  slides[currentSlide].classList.remove("active");
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");
}

var nextSlide = document.getElementById("next");
var previousSlide = document.getElementById("prev");

if (slides.length > 1 && nextSlide && previousSlide) {
  nextSlide.addEventListener("click", function () {
    showSlide(currentSlide + 1);
  });

  previousSlide.addEventListener("click", function () {
    showSlide(currentSlide - 1);
  });

  window.setInterval(function () {
    showSlide(currentSlide + 1);
  }, 6000);
}

// Feature cards can be opened by touch or click
document.querySelectorAll(".feature-card").forEach(function (card) {
  card.addEventListener("click", function (event) {
    if (event.target.closest("a")) {
      return;
    }
    card.classList.toggle("open");
  });
});

// Customer testimonial slider
var testimonialTrack = document.getElementById("testiTrack");
var testimonialDots = document.querySelectorAll("#testiDots span");
var testimonialIndex = 0;

function showTestimonial(index) {
  if (!testimonialTrack || testimonialDots.length === 0) {
    return;
  }

  testimonialIndex = (index + testimonialDots.length) % testimonialDots.length;
  var slide = testimonialTrack.children[testimonialIndex];
  testimonialTrack.style.transform = "translateX(-" + slide.offsetLeft + "px)";

  testimonialDots.forEach(function (dot, dotIndex) {
    dot.classList.toggle("active", dotIndex === testimonialIndex);
  });
}

if (testimonialTrack && testimonialDots.length > 0) {
  testimonialDots.forEach(function (dot, index) {
    dot.setAttribute("role", "button");
    dot.setAttribute("tabindex", "0");
    dot.setAttribute("aria-label", "Show testimonial " + (index + 1));

    dot.addEventListener("click", function () {
      showTestimonial(index);
    });

    dot.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        showTestimonial(index);
      }
    });
  });

  window.setInterval(function () {
    showTestimonial(testimonialIndex + 1);
  }, 5000);

  window.addEventListener("resize", function () {
    showTestimonial(testimonialIndex);
  });
}

// Contact and FAQ forms give clear front-end feedback.
function connectDemoForm(formId, nameId, emailId, messageId, successMessage) {
  var form = document.getElementById(formId);
  if (!form) {
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var nameInput = document.getElementById(nameId);
    var emailInput = document.getElementById(emailId);
    var message = document.getElementById(messageId);

    if (!nameInput.value.trim() || !emailInput.value.trim()) {
      message.textContent = "Please enter your name and email address.";
      return;
    }

    if (!emailInput.validity.valid) {
      message.textContent = "Please enter a valid email address.";
      emailInput.focus();
      return;
    }

    message.textContent = successMessage;
    form.reset();
  });
}

connectDemoForm(
  "quoteForm",
  "name",
  "email",
  "formMsg",
  "Thank you! We will contact you soon."
);

connectDemoForm(
  "faqForm",
  "faqName",
  "faqEmail",
  "faqMsg",
  "Thank you! We will answer your question soon."
);

connectDemoForm(
  "serviceQuoteForm",
  "serviceName",
  "serviceEmail",
  "serviceFormMsg",
  "Thank you! We have received your project request."
);

// FAQ accordion: keep one answer open at a time.
var accordionItems = document.querySelectorAll(".acc-item");

accordionItems.forEach(function (item) {
  var title = item.querySelector(".acc-title");
  var body = item.querySelector(".acc-body");

  if (!title || !body) {
    return;
  }

  title.setAttribute("role", "button");
  title.setAttribute("tabindex", "0");
  title.setAttribute("aria-expanded", item.classList.contains("open"));

  if (item.classList.contains("open")) {
    body.style.maxHeight = body.scrollHeight + "px";
  }

  function toggleAccordionItem() {
    var shouldOpen = !item.classList.contains("open");

    accordionItems.forEach(function (otherItem) {
      otherItem.classList.remove("open");
      var otherTitle = otherItem.querySelector(".acc-title");
      var otherBody = otherItem.querySelector(".acc-body");
      if (otherTitle) {
        otherTitle.setAttribute("aria-expanded", "false");
      }
      if (otherBody) {
        otherBody.style.maxHeight = null;
      }
    });

    if (shouldOpen) {
      item.classList.add("open");
      title.setAttribute("aria-expanded", "true");
      body.style.maxHeight = body.scrollHeight + "px";
    }
  }

  title.addEventListener("click", toggleAccordionItem);
  title.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleAccordionItem();
    }
  });
});

// Cookie notice
var cookieButton = document.getElementById("cookieBtn");
if (cookieButton) {
  cookieButton.addEventListener("click", function () {
    document.getElementById("cookie").style.display = "none";
  });
}

// Reveal content as it enters the viewport.
var revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  var revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach(function (item) {
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach(function (item) {
    item.classList.add("show");
  });
}
