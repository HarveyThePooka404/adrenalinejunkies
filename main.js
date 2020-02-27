const link = "https://spreadsheets.google.com/feeds/list/1Ld5qK6WvXSsB-x7wOVz1vdrpKDe7uqztnTwoASzxVHs/od6/public/values?alt=json"
window.addEventListener("DOMContentLoaded", getData);
let jsonData = []

function getData() {
    fetch(link)
        .then(e => e.json())
        .then(data => {
            jsonData = data.feed.entry;
            showData(jsonData)
        });
}



function showData(data) {
    //const myData = data.feed.entry;
    console.log(data);
    document.querySelector(".wrapper").innerHTML = "";
    data.forEach(createElements);
}

function createElements(newdata) {

    //modal variables
    const title_modal = document.querySelector(".modal-title");
    const img_modal = document.querySelector(".modal-img");
    const desc_left = document.querySelector(".desc-left");
    const price_modal = document.querySelector(".price span");
    const Xtremness_modal = document.querySelector(".Xtremness");
    const address = document.querySelector(".address");
    const website = document.querySelector(".website");


    //create markers

    const marker = document.querySelector(".marker");
    const clone_marker = marker.cloneNode(true);
    clone_marker.id = `${newdata.gsx$id.$t}`;

    // console.log(`${newdata.gsx$id.$t}`);

    //thinking about modal
    const title_marker = document.createElementNS("http://www.w3.org/2000/svg", "text");

    title_marker.textContent = newdata.gsx$venue.$t;
    // const title_marker_x = calc(`${newdata.gsx$translatex.$t}` - 10);
    const title_marker_x = newdata.gsx$translatex.$t - newdata.gsx$venue.$t.length * 1.5;
    clone_marker.style.transform = `translate(${newdata.gsx$translatex.$t}px, ${newdata.gsx$translatey.$t}px) scale(0.1)`;

    clone_marker.dataset.tx = `${newdata.gsx$translatex.$t}`
    clone_marker.dataset.ty = `${newdata.gsx$translatey.$t}`

    title_marker.setAttribute("x", "0");
    title_marker.setAttribute("y", "0");

    title_marker.style.transform = `translate(${title_marker_x}px, ${newdata.gsx$translatey.$t}px)`;

    clone_marker.addEventListener("click", fillModal);

    document.querySelector(".denmark-map").appendChild(clone_marker);
    document.querySelector(".denmark-map").appendChild(title_marker);

    //create thumbnail

    const thumbnail = document.querySelector(".thumbnail").content;
    const clone_thumbnail = thumbnail.cloneNode(true);

    clone_thumbnail.querySelector(".title-thumbnail").textContent = newdata.gsx$venue.$t;
    clone_thumbnail.querySelector(".price-thumbnail span").textContent = newdata.gsx$price.$t;
    clone_thumbnail.querySelector(".Xtremness-thumbnail").src = `img/scariness/adventureicon-${newdata.gsx$scary.$t}.svg`;
    clone_thumbnail.querySelector(".cartouche").style.backgroundImage = `url("${newdata.gsx$thumbnail.$t}")`;
    clone_thumbnail.querySelector(".title-back-thumbnail").textContent = newdata.gsx$venue.$t;
    clone_thumbnail.querySelector(".desc-back").textContent = newdata.gsx$description.$t;

    //adds modal to thumbnail


    clone_thumbnail.querySelector(".overlay").addEventListener("click", fillModal);

    document.querySelector(".wrapper").appendChild(clone_thumbnail);

    //modal appearing code

    const modal_background = document.querySelector(".modal");

    function fillModal() {
        modal_background.style.display = "block";

        console.log(`${newdata.gsx$id.$t}`);
        title_modal.textContent = newdata.gsx$venue.$t;
        img_modal.src = newdata.gsx$thumbnail.$t;
        desc_left.textContent = newdata.gsx$description.$t;
        price_modal.textContent = newdata.gsx$price.$t;
        Xtremness_modal.src = `img/scariness/adventureicon-${newdata.gsx$scary.$t}.svg`;
        address.textContent = newdata.gsx$address.$t;
        //        website.textContent = newdata.gsx$website.$t;
        website.href = newdata.gsx$website.$t;


    }

    window.onclick = function (event) {
        if (event.target == modal_background) {
            modal_background.style.display = "none";
        }
    }
}


const btn = document.querySelector('.everyone');
btn.addEventListener("click", function () {
    jsonData.sort((a, b) => a.gsx$scary.$t - b.gsx$scary.$t);
    showData(jsonData);
})

const risky = document.querySelector('.risky');
risky.addEventListener("click", function () {
    jsonData.sort((a, b) => b.gsx$scary.$t - a.gsx$scary.$t);
    showData(jsonData);
})


// trying to do a zoom. Let's yolo it.

const Midtjylland = document.querySelector(".Midtjylland");
const Syddanmark = document.querySelector(".Syddanmark");
const Nordjylland = document.querySelector(".Nordjylland");
const Hovedstaden = document.querySelector(".Hovedstaden");
const Sjalland = document.querySelector(".Sjalland");



/*Hovedstaden.addEventListener("click", () => {

    const markers = document.querySelectorAll(".marker");
    markers.forEach((e) => {
        e.classList.add("zoomed");
    })

})*/

document.querySelector(".denmark-map").addEventListener("click", (e) => {
    console.log(e);
    if (e.target.classList.contains("Hovedstaden")) {
        console.log("first if");
        document.querySelector("svg").classList.add('zoomed');
        document.querySelector("svg").setAttribute("viewBox", "500 420 200 150");
        document.querySelectorAll("svg .marker").forEach(marker => {
            marker.style.transform = `translate(${Number(marker.dataset.tx)+12}px, ${Number(marker.dataset.ty)+35}px) scale(0.05)`;
        })
    } else if (e.target.classList.contains("Midtjylland")) {
        document.querySelector("svg").setAttribute("viewBox", "0 200 400 350");
    }

    else if (e.target.classList.contains("Nordjylland")) {
        document.querySelector("svg").setAttribute("viewBox", "0 0 400 350");
    }

    else if (e.target.classList.contains("Sjalland")) {
        document.querySelector("svg").setAttribute("viewBox", "400 460 400 350");
    }

        else if (e.target.classList.contains("Syddanmark")) {
        document.querySelector("svg").setAttribute("viewBox", "0 420 400 350");
    }

    else {
        console.log("second if");
        document.querySelector("svg").classList.remove('zoomed')
        document.querySelector(".denmark-map").setAttribute("viewBox", "0 0 1000 811");
        document.querySelectorAll("svg .marker").forEach(marker => {
            marker.style.transform = `translate(${marker.dataset.tx}px, ${marker.dataset.ty}px) scale(0.1)`;
        })
    }
});
