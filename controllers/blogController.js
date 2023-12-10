const Blog = require("../models/Blog")


exports.getAllPost = async (req,res) => {
    //Buradaki işlem sayesinde index.ejs sayfasına veri gönderme ve gönderdiğimiz isimle kullanabilmemize olanak sağlamaktadır.
    const blog = await Blog.find({})
    res.render("index",{blog})
}

exports.getPost = async (req,res) => {
    //console.log(req.params.id)//Bu işlem snoucunda url de gelen id paramtre olarak almış oluruz.
    const blog = await Blog.find({_id : req.params.id})//Bu işlemde ise arama işlemi yaparız.
    res.render("post",{blog})//Bu işlem "post" sayfasına parametre olarak bulunan blog verilmiş olur.
}

exports.addPost = async (req,res) => {
    //console.log(req.body)
    await Blog.create(req.body)
    res.redirect("/")
}

exports.updatePost = async (req,res) => {
    console.log(req.params.id)
    const blog = await Blog.find({_id : req.params.id})
    res.render("update_post",{blog})
}

//Güncelleme işleminin veritabanına geçirilmesi işlemi
exports.updatePostController = async (req,res) => {
    //console.log("*************dsadsadassdassadd**********")
    console.log(req.body)
     await Blog.updateOne({_id : req.params.id},{title:req.body.title ,message:req.body.message ,name:req.body.name})
     res.redirect(`/post/${req.params.id}`)
}

//Yakalanan silme işleminin veritababnına uygulanması 
exports.deletePost = async (req,res) => {
    //console.log(req.params.id)
    await Blog.deleteOne({_id:req.params.id})
    res.redirect("/")
}
