const link = "https://spreadsheets.google.com/feeds/list/1Ld5qK6WvXSsB-x7wOVz1vdrpKDe7uqztnTwoASzxVHs/od6/public/values?alt=json"
window.addEventListener("DOMContentLoaded", getData);

function getData() {
    fetch(link)
        .then(e => e.json())
        .then(sortData);
}

function sortData(data) {
    const myData = data.feed.entry;
    console.log(myData);
    myData.forEach(createElements);
}

function createElements(newdata) {

    //modal variables
    const title_modal = document.querySelector(".modal-title");
    const img_modal = document.querySelector(".modal-img");
    const desc_left = document.querySelector(".desc-left");
    const price_modal = document.querySelector(".price");
    const Xtremness_modal = document.querySelector(".Xtremness");
    const ff = document.querySelector(".ff");
    const address = document.querySelector(".address");
    const opening_hour = document.querySelector(".opening-hour");



    //create markers

    const marker = document.querySelector(".marker");
    const clone_marker = marker.cloneNode(true);
    clone_marker.id = `${newdata.gsx$id.$t}`;

    // console.log(`${newdata.gsx$id.$t}`);


    //thinking about modal
    clone_marker.addEventListener("click", () => {
        console.log(`${newdata.gsx$id.$t}`);

    })

    document.querySelector(".denmark-map").appendChild(clone_marker);

    //create thumbnail

    const thumbnail = document.querySelector(".thumbnail").content;
    const clone_thumbnail = thumbnail.cloneNode(true);

    clone_thumbnail.querySelector(".title-thumbnail").textContent = newdata.gsx$venue.$t;
    clone_thumbnail.querySelector(".price-thumbnail").textContent = newdata.gsx$price.$t;
    clone_thumbnail.querySelector(".Xtremness-thumbnail").textContent = newdata.gsx$scary.$t;
    clone_thumbnail.querySelector(".image-thumbnail").src = "";
    // console.log(`${newdata.gsx$venue.$t} and ${newdata.gsx$id.$t}`);



    document.querySelector(".wrapper").appendChild(clone_thumbnail);



}
