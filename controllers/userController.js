const User = require('../models/Users')


exports.mustBeLoggedIn = (req, res, next) => {
  if(req.session.user) {
    next();
  }

  else {
    req.flash("errors", "You mus be logged in to create a post.");
    req.session.save(() => {
      res.redirect('/');
    })
  }
}

exports.userLogin = (req, res) => {
  let user = new User(req.body);
  user.login()
  .then(() => {
    req.session.user = {
      favColor: 'green',
      username: user.data.username,
      _id: user.data._id
    }
    if(req.session.user) {
      req.session.save(() => {
             res.redirect('/');
           })
    }
  
    else{
      req.flash('errors', e)
      req.session.save(function() {
        res.redirect('/')
      })
    }
  })
  .catch((err) => {
    res.send(err);
  })
  


}

exports.userLogout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
  
}


exports.userRegister = (req, res) => {
    const user = new User(req.body);
    user.register().then(() => {
      req.session.user = {username: user.data.username, _id: user.data._id}
      req.session.save(() => {
        res.redirect('/');
      })
    }).catch((regErros) => {
        regErros.forEach((error) => {
            reg.flash('regErrors', error)
        })

        req.session.save(() => {
          res.redirect('/');
        })
    });
    if (user.errors.length) {
        res.send(user.errors)
      } else {
        res.send("Congrats, there are no errors.")
      }
    
}

exports.homePage = function(req, res){
  if(req.session.user) {
    res.render('home-dashboard', {username: req.session.user.username});
  }

  else {
    res.render('home-guest');
  }
}