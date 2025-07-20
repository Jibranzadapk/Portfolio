 async function fetchGreeting() {
      try {
        // Step 1: Get user's IP-based location
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        const userTimeZone = data.timezone;

        // Step 2: Get current time in user's time zone
        const currentTime = new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          hour12: false,
          timeZone: userTimeZone
        });

        const hour = parseInt(currentTime.split(':')[0]);

        // Step 3: Set greeting based on hour
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
      } catch (error) {
        document.getElementById("greeting").textContent = "Welcome!";
        console.error("Error fetching user location/time:", error);
      }
    }

    fetchGreeting();