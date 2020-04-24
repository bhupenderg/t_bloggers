const ObjectID = require('mongodb').ObjectID;


const Post = function(data, userid) {
    this.data = data;
    this.errors = [];
    this.userid = userid;
}

Post.prototype.cleanUp = function(){
    if(typeof(this.data.title) != "string") {this.data.title = ""}
    if(typeof(this.data.body) != "string") {this.data.body = ""}

    // get rid of bogus data

    this.data = {
        title : this.data.title.trim(),
        body : this.data.body.trim(),
        createdDate: new Date(),
        author: ObjectID(this.userid)
    }
}

Post.prototype.validate = function(){
    if(this.data.title == "") {this.errors.push("You must provide a title")}
    if(this.data.body == "") {this.errors.push("You must provide a body")}
}

Post.prototype.create = function(){
    let db = require('../db').db().collection('posts');

    return new Promise((resolve, reject) => {
        this.cleanUp();
        this.validate();
        if(!this.errors.length){
            db.insertOne(this.data).then(() => {
                resolve()
            }).catch(() => {
                this.errors.push("Please come back later!")
                reject(this.errors);
            })
        }
    })

    
}

Post.findSingleById = function(id) {

    let db = require('../db').db().collection('posts')
    return new Promise(async function(resolve, reject) {
        if(typeof(id) != "string" || !ObjectID.isValid(id)) {
            reject()
            return
        }

        let post = await db.findOne({_id: new ObjectID(id)})
        if(post){
            resolve()
        }
        else{
            reject()
        }

    })
}

module.exports = Post;