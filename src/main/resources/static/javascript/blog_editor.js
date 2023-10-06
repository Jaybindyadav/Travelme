const blogTitleField = document.querySelector('.title');
const articleField = document.querySelector('.article');

const bannerImage = document.querySelector('#banner-Upload');
const banner = document.querySelector('.banner');
let bannerPath;

const publishBtn = document.querySelector('.publish-btn');
const UploadInput = document.querySelector('#image-Upload');

bannerImage.addEventListener('change', () => {
    UploadImage(bannerImage, "banner");
})

UploadInput.addEventListener('change', () => {
    UploadImage(UploadInput, "image");
})

const UploadImage = (UploadFile, UploadType) => {
    const [file] = UploadFile.files;
    if (file && file.type.includes("image")) {
        const formdata = new FormData();
        formdata.append('image', file);

        fetch('/Upload', {
            method: 'post',
            body: formdata
        }).then(res => res.json())
            .then(data => {
                if (UploadType == "image") {
                    addImage(data, file.name);

                } else {
                    bannerPath = '${location.origin}/${data}';
                    banner.style.backgroundImage = 'url("${bannerPath}")';

                }

            })
    } else {

        alert("Upload Image only");

    }
}

const addImage = (imagepath, alt) => {
    let CurPos = articleField.selectionStart;
    let textToInsert = '\r![${alt}](${imagepath})\r';
    articleField.value = articleField.value.slice(0, CurPos) + textToInsert +
        articleField.value.slice(CurPos);
}

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

publishBtn.addEventListener('click', () => {
    if (articleField.value.length && blogTitleField.value.length) {
        let letters = 'abcdefghijklmnopqrstuvwxyz';
        let blogTitle = blogTitleField.value.split(" ").join("-");
        let id = '';
        for (let i = 0; i < 4; i++) {
            id += letters[Math.floor(Math.random() * letters.length)];
        }

        let docName = '${blogTitle}-${id}';
        let date = new Date();

        db.collection("blogs").doc(docName).set({
            title: blogTitleField.value,
            articleField: articleField.value,
            bannerImage: bannerPath,
            publishedAt: '${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}'
        })
            .then(() => {
                console.href = '/${docName}';
            })
            .catch((err) => {
                console.error(err);
            })
    }
})