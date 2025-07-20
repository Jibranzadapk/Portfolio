function showGreeting() {
      const now = new Date();
      const hour = now.getHours(); // Local time from user's browser

      let greetingText = "Hello!";
      if (hour >= 5 && hour < 12) {
        greetingText = "Good Morning!";
      } else if (hour >= 12 && hour < 17) {
        greetingText = "Good Afternoon!";
      } else if (hour >= 17 && hour < 21) {
        greetingText = "Good Evening!";
      } else {
        greetingText = "Good Night!";
      }

      document.getElementById("greeting").textContent = greetingText;
    }

    showGreeting();