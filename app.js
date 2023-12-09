const express = require("express")
const app = express()
const path = require("path")
const ejs = require("ejs")
const Blog = require("./models/Blog")

//Burada ejs ile .html dosyalarını .ejs çevirerek kullanma işlemi yapmaktayız.
app.set("view engine" ,"ejs")


//const blog = { id: 1, title: "Blog title", description: "Blog description" }

//Burada public dosyasında bulunan verileri kullanma işlemini yapmamızı sağlar. 
app.use(express.static("public"))
app.use(express.urlencoded({extended : true}))//Bu işlem url deki datayı okumamızı sağlar.
app.use(express.json())//Buradaki işlem url deki data yı json formatına çevirir.


app.get("/",async (req,res) => {
    //Buradaki işlem sayesinde index.ejs sayfasına veri gönderme ve gönderdiğimiz isimle kullanabilmemize olanak sağlamaktadır.
    const blog = await Blog.find({})
    res.render("index",{blog})
})

app.get("/about",(req,res) => {
    res.render("about")
})

app.get("/addpost",(req,res) => {
    res.render("add_post")
})

app.get("/post/:id", async (req,res) => {
    console.log(req.params.id)//Bu işlem snoucunda url de gelen id paramtre olarak almış oluruz.
    const blog = await Blog.find({_id : req.params.id})//Bu işlemde ise arama işlemi yaparız.
    res.render("post",{blog})//Bu işlem "post" sayfasına parametre olarak bulunan blog verilmiş olur.
})
//Burada add_post ile gönderilen işlemleri yakalama işlemi yapmaktayız.
//Ayrıca ordaki tüm input değerlerine name parametresi mongoose-model ile belirtilen şekilde verilmelidir.
app.post("/post",async (req,res) => {
    console.log(req.body)
    await Blog.create(req.body)
    res.redirect("/")
})


const port = 3000

app.listen(port , () => {
    console.log(`Server  ${port} portunda çalışıyor.  `)
})