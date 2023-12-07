const express = require("express")
const app = express()
const path = require("path")
const ejs = require("ejs")

//Burada ejs ile .html dosyalarını .ejs çevirerek kullanma işlemi yapmaktayız.
app.set("view engine" ,"ejs")

const blog = { id: 1, title: "Blog title", description: "Blog description" }

//Burada public dosyasında bulunan verileri kullanma işlemini yapmamızı sağlar. 
app.use(express.static("public"))

app.get("/",(req,res) => {
    res.render("index")
})

app.get("/about",(req,res) => {
    res.render("about")
})

app.get("/addpost",(req,res) => {
    res.render("add_post")
})


const port = 3000

app.listen(port , () => {
    console.log(`Server  ${port} portunda çalışıyor.  `)
})