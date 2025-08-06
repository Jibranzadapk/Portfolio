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



// ================================== Contact ===========================//
 AOS.init({
      duration: 1000,
      once: true
    });