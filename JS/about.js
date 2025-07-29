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




// Toggle mobile menu
document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.getElementById("menu-icon");
  const mobileNav = document.getElementById("mobileNav");

  menuIcon.addEventListener("click", () => {
    mobileNav.classList.toggle("active");
  });

  // Optional: close menu if any link clicked
  mobileNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("active");
    });
  });
});




// =====================    Hero Section ============================//

document.addEventListener("DOMContentLoaded", () => {
  const img = document.querySelector(".right img");
  const leftDiv = document.querySelector(".left");
  const buttons = document.getElementById("button-group");

  // Reveal image
  setTimeout(() => {
    img.style.clipPath = "inset(0 0 0 0)";
  }, 500);

  // Start typing after image animation
  setTimeout(() => {
    leftDiv.style.opacity = 1;
    typeText("typed-name", "M Jibran Zada", () => {
      typeText("typed-text", 
        "A Computer Science student and curious tech mind, drawn to exploring how systems work and how to keep them safe. What began as curiosity became a habit of questioning, breaking, and rebuilding — now through code. In tech, curiosity builds, but awareness secures.",
        () => {
          buttons.style.opacity = 1;
        }
      );
    });
  }, 3000);
});

// Typing function that supports long text
function typeText(elementId, text, callback) {
  const el = document.getElementById(elementId);
  let i = 0;
  const interval = setInterval(() => {
    el.textContent += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      el.style.borderRight = "none";
      if (callback) callback();
    }
  }, 30);
}



// ========================= again ==============================//
