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

// ======================== Blogs Dynamic Section =================================
document.addEventListener("DOMContentLoaded", () => {
  const blogGrid = document.getElementById("blogGrid");
  const featuredBlog = document.getElementById("featuredBlog");
  const latestPosts = document.getElementById("latestPosts");
  const categoryButtons = document.getElementById("categoryButtons");

  fetch("/blogs.json")
    .then(response => {
      if (!response.ok) throw new Error("Failed to fetch blogs.json");
      return response.json();
    })
    .then(blogs => {
      if (!Array.isArray(blogs) || blogs.length === 0) {
        blogGrid.innerHTML = "<p style='color:gray;'>No blogs found.</p>";
        return;
      }

      // ---- Sort by Date (newest first) ----
      blogs.sort((a, b) => new Date(b.date) - new Date(a.date));

      // ---- Featured Blog ----
      const featured = blogs.find(b => b.featured) || blogs[0];
      featuredBlog.innerHTML = `
        <img src="${featured.thumbnail}" alt="${featured.title}">
        <div class="featured-overlay">
          <div class="meta">
            <i class="fa-solid fa-calendar"></i> ${featured.date} | 
            <i class="fa-solid fa-tag"></i> ${featured.category}
          </div>
          <h2>${featured.title}</h2>
          <p>${featured.description}</p>
          <a href="${featured.link}"><i class="fa-solid fa-arrow-right"></i> Read More</a>
        </div>
      `;

      // ---- Latest Posts (Sidebar) ----
      latestPosts.innerHTML = "";
      blogs.forEach(blog => {
        const postDiv = document.createElement("div");
        postDiv.classList.add("latest-post");
        postDiv.innerHTML = `
          <img src="${blog.thumbnail}" alt="${blog.title}">
          <p><i class="fa-solid fa-book"></i> ${blog.title}</p>
        `;
        postDiv.addEventListener("click", () => {
          location.href = blog.link;
        });
        latestPosts.appendChild(postDiv);
      });

      // ---- Make Latest Posts Scrollable ----
      latestPosts.style.maxHeight = "400px";
      latestPosts.style.overflowY = "auto";
      latestPosts.style.paddingRight = "5px";

      // ---- Categories ----
      const categories = [...new Set(blogs.map(b => b.category))];
      categoryButtons.innerHTML = "";
      const allBtn = document.createElement("button");
      allBtn.textContent = "All";
      allBtn.classList.add("active");
      allBtn.onclick = () => filterBlogs("all");
      categoryButtons.appendChild(allBtn);

      categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.textContent = cat;
        btn.onclick = () => filterBlogs(cat);
        categoryButtons.appendChild(btn);
      });

      // ---- Display Blogs Function ----
      function displayBlogs(list) {
        if (list.length === 0) {
          blogGrid.innerHTML = "<p style='color:gray;'>No blogs available in this category.</p>";
          return;
        }

        blogGrid.innerHTML = list
          .map(
            blog => `
          <div class="blog-card" data-category="${blog.category}">
            <img src="${blog.thumbnail}" alt="${blog.title}">
            <div class="blog-content">
              <div class="blog-meta"><i class="fa-solid fa-calendar"></i> ${blog.date} | ${blog.category}</div>
              <h3>${blog.title}</h3>
              <p>${blog.description}</p>
              <a class="read-more-btn" href="${blog.link}">Read More</a>
            </div>
          </div>`
          )
          .join("");
      }

      // ---- Filtering Function ----
      window.filterBlogs = function (category) {
        document
          .querySelectorAll(".sort-buttons button")
          .forEach(b => b.classList.remove("active"));
        event.target.classList.add("active");

        if (category === "all") {
          displayBlogs(blogs);
        } else {
          const filtered = blogs.filter(b => b.category === category);
          displayBlogs(filtered);
        }
      };

      // ---- Initial Display ----
      displayBlogs(blogs);
    })
    .catch(error => {
      console.error(error);
      blogGrid.innerHTML = "<p style='color:red;'>Failed to load blogs. Please try again later.</p>";
      featuredBlog.innerHTML = "<p style='color:red;'>Error loading featured blog.</p>";
      latestPosts.innerHTML = "<p style='color:red;'>Error loading latest posts.</p>";
    });
});
