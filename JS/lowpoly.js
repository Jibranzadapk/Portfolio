// ================================ Low poly bg effect =============================//
    document.addEventListener("DOMContentLoaded", function () {
      // Create the canvas and append it to the body
      const canvas = document.createElement('canvas');
      document.body.appendChild(canvas);

      // Get the 2D context for drawing
      const ctx = canvas.getContext('2d');

      // Set canvas size to match window size
      let width = window.innerWidth;
      let height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      // Create an array to store dots
      const dots = [];
      const numDots = 80;

      // Function to generate a random color (green)
      const getRandomColor = () => {
        return 'rgba(0, 255, 0, 0.4)';
      };

      // Dot class representing individual dots
      class Dot {
        constructor() {
          this.x = Math.random() * width;
          this.y = Math.random() * height;
          this.radius = 4;
          this.velocity = {
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2
          };
        }

        // Move the dot based on its velocity
        move() {
          this.x += this.velocity.x;
          this.y += this.velocity.y;

          // Bounce off the edges
          if (this.x <= 0 || this.x >= width) this.velocity.x *= -1;
          if (this.y <= 0 || this.y >= height) this.velocity.y *= -1;
        }

        // Draw the dot on the canvas
        draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fillStyle = '#00FF00';
          ctx.fill();
        }
      }

      // Create and store dots
      for (let i = 0; i < numDots; i++) {
        dots.push(new Dot());
      }

      // Connect dots that are within a certain distance of each other
      const connectDots = () => {
        for (let i = 0; i < dots.length; i++) {
          for (let j = i + 1; j < dots.length; j++) {
            let dist = Math.sqrt(Math.pow(dots[i].x - dots[j].x, 2) + Math.pow(dots[i].y - dots[j].y, 2));

            // Only draw a line if the distance between dots is below a threshold
            if (dist < 150) {
              ctx.beginPath();
              ctx.moveTo(dots[i].x, dots[i].y);
              ctx.lineTo(dots[j].x, dots[j].y);
              ctx.strokeStyle = getRandomColor();
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      };

      // Main animation function
      const animate = () => {
        // Clear the canvas for the next frame
        ctx.clearRect(0, 0, width, height);

        // Move and draw each dot
        for (let i = 0; i < dots.length; i++) {
          dots[i].move();
          dots[i].draw();
        }

        // Connect dots
        connectDots();

        // Keep the animation going
        requestAnimationFrame(animate);
      };

      // Start the animation
      animate();

      // Resize event handling
      window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
      });
    });