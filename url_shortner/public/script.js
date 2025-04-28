document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("urlForm");
    const resultDiv = document.getElementById("shortenedUrl");
  
    if (!form || !resultDiv) {
      console.error("Form or Result Div not found!");
      return;
    }
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault(); // Stop the default form submit
  
      const formData = new FormData(form);
      const url = formData.get("url");
      const shortCode = formData.get("shortCode"); // user-entered custom code (optional)
  
      console.log("Form submitted:", { url, shortCode });
  
      try {
        const response = await fetch("/shorten", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url, shortCode }),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log("Success:", data);
  
          const fullShortUrl = `${window.location.origin}/${data.shortCode}`;
          resultDiv.innerHTML = `Shortened URL: <a href="${fullShortUrl}" target="_blank">${fullShortUrl}</a>`;
  
          form.reset(); // Clear the form
        } else {
          const errorText = await response.text();
          resultDiv.innerHTML = `❌ Error: ${errorText}`;
        }
      } catch (error) {
        console.error("Fetch error:", error);
        resultDiv.innerHTML = `❌ Fetch Error: ${error.message}`;
      }
    });
  });
  