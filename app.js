document.getElementById('generateResponseBtn').addEventListener('click', async () => {
    const userInput = document.getElementById('userInput').value;
    const loadingIndicator = document.getElementById('loading');
    const responseContainer = document.getElementById('responseContainer');
  
    // Clear previous response and show loading
    responseContainer.innerHTML = '';
    loadingIndicator.style.display = 'block';
  
    if (userInput.trim() === '') {
      responseContainer.innerHTML = 'Please enter a message.';
      loadingIndicator.style.display = 'none';
      return;
    }
  
    try {
      await generateAPIResponse(userInput);
      loadingIndicator.style.display = 'none';
    } catch (error) {
      loadingIndicator.style.display = 'none';
      responseContainer.innerHTML = `Error: ${error.message}`;
    }
  });
  
  async function generateAPIResponse(userMessage) {
    try {
        const API_KEY = "AIzaSyCu4O8kGxwU1BqGhlbiEnB-QQpEPzuEKfM";
        const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: userMessage }],
            },
          ],
        }),
      });
  
      const data = await response.json();
      const apiResponse = data?.candidates[0].content.parts[0].text;
  
      console.log(apiResponse);
      
      // Display API response in the response container
      const responseContainer = document.getElementById('responseContainer');
      responseContainer.innerHTML = apiResponse ? apiResponse : 'No response from API';
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  