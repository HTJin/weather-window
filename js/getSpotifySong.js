let song;
let play;

const clientId = "d1eb025c391a449081be1f8440761961";
const clientSecret = "ed26a8449c294b96a2ae72cb31c898d8";

const getToken = async () => {
    const result = await fetch(`https://accounts.spotify.com/api/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
        },
        body: "grant_type=client_credentials",
    });
    const data = await result.json();
    return data.access_token;
};

window.clickedEvent = async () => {
    const temp = document.getElementById("temp").innerHTML;
    if (temp < 32) {
        temp = "It's freezing";
    } else if (temp >= 32 && temp < 60) {
        temp = "It's a bit cold";
    } else if (temp >= 60 && temp < 70) {
        temp = "It's just perfect";
    } else if (temp >= 70 && temp < 90) {
        temp = "It's a bit hot";
    } else if (temp >= 90) {
        temp = "WHY IS IT SO HOT";
    }

    let track = [temp,"here in", document.getElementById('city-field').value, document.getElementById('zip-field').value, "and the weather is", document.getElementById("wdesc").innerHTML].join(" ") + "!";

    let token = await getToken();
    let headers = new Headers([
        ["Content-Type", "application/json"],
        ["Accept", "application/json"],
        ["Authorization", `Bearer ${token}`],
    ]);
    let request = new Request(
        `https://api.spotify.com/v1/search?q=${track}&type=track&limit=15`,
        {
            method: "GET",
            headers: headers,
        }
    );
    let result = await fetch(request);
    let response = await result.json();

    song = null;
    for (let track of response.tracks.items) {
        if (track.preview_url) {
            song = track.preview_url;
            break;
        }
    } if (song === null) {
        console.log("No available preview_url found.");
        return;
    }

    if (play) {
        stopSnippet();
    }
    songSnippet(song);
};

window.songSnippet = (url) => {
    play = new Audio(url);
    play.volume = 0.05;
    return play.play();
};
window.stopSnippet = () => {
    return play.pause();
};
