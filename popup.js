document.getElementById("searchBtn").addEventListener("click", async () => {
    const word = document.getElementById("wordInput").value.trim();
    if (word) {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();
        
        if (data.length > 0) {
            document.getElementById("result").innerText = data[0].meanings[0].definitions[0].definition;
        } else {
            document.getElementById("result").innerText = "No definition found.";
        }
    }
});