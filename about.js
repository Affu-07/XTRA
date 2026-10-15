// Mobile navigation menu
var menuButton = document.getElementById("menuBtn");
var menu = document.getElementById("menu");

menuButton.addEventListener("click", function () {
  var isOpen = menu.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", isOpen);
});

var menuLinks = menu.querySelectorAll("a");
for (var i = 0; i < menuLinks.length; i++) {
  menuLinks[i].addEventListener("click", function () {
    if (this.parentElement.classList.contains("dropdown") ||
        this.parentElement.classList.contains("has-sub")) {
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
}

menu.querySelectorAll(".dropdown > a, .has-sub > a").forEach(function (toggle) {
  toggle.addEventListener("click", function (event) {
    event.preventDefault();
    var parent = toggle.parentElement;
    var isOpen = parent.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen);
  });
});

// Show the sticky-header shadow and back-to-top button while scrolling
var header = document.getElementById("header");
var topButton = document.getElementById("topBtn");

window.addEventListener("scroll", function () {
  header.classList.toggle("scrolled", window.scrollY > 80);
  topButton.classList.toggle("show", window.scrollY > 500);
});

topButton.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Open and close the search overlay
var searchBox = document.getElementById("searchBox");
var searchButton = document.getElementById("searchBtn");
var searchClose = document.getElementById("searchClose");

searchButton.addEventListener("click", function () {
  searchBox.classList.add("open");
  searchBox.querySelector("input").focus();
});

searchClose.addEventListener("click", function () {
  searchBox.classList.remove("open");
});

// Play the company video in a popup
var videoModal = document.getElementById("videoModal");
var videoFrame = document.getElementById("videoFrame");
var watchButtons = document.querySelectorAll(".watch");

function closeVideo() {
  videoModal.classList.remove("open");
  videoFrame.src = "";
}

for (var w = 0; w < watchButtons.length; w++) {
  watchButtons[w].addEventListener("click", function () {
    videoFrame.src = "https://www.youtube.com/embed/FyS_zcvmUr4?autoplay=1";
    videoModal.classList.add("open");
  });
}

document.getElementById("videoClose").addEventListener("click", closeVideo);

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    searchBox.classList.remove("open");
    closeVideo();
    menu.classList.remove("open");
    menu.querySelectorAll(".dropdown.open, .has-sub.open").forEach(function (item) {
      item.classList.remove("open");
      var toggle = item.querySelector(":scope > a");
      if (toggle) {
        toggle.setAttribute("aria-expanded", "false");
      }
    });
    menuButton.setAttribute("aria-expanded", "false");
  }
});

// Dismiss the cookie notice
document.getElementById("cookieBtn").addEventListener("click", function () {
  document.getElementById("cookie").style.display = "none";
});

// Reveal sections as they enter the screen
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

// Animate the project statistics and safety bars when they come into view
function animateNumber(element, target, suffix) {
  var startTime = 0;
  var duration = 1200;

  function updateNumber(time) {
    if (!startTime) {
      startTime = time;
    }

    var progress = Math.min((time - startTime) / duration, 1);
    var value = Math.floor(target * progress);
    element.textContent = value + suffix;

    if (progress < 1) {
      window.requestAnimationFrame(updateNumber);
    }
  }

  window.requestAnimationFrame(updateNumber);
}

function animateBar(element) {
  var percent = Number(element.getAttribute("data-percent"));
  var label = element.querySelector("b");
  element.style.width = percent + "%";
  label.textContent = percent + "%";
}

var statItems = document.querySelectorAll(".counter, .bar-fill");

if ("IntersectionObserver" in window) {
  var statObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) {
        return;
      }

      if (entry.target.classList.contains("counter")) {
        animateNumber(
          entry.target,
          Number(entry.target.getAttribute("data-target")),
          entry.target.getAttribute("data-suffix") || ""
        );
      } else {
        animateBar(entry.target);
      }

      observer.unobserve(entry.target);
    });
  }, { threshold: 0.4 });

  statItems.forEach(function (item) {
    statObserver.observe(item);
  });
} else {
  statItems.forEach(function (item) {
    if (item.classList.contains("counter")) {
      item.textContent = item.getAttribute("data-target") + (item.getAttribute("data-suffix") || "");
    } else {
      animateBar(item);
    }
  });
}

// Customer testimonial slider
var testimonialTrack = document.getElementById("testiTrack");
var testimonialDots = document.querySelectorAll("#testiDots button");
var testimonialIndex = 0;
var testimonialTimer;

function showTestimonial(index) {
  testimonialIndex = (index + testimonialDots.length) % testimonialDots.length;
  var slide = testimonialTrack.children[testimonialIndex];
  testimonialTrack.style.transform = "translateX(-" + slide.offsetLeft + "px)";

  testimonialDots.forEach(function (dot, dotIndex) {
    var isCurrent = dotIndex === testimonialIndex;
    dot.classList.toggle("active", isCurrent);

    if (isCurrent) {
      dot.setAttribute("aria-current", "true");
    } else {
      dot.removeAttribute("aria-current");
    }
  });
}

function startTestimonialTimer() {
  testimonialTimer = window.setInterval(function () {
    showTestimonial(testimonialIndex + 1);
  }, 5000);
}

function restartTestimonialTimer() {
  window.clearInterval(testimonialTimer);
  startTestimonialTimer();
}

testimonialDots.forEach(function (dot, index) {
  dot.addEventListener("click", function () {
    showTestimonial(index);
    restartTestimonialTimer();
  });
});

testimonialTrack.addEventListener("mouseenter", function () {
  window.clearInterval(testimonialTimer);
});

testimonialTrack.addEventListener("mouseleave", startTestimonialTimer);
testimonialTrack.addEventListener("focusin", function () {
  window.clearInterval(testimonialTimer);
});
testimonialTrack.addEventListener("focusout", startTestimonialTimer);

window.addEventListener("resize", function () {
  showTestimonial(testimonialIndex);
});

if (testimonialDots.length > 1) {
  startTestimonialTimer();
}
