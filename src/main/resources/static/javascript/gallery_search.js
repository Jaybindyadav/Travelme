const imagesWrapper = document.querySelector(".images");
const loadMoreBtn = document.querySelector(".load-more");
const searchInput = document.querySelector(".search-box input");
const lightBox = document.querySelector(".lightbox");
const closeBtn = document.querySelector(".uil-times");
const downloadImgBtn = document.querySelector(".uil-import");


const apikey = "pJ2KcPv9Fvq7O1LeVDr97Hac89PzB06hHUgkZlKk5PuGXZNRXBqC5WA8";
const perpage = 15;
let currentpage = 1;
let searchTerm = null;

const downloadImg = (imgURL) => {
    fetch(imgURL).then(res => res.blob()).then(File => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(File)
        a.download = new Date().getTime();
        a.click();

    }).catch(() => alert("Failed to download image!"));
}

const showLightbox = (name, img) => {
    lightBox.querySelector("img").src = img;
    lightBox.querySelector("span").innerText = name;
    downloadImgBtn.setAttribute("data-img", img);
    lightBox.classList.add("show");
    document.body.style.overflow = "hidden";
}

const hideLightBox = () => {
    lightBox.classList.remove("show");
    document.body.style.overflow = "auto";
}

const generateHTML = (images) => {
    imagesWrapper.innerHTML += images.map(img =>
        `<li class="card" onclick="showLightbox('${img.photo}', '${img.src.large2x}')">
        <img src="${img.src.large2x}" alt="img">
        <div class="details">
            <div class="photo">
                <i class="uil uil-camera">
                    <span>${img.photo}</span>
                </i>
            </div>
            <button onclick="downloadImg('${img.src.large2x}')">
            <i class="uil uil-import"></i>
            </button>
        </div>
    </li>`).join("");
}
const getImages = (apiURL) => {
    loadMoreBtn.innerText = "Loading......";
    loadMoreBtn.classList.add("disabled");
    fetch(apiURL, {
        headers: { Authorization: apikey }
    }).then(res => res.json()).then(data => {
        generateHTML(data.photos);
        loadMoreBtn.innerText = "Load More";
        loadMoreBtn.classList.remove("disabled");
    }).catch(() => alert("Failed to load images!"));
}

const loadMoreImages = () => {
    currentpage++;
    let apiURL = `https://api.pexels.com/v1/curated?page=${currentpage}&per_page=${perpage}`;
    apiURL = searchTerm ? `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentpage}&per_page=${perpage}` : apiURL;
    getImages(apiURL);
}

const loadSearchImages = (e) => {
    if (e.target.value === "") return searchTerm = null;
    if (e.key === "Enter") {
        currentpage = 1;
        searchTerm = e.target.value;
        imagesWrapper.innerHTML = "";
        getImages(`https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentpage}&per_page=${perpage}`);
    }

}
getImages(`https://api.pexels.com/v1/curated?page=${currentpage}&per_page=${perpage}`);
loadMoreBtn.addEventListener("click", loadMoreImages);
searchInput.addEventListener("keyup", loadSearchImages);
closeBtn.addEventListener("click", hideLightBox);
downloadImgBtn.addEventListener("click", (e) => downloadImg(e.target.dataset.img));