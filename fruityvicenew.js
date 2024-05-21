async function fetchDataJson() {
    try {
        let response = await fetch("https://www.fruityvice.com/api/fruit/all"); // deklariert Variable um die Antwort des Fetch Aufrufs zu speichern
        let responseAsJson = await response.json(); 
        console.log(responseAsJson);
        let content = document.getElementById('content'); // await response.json(): Wartet auf das Resultat der json()-Methode des response-Objekts. response.json() ist eine Methode, die ein Promise zurückgibt, das die Antwort als JSON-parsedes Objekt auflöst.
        content.innerHTML = '';

        for (let i = 0; i < responseAsJson.length; i++) {
            const data = responseAsJson[i];

            content.innerHTML += /*html*/`
                <div class="post">
                    <p><b><span>${i + 1}. </span>Fruitname: ${data.name}</b></p>
                    <div id="nutritionfacts-${i}">
                        <p>ID: ${data.id}</p>
                        <p>Calories: ${data['nutritions']['calories']}</p>
                        <p>Fat: ${data.nutritions.fat}</p>
                        <p>Sugar: ${data.nutritions.sugar}</p>
                        <p>Carbohydrates: ${data.nutritions.carbohydrates}</p>
                        <p>Protein: ${data.nutritions.protein}</p>
                    </div>
                </div>`;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Beispiel der wichtigsten Fetch Befehle:
async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  