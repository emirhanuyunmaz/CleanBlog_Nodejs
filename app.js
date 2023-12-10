const express = require("express")
const app = express()
const path = require("path")
const ejs = require("ejs")
const blogController = require("./controllers/blogController")
const pageController = require("./controllers/pageController")
var methodOverride = require('method-override')

//Burada ejs ile .html dosyalarını .ejs çevirerek kullanma işlemi yapmaktayız.
app.set("view engine" ,"ejs")


//const blog = { id: 1, title: "Blog title", description: "Blog description" }

//Burada public dosyasında bulunan verileri kullanma işlemini yapmamızı sağlar. 
app.use(express.static("public"))
app.use(express.urlencoded({extended : true}))//Bu işlem url deki datayı okumamızı sağlar.
app.use(express.json())//Buradaki işlem url deki data yı json formatına çevirir.

app.use(methodOverride("_method",{
    methods :["POST","GET"]
}))//Post ve GET işlemlerini yakalayıp put ve delete işlemi yapma işlemi 

//******** */
app.get("/",blogController.getAllPost)

app.get("/about",pageController.pageAbout)

app.get("/addpost",pageController.pageAdd)

app.get("/post/:id", blogController.getPost)
//Burada add_post ile gönderilen işlemleri yakalama işlemi yapmaktayız.
//Ayrıca ordaki tüm input değerlerine name parametresi mongoose-model ile belirtilen şekilde verilmelidir.
app.post("/post/",blogController.addPost)

app.put("/post/:id",blogController.updatePostController)

app.get("/update/:id",blogController.updatePost)

app.delete("/post/:id",blogController.deletePost)


const port = 3000

app.listen(port , () => {
    console.log(`Server  ${port} portunda çalışıyor.  `)
})