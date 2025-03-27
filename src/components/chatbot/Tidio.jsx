import { useState } from "react";

const TidioChat = () => {
  const [loaded, setLoaded] = useState(false);

  const loadTidio = () => {
    if (!loaded) {
      const script = document.createElement("script");
      script.src = "//code.tidio.co/afrximfv2vapl0vmadlrgzy1jlibelwe.js";
      script.async = true;
      document.body.appendChild(script);
      setLoaded(true);
    }
  };

  return (
    <div>
      {/* Invisible trigger button */}
      <button onClick={loadTidio} style={{ display: "none" }} aria-hidden="true"></button>

      {/* Auto-click after 3 seconds for better UX (optional) */}
      {!loaded && setTimeout(loadTidio, 3000)}
    </div>
  );
};

export default TidioChat;
