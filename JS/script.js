// ======================== Typing Effect =================================
const text = "For me, cybersecurity isn’t only about code and firewalls—it’s about trust. I’m learning every day to defend systems so people can feel safe in a connected world.";
const typingText = document.getElementById('typing-text');
let i = 0;

function type() {
  if (i < text.length) {
    typingText.innerHTML += text.charAt(i);
    i++;
    setTimeout(type, 50); // typing speed
  }
}

window.addEventListener('DOMContentLoaded', type);

function knowMe() {
  alert("Hello, I'm Jibran Zada — Cybersecurity Enthusiast!");
}


// ======================== Navbar Animation =================================
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("header nav a");

  navLinks.forEach(link => {
    link.classList.add("nav-hidden");
  });

  navLinks.forEach((link, index) => {
    setTimeout(() => {
      link.classList.add("nav-reveal");
    }, 300 + index * 200); // staggered animation
  });
});


// ======================== Toggle Mobile Menu ==============================
document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.getElementById("menu-icon");
  const mobileNav = document.getElementById("mobileNav");

  menuIcon.addEventListener("click", () => {
    mobileNav.classList.toggle("active");
  });

  // Close menu if any link clicked
  mobileNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("active");
    });
  });
});


// ============================= Redirection Logic ==========================
// Keep root (/) clean, redirect only to Home.html for mobile users
(function() {
  function handleRedirect() {
    const width = window.innerWidth;
    const isMobile = width <= 786;
    const currentPage = window.location.pathname.split("/").pop().toLowerCase(); 
    // "" (root), "index.html", "home.html", etc.

    if (isMobile && currentPage !== "home.html") {
      window.location.replace("home.html"); 
    }
    // Desktop users: stay on / or index.html (no forced redirect).
  }

  // Run on page load
  handleRedirect();

  // Run again when window is resized
  window.addEventListener("resize", handleRedirect);
})();
