function onloadFunc(){
    console.log("test");
    updateData("/User1/Alter", {"Alter": "5"});
}

const BASE_URL = "https://remotestorage-c5224-default-rtdb.europe-west1.firebasedatabase.app/"

async function loadData(path = "") { //Zum Laden von Daten
  let response = await fetch(BASE_URL + path + ".json");
  let responseToJson = await response.json();
  console.log(responseToJson);
}

async function postData(path = "", data={}) { //Hinzufügen von Daten
    let response = await fetch(BASE_URL + path + ".json",{
        method: "POST",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
  return responseToJson = await response.json();6

}

async function deleteData(path = ""){
    let response = await fetch(BASE_URL + path + ".json",{
        method: "DELETE",
    });
  return responseToJson = await response.json();

}

async function updateData(path = "", data={}) {
    let response = await fetch(BASE_URL + path + ".json",{
        method: "PUT",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
  return responseToJson = await response.json();

}