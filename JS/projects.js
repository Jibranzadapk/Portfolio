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




// ===================================  Project Cards section =============================//
// Fade-in animation on scroll
const cards = document.querySelectorAll('.project-card');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

cards.forEach(card => {
    observer.observe(card);
});




// ======================== Dynamic Projects Section =============================
document.addEventListener("DOMContentLoaded", () => {
  const projectsGrid = document.querySelector(".projects-grid");

  fetch("blogs.json")
    .then(response => response.json())
    .then(data => {
      // Clear any existing static content
      projectsGrid.innerHTML = "";

      // Loop through all blogs (or filter if you want)
      data.forEach(project => {
        const card = document.createElement("div");
        card.classList.add("project-card");
        card.innerHTML = `
          <img src="${project.thumbnail}" alt="${project.title}">
          <h2>${project.title}</h2>
          <p>${project.description}</p>
          <div class="btn-container">
            <a href="${project.link}" class="project-btn" target="_blank">View Project</a>
          </div>
        `;
        projectsGrid.appendChild(card);
      });

      // Apply fade-in animation once elements are loaded
      const cards = document.querySelectorAll('.project-card');
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      cards.forEach(card => observer.observe(card));
    })
    .catch(error => {
      console.error("Error loading projects:", error);
      projectsGrid.innerHTML = "<p style='color: var(--main-color); text-align:center;'>Failed to load projects 😞</p>";
    });
});
