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
const Blog = mongoose.model('Blog', blogSchema);

//Burada yukarıda belirlenen model dışarı çıkartma işlemi yapılmaktadır.
module.exports = Blog 