 async function fetchGreeting() {
      try {
        const res = await fetch('https://ipinfo.io/json?token=f10f7ff0caaf17'); // Replace with your actual token
        const data = await res.json();

        const userTimeZone = data.timezone;

        const currentTime = new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          hour12: false,
          timeZone: userTimeZone
        });

        const hour = parseInt(currentTime.split(':')[0]);

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
        console.error("Error fetching user location/time:", error);
        document.getElementById("greeting").textContent = "Welcome!";
      }
    }

    fetchGreeting();