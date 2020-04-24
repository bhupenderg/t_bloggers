const Post = require('../models/Post');

exports.viewCreateScreen = (req, res) => {
    res.render('create-post');
}

exports.create = function(req, res) {
    let post = new Post(req.body, req.session.user._id);
    post.create().then(() => {
        res.send("Post created successfully.")
    }).catch((err) => {
        res.send(err);
    })
}

exports.viewSingle = async function(req, res) {
    try{const post = await Post.findSingleById(req.params.id);
        res.render('single-post-screen', {post: 'hmm'}
        
        )
        console.log(post)
    } 
        
    catch{
        res.send("Error 404");
    }
    
}