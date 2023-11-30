// Fetch appelle une source exterieur ou interieur.
fetch("./data/menuEntries.json")
    // il recupère la réponse et la tranforme soit en texte soit en json.
    .then(res => res.text())
    .then(text => console.log(text));

fetch("./data/menuEntries.json")
    // cette fois au format json.
    .then(res => res.json())
    .then(json => {
        // En dehors de la callback le parametre de cette dernière n'est pas utilisable. 
        let menu = json;
        console.dir(menu);
    });
// console.dir(menu);  ne fonctionne pas car synchrone.
// release/
fetch('https://musicbrainz.org/ws/2/artist/?query=eminem&fmt=json&limit=25')
    .then(res => res.json())
    .then(json => console.log(json))

const autocomplete = document.querySelector("#autocomplete");
autocomplete.contentEditable = true;
autocomplete.addEventListener("keyup", () => {
    let container = "";

    console.dir(autocomplete.textContent);
    fetch(`https://musicbrainz.org/ws/2/release/?query=${autocomplete.textContent}&fmt=json&limit=25`)
        .then(res => res.json())
        .then(json => {
            console.log(json)
            json.releases.map((value) => {
                console.dir(value)
                if (value["artist-credit"].length > 0) container += "artist : " + value["artist-credit"][0].name + " | "
                container += "artist : " + value.title + "<br>"
            })
            document.querySelector("#results").innerHTML = container
        })
})