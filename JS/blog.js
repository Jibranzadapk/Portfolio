// JS/blog.js

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
      const latest = blogs.slice(0, 3);
      latestPosts.innerHTML = latest
        .map(
          blog => `
        <div class="latest-post" onclick="location.href='${blog.link}'">
          <img src="${blog.thumbnail}" alt="${blog.title}">
          <p><i class="fa-solid fa-book"></i> ${blog.title}</p>
        </div>`
        )
        .join("");

      // ---- Categories ----
      const categories = [...new Set(blogs.map(b => b.category))];
      categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.textContent = cat;
        btn.onclick = () => filterBlogs(cat);
        categoryButtons.appendChild(btn);
      });

      // ---- All Blogs ----
      displayBlogs(blogs);

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
    })
    .catch(error => {
      console.error(error);
      blogGrid.innerHTML = "<p style='color:red;'>Failed to load blogs. Please try again later.</p>";
      featuredBlog.innerHTML = "<p style='color:red;'>Error loading featured blog.</p>";
      latestPosts.innerHTML = "<p style='color:red;'>Error loading latest posts.</p>";
    });
});
