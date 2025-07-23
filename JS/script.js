 // async function fetchGreeting() {
 //      try {
 //        const res = await fetch('https://ipinfo.io/json?token=f10f7ff0caaf17'); // Replace with your actual token
 //        const data = await res.json();

 //        const userTimeZone = data.timezone;

 //        const currentTime = new Date().toLocaleTimeString("en-US", {
 //          hour: "2-digit",
 //          hour12: false,
 //          timeZone: userTimeZone
 //        });

 //        const hour = parseInt(currentTime.split(':')[0]);

 //        let greetingText = "Hello!";
 //        if (hour >= 5 && hour < 12) {
 //          greetingText = "Good Morning!";
 //        } else if (hour >= 12 && hour < 17) {
 //          greetingText = "Good Afternoon!";
 //        } else if (hour >= 17 && hour < 21) {
 //          greetingText = "Good Evening!";
 //        } else {
 //          greetingText = "Good Night!";
 //        }

 //        document.getElementById("greeting").textContent = greetingText;
 //      } catch (error) {
 //        console.error("Error fetching user location/time:", error);
 //        document.getElementById("greeting").textContent = "Welcome!";
 //      }
 //    }

 //    fetchGreeting();


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

  // Wait 9 seconds before starting typing
  setTimeout(() => {
    startTyping();
  }, 4000);
});

// ========================= Image animation ===============================
document.addEventListener("DOMContentLoaded", () => {
  const img = document.querySelector(".home-img .img-item img");

  if (!img) return;

  // Wrap the image in a reveal container
  const wrapper = document.createElement("div");
  wrapper.classList.add("image-reveal-wrapper");

  // Clone the image and move it into the wrapper
  const clonedImg = img.cloneNode(true);
  img.parentNode.replaceChild(wrapper, img);
  wrapper.appendChild(clonedImg);

  // Add the animation class (triggers reveal)
  setTimeout(() => {
    wrapper.classList.add("reveal-image");
  }, 300); // slight delay after load
});


document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const img = document.querySelector(".home-img .img-item img");

    if (!img) return;

    const wrapper = document.createElement("div");
    wrapper.classList.add("image-reveal-wrapper");

    const clonedImg = img.cloneNode(true);
    img.parentNode.replaceChild(wrapper, img);
    wrapper.appendChild(clonedImg);

    setTimeout(() => {
      wrapper.classList.add("reveal-image");
    }, 300); // slight internal delay after replacement
  }, 0.500); // wait 4 seconds before running image animation
});


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




// ============================= All aimation one by one ==========================
document.addEventListener("DOMContentLoaded", () => {
  const homeImg = document.querySelector(".home-img");
  const homeDetail = document.querySelector(".home-detail");

  // Hide both initially
  homeImg.style.display = "none";
  homeDetail.style.display = "none";

  // Show home-img after 4 seconds
  setTimeout(() => {
    homeImg.style.display = "block";
  }, 0.5000);

  // Show home-detail after 9 seconds total
  setTimeout(() => {
    homeDetail.style.display = "block";
  }, 2000);
});


// ============================ Who am i animation =======================

  document.addEventListener("DOMContentLoaded", function () {
    const whoAmIButton = document.getElementById("whoami-btn");

    // Adjust these delays to match your animation durations
    const totalTextAnimationDuration = 12000; // e.g., 9 seconds = h1 + h2 + p typing effect

    setTimeout(() => {
      whoAmIButton.style.display = "inline-block"; // Show the button smoothly
      whoAmIButton.style.opacity = 0;
      whoAmIButton.style.transition = "opacity 1s ease";
      requestAnimationFrame(() => {
        whoAmIButton.style.opacity = 1;
      });
    }, totalTextAnimationDuration);
  });


  document.addEventListener("DOMContentLoaded", function () {
    const whoAmIButton = document.getElementById("whoami-btn");

    setTimeout(() => {
      whoAmIButton.classList.add("visible");
    }, 12000); // Delay based on your text animations
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





