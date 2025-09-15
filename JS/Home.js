// ================================== Animation =====================================//
document.addEventListener("DOMContentLoaded", () => {
  const elements = [
    document.querySelector("h1"),
    document.querySelector("h2"),
    document.querySelector("p")
  ];

  // Inject blinking cursor CSS
  const style = document.createElement("style");
  style.textContent = `
    .typing-cursor {
      display: inline-block;
      width: 10px;
      animation: blink 0.8s infinite;
    }

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  // Store and hide original text
  const originalTexts = elements.map(el => {
    const text = el.textContent;
    el.textContent = "";
    el.style.visibility = "hidden";
    return text;
  });

  const cursor = document.createElement("span");
  cursor.className = "typing-cursor";
  cursor.textContent = "█";

  async function typeText(el, text, delay = 50) {
    return new Promise(resolve => {
      let i = 0;
      el.style.visibility = "visible";

      const span = document.createElement("span");
      el.appendChild(span);
      el.appendChild(cursor);

      const typingInterval = setInterval(() => {
        span.textContent += text.charAt(i);
        i++;
        if (i === text.length) {
          clearInterval(typingInterval);
          cursor.remove();
          setTimeout(resolve, 300);
        }
      }, delay);
    });
  }

  async function startTyping() {
    for (let i = 0; i < elements.length; i++) {
      await typeText(elements[i], originalTexts[i]);
    }
  }

  // Delay before typing starts
  setTimeout(() => {
    startTyping();
  }, 4000);
});


// ========================= Image animation ===============================
document.addEventListener("DOMContentLoaded", () => {
  const img = document.querySelector(".home-img .img-item img");
  if (!img) return;

  const wrapper = document.createElement("div");
  wrapper.classList.add("image-reveal-wrapper");

  const clonedImg = img.cloneNode(true);
  img.parentNode.replaceChild(wrapper, img);
  wrapper.appendChild(clonedImg);

  setTimeout(() => {
    wrapper.classList.add("reveal-image");
  }, 300);
});


// ======================== Navbar Animation =================================
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("header nav a");

  navLinks.forEach(link => link.classList.add("nav-hidden"));

  navLinks.forEach((link, index) => {
    setTimeout(() => {
      link.classList.add("nav-reveal");
    }, 300 + index * 200);
  });
});


// ============================= Sequential Animations ==========================
document.addEventListener("DOMContentLoaded", () => {
  const homeImg = document.querySelector(".home-img");
  const homeDetail = document.querySelector(".home-detail");

  homeImg.style.display = "none";
  homeDetail.style.display = "none";

  setTimeout(() => {
    homeImg.style.display = "block";
  }, 500);

  setTimeout(() => {
    homeDetail.style.display = "block";
  }, 2000);
});


// ============================ Who am I button animation =======================
document.addEventListener("DOMContentLoaded", function() {
  const whoAmIButton = document.getElementById("whoami-btn");

  const totalTextAnimationDuration = 12000;

  setTimeout(() => {
    whoAmIButton.style.display = "inline-block";
    whoAmIButton.style.opacity = 0;
    whoAmIButton.style.transition = "opacity 1s ease";
    requestAnimationFrame(() => {
      whoAmIButton.style.opacity = 1;
    });
  }, totalTextAnimationDuration);
});

document.addEventListener("DOMContentLoaded", function() {
  const whoAmIButton = document.getElementById("whoami-btn");
  setTimeout(() => {
    whoAmIButton.classList.add("visible");
  }, 12000);
});


// ======================== Toggle Mobile Menu ==============================
document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.getElementById("menu-icon");
  const mobileNav = document.getElementById("mobileNav");

  menuIcon.addEventListener("click", () => {
    mobileNav.classList.toggle("active");
  });

  mobileNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("active");
    });
  });
});


// ======================== Fade-in effect for sections ========================
document.addEventListener("DOMContentLoaded", () => {
  const homeImg = document.querySelector(".home-img");
  const homeDetail = document.querySelector(".home-detail");

  homeImg.style.opacity = 0;
  homeDetail.style.opacity = 0;
  homeImg.style.transition = "opacity 1s ease";
  homeDetail.style.transition = "opacity 1s ease";

  setTimeout(() => {
    homeImg.style.opacity = 1;
  }, 500);

  setTimeout(() => {
    homeDetail.style.opacity = 1;
  }, 2000);
});


// ==================================== Redirection Logic ===================================//
(function() {
  function handleRedirect() {
    const width = window.innerWidth;
    const isMobile = width <= 786;
    const currentPage = window.location.pathname.split("/").pop().toLowerCase();

    if (!isMobile && currentPage === "Home.html") {
      // Desktop users should go back to root (clean URL)
      window.location.replace("/");
    }
    // Mobile users stay on Home.html
  }

  handleRedirect();
  window.addEventListener("resize", handleRedirect);
})();
