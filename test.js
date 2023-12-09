const mongoose = require("mongoose")

main().catch(err => console.log(err));

//Veritabani oluşturma işlemi eğer varsa bağlanma işlemi...
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/clean-blog-db');
}


//Bu işlem sayesinde nasıl veriler kaydedilecek belirlemiş oluyoruz.
const blogSchema = new mongoose.Schema({
    title: String,
    message : String,
    name : String,
    date : {
        type : Date,
        default : Date.now
    }
});

//Burada model ile veritabanını bağlıyoruz.
const blog = mongoose.model('Blog', blogSchema);

//Veri ekleme işlemi
async function insertBlog(){
    blog.create({
        title : "ASDDSA",
        message : "12312312",
        name : "eee"
    })
}
//insertBlog()

//Verilerin çekilmesi işlemi
async function getBlogs(){
    const data = await blog.find({})
    data.forEach(d => {
        console.log(d.title)
        console.log(d.name)
        console.log(d.message)
    })
}
//getBlogs()

//Veri silme  işlemi 
async function deleteBlogs(){
    //Parametre olarak verilen değer arama ile hangisine yapılacağını belirler. 
    await blog.deleteOne({title : "ASDDSA"})
}
//deleteBlogs()

//Veri güncelleme işlemi...
const id = "65748a12d0854b655cc2cde1"
async function updateData(){
    //burada ilk paramtere arama işlemi için ikinci parametre değiştirme işlemi yapmak için veriliyor
    await blog.updateOne({_id : id},{name : "new-update-name"}) 
}
//updateData()

