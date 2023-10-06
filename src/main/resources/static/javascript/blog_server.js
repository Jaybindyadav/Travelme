const express = require('express');
const path = require('path');
const fileUpload = require('express-fileUpload');

let initial_path = path.join(__dirname, "public");
const app = express();
app.Use(express.static(initial_path));
app.Use(fileUpload());

app.get('/', (req, res) => {
    res.SendFile(path.join(initial_path, "#"));
})

app.get('/', (req, res) => {
    res.SendFile(path.join(initial_path, "blog_1.html"));
})

app.post('/Upload', (req, res) => {
    let file = req.files.image;
    let date = new Date();
    let imagename = date.getDate() + date.getTime() + file.name;
    let path = 'public/Uploads/' + imagename;

    file.mv(path, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.joson('Uploads/${imagename}')
        }
    })
})

app.get("/:blog", (req, res) => {
    res.SendFile(path.join(initial_path, "blog_2.html"));
})

app.Use((req, res) => {
    res.joson("404");
})

app.listen("3000", () => {
    console.log('listening...............');
})