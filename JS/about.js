// ======================== Navbar Animation =================================
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("header nav a");
  navLinks.forEach(link => link.classList.add("nav-hidden"));
  navLinks.forEach((link, index) => {
    setTimeout(() => link.classList.add("nav-reveal"), 300 + index * 200);
  });
});

// Toggle mobile menu
document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.getElementById("menu-icon");
  const mobileNav = document.getElementById("mobileNav");
  menuIcon.addEventListener("click", () => mobileNav.classList.toggle("active"));
  mobileNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => mobileNav.classList.remove("active"));
  });
});

// ===================== Hero Section ============================//
document.addEventListener("DOMContentLoaded", () => {
  const img = document.querySelector(".right img");
  const leftDiv = document.querySelector(".left");
  const buttons = document.getElementById("button-group");
  setTimeout(() => { img.style.clipPath = "inset(0 0 0 0)"; }, 500);
  setTimeout(() => {
    leftDiv.style.opacity = 1;
    typeText("typed-name", "M Jibran Zada", () => {
      typeText(
        "typed-text",
        "A Computer Science student and curious tech mind, drawn to exploring how systems work and how to keep them safe. What began as curiosity became a habit of questioning, breaking, and rebuilding — now through code. In tech, curiosity builds, but awareness secures.",
        () => { buttons.style.opacity = 1; }
      );
    });
  }, 3000);
});

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

// ========================= buttons on hold ==============================//
const div = document.getElementById("buttonhide");
div.style.display = "none";
setTimeout(() => {
  div.style.display = "block";
  div.style.animation = "fadeIn 1s ease-in forwards";
}, 12000);






// ================== profile section =============================//
 const commandText = "whoami";
    const commandEl = document.getElementById("command");
    let i = 0;

    function typeCommand() {
        if (i < commandText.length) {
            commandEl.textContent += commandText.charAt(i);
            i++;
            setTimeout(typeCommand, 150);
        } else {
            setTimeout(showUserDetails, 500);
        }
    }

    // function showUserDetails() {
    //     const terminal = document.getElementById("terminal");

      function showUserDetails() {
    const terminal = document.getElementById("terminal");

    const details = [
         "",
      // "......................................................................................",
            "Name: Jibran Khan",
            "DOB: 18-Jan-2006",
            "Nationality : Pakistan ",
            "Status: Undergrad Student",            
            "Languages: English, Urdu, Pashto",
            "Specialization: Information Security ",
            // " ......................................................................................."
    ];

    details.forEach((line, index) => {
        setTimeout(() => {
            const div = document.createElement("div");
            div.classList.add("line");

            if (line === "") {
                div.classList.add("gap-line"); // special gap style
            } else {
                div.textContent = line;
            }

            terminal.appendChild(div);
        }, index * 700);
    });
}



    window.onload = typeCommand;




 // =================== Education section JS =============================//
  window.addEventListener("load", () => {
    document.querySelector(".edu-details").style.opacity = "1";
    document.querySelector(".edu-details").style.transform = "translateY(0)";
  });




  // ========================= Mouse wheel scroll animation ================//
  // Show scroll indicator after 13 seconds
  setTimeout(() => {
    document.getElementById("scrollIndicator").style.display = "flex";
  }, 13000); // 13000ms = 13 seconds

  // Hide on mobile/responsive screens
  if (window.innerWidth <= 768) { 
    document.getElementById("scrollIndicator").remove();
  }