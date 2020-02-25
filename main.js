const link = "https://spreadsheets.google.com/feeds/list/1Ld5qK6WvXSsB-x7wOVz1vdrpKDe7uqztnTwoASzxVHs/od6/public/values?alt=json"
window.addEventListener("DOMContentLoaded", getData);
let jsonData=[]
function getData() {
    fetch(link)
        .then(e => e.json())
        .then(data=>{
        jsonData=data.feed.entry;
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
    const price_modal = document.querySelector(".price");
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
    const title_marker_x = newdata.gsx$translatex.$t - newdata.gsx$venue.$t.length*1.5;
    console.log(newdata.gsx$venue.$t.length/2);
    clone_marker.style.transform = `translate(${newdata.gsx$translatex.$t}px, ${newdata.gsx$translatey.$t}px) scale(0.1)` ;


    title_marker.setAttribute("x", "0" );
    title_marker.setAttribute("y", "0");

        title_marker.style.transform = `translate(${title_marker_x}px, ${newdata.gsx$translatey.$t}px)` ;

    clone_marker.addEventListener("click", fillModal);

    document.querySelector(".denmark-map").appendChild(clone_marker);
    document.querySelector(".denmark-map").appendChild(title_marker);

    //create thumbnail

    const thumbnail = document.querySelector(".thumbnail").content;
    const clone_thumbnail = thumbnail.cloneNode(true);

    clone_thumbnail.querySelector(".title-thumbnail").textContent = newdata.gsx$venue.$t;
    clone_thumbnail.querySelector(".price-thumbnail span").textContent = newdata.gsx$price.$t;
    clone_thumbnail.querySelector(".Xtremness-thumbnail").textContent = newdata.gsx$scary.$t;
    clone_thumbnail.querySelector(".cartouche").style.backgroundImage = `url("${newdata.gsx$thumbnail.$t}")`;
    clone_thumbnail.querySelector(".title-back-thumbnail").textContent = newdata.gsx$venue.$t;
    clone_thumbnail.querySelector(".desc-back").textContent = newdata.gsx$description.$t;

    console.log(`url(${newdata.gsx$thumbnail.$t})`);

    //adds modal to thumbnail


    clone_thumbnail.querySelector(".overlay").addEventListener("click", fillModal);

    document.querySelector(".wrapper").appendChild(clone_thumbnail);

    //modal appearing code

    const modal_background = document.querySelector(".modal");

    function fillModal(){
        modal_background.style.display = "block";

        console.log(`${newdata.gsx$id.$t}`);
        title_modal.textContent = newdata.gsx$venue.$t;
        img_modal.src = newdata.gsx$thumbnail.$t;
        desc_left.textContent = newdata.gsx$description.$t;
        price_modal.textContent = newdata.gsx$price.$t;
        Xtremness_modal.textContent = newdata.gsx$scary.$t;
        address.textContent = newdata.gsx$address.$t;
        website.textContent = newdata.gsx$website.$t;


    }

        window.onclick = function (event) {
        if (event.target == modal_background) {
            modal_background.style.display = "none";}}
}


const btn = document.querySelector('button');
btn.addEventListener("click", function(){
    jsonData.sort((a,b) => a.gsx$scary.$t - b.gsx$scary.$t);
    showData(jsonData);
})
