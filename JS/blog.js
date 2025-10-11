// ======================== Navbar Animation =================================
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("header nav a");

  navLinks.forEach(link => link.classList.add("nav-hidden"));

  navLinks.forEach((link, index) => {
    setTimeout(() => {
      link.classList.add("nav-reveal");
    }, 300 + index * 200); // staggered animation
  });
});

// ======================== Mobile Menu Toggle =================================
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

// ======================== Blogs Dynamic Load =================================

// JSON file containing all blog data
const BLOGS_JSON_PATH = "blogs.json";

// Fetch and render blogs
document.addEventListener("DOMContentLoaded", async () => {
  const blogGrid = document.getElementById("blogGrid");
  const featured = document.getElementById("featuredBlog");

  try {
    const response = await fetch(BLOGS_JSON_PATH);
    const blogs = await response.json();

    if (!Array.isArray(blogs) || blogs.length === 0) {
      blogGrid.innerHTML = "<p>No blogs available yet.</p>";
      return;
    }

    // Pick the most recent or marked featured blog
    const featuredBlog = blogs.find(b => b.featured) || blogs[0];

    // Render featured blog
    featured.innerHTML = `
      <img src="${featuredBlog.thumbnail}" alt="${featuredBlog.title}">
      <div class="featured-overlay">
        <p class="meta">${featuredBlog.category}</p>
        <h2>${featuredBlog.title}</h2>
        <p>${featuredBlog.description}</p>
        <a href="${featuredBlog.link}">Read More</a>
      </div>
    `;

    // Render all blogs in grid
    blogGrid.innerHTML = blogs
      .map(blog => `
        <div class="blog-card" data-category="${blog.category}">
          <img src="${blog.thumbnail}" alt="${blog.title}">
          <div class="blog-content">
            <p class="blog-meta">${blog.category} • ${blog.date}</p>
            <h3>${blog.title}</h3>
            <p>${blog.description}</p>
            <a class="read-more-btn" href="${blog.link}">Read More</a>
          </div>
        </div>
      `)
      .join("");
  } catch (error) {
    console.error("Error loading blogs:", error);
    blogGrid.innerHTML = "<p>Failed to load blogs. Please try again later.</p>";
  }
});

// ======================== Blog Filter =================================
function filterBlogs(category, event) {
  const cards = document.querySelectorAll(".blog-card");
  const buttons = document.querySelectorAll(".sort-buttons button");

  buttons.forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");

  cards.forEach(card => {
    if (category === "all" || card.dataset.category === category) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}
