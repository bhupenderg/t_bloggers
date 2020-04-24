const bcrypt = require("bcryptjs")
const validator = require("validator")
//const userCollection = require('../db')


const Users = function(data) {
    this.data = data;
    this.errors = [];
}

Users.prototype.cleanUp = function() {
    if (typeof(this.data.username) != "string") {this.data.username = ""}
    if (typeof(this.data.email) != "string") {this.data.email = ""}
    if (typeof(this.data.password) != "string") {this.data.password = ""}
  
    // get rid of any bogus properties
    this.data = {
      username: this.data.username.trim().toLowerCase(),
      email: this.data.email.trim().toLowerCase(),
      password: this.data.password
    }
  }

  Users.prototype.validate = function() {
    if (this.data.username == "") {this.errors.push("You must provide a username.")}
    if (this.data.username != "" && !validator.isAlphanumeric(this.data.username)) {this.errors.push("Username can only contain letters and numbers.")}
    if (!validator.isEmail(this.data.email)) {this.errors.push("You must provide a valid email address.")}
    if (this.data.password == "") {this.errors.push("You must provide a password.")}
    if (this.data.password.length > 0 && this.data.password.length < 8) {this.errors.push("Password must be at least 12 characters.")}
    if (this.data.password.length > 50) {this.errors.push("Password cannot exceed 50 characters.")}
    if (this.data.username.length > 0 && this.data.username.length < 3) {this.errors.push("Username must be at least 3 characters.")}
    if (this.data.username.length > 30) {this.errors.push("Username cannot exceed 30 characters.")}
  }

  // Callback approach

Users.prototype.login = function(callback) {

    const userCollection = require('../db')

    return new Promise ((resolve, reject) => {
        this.cleanUp();
    userCollection.db().collection('users').findOne({username: this.data.username}, (err, attemptedUser) => {
            if(attemptedUser && attemptedUser.password == this.data.password ) {
                resolve("Welcome, you are logged in!");
            }
            else {
                reject("Invalid username and password");
            }
    })
    })
    
    
}

// Promises

// Users.prototype.login = function() {
//     return new Promise((resolve, reject) => {
//         this.cleanUp();
//     userCollection.db.collection('users_data').findOne({username: this.data.username}).then((attemptedUser => {
//         if(attemptedUser && attemptedUser.paasword == this.data.paasword) {
//             resolve("Welcome, you are logged in!");
//         }
//         else {
//             reject("Invalid username or password");
//         }
//     }).catch(() => {
//         reject('Please try again later')
//     })

// })

// }


    // Users.prototype.login = function() {
    //     return new Promise((resolve, reject) => {
    //       this.cleanUp()
    //       usersCollection.db.collection('users_data').findOne({username: this.data.username}).then((attemptedUser) => {
    //         if (attemptedUser && attemptedUser.password == this.data.password) {
    //           resolve("Congrats!")
    //         } else {
    //           reject("Invalid username / password.")
    //         }
    //       }).catch(function() {
    //         reject("Please try again later.")
    //       })
    //     })
    //   }
      

            
Users.prototype.register = function() {

    return new Promise((resolve, reject) => {
        this.cleanUp();
    this.validate();

    // if ther is no error send data to the database

    if(!this.errors.length) {

        const userCollection = require('../db')
            // hash password
      //  let salt = bcrypt.genSaltSync(10)
      //  this.data.password = bcrypt.hashSync(this.data.password, salt)
        //userCollection.collection("users_data").insertOne(this.data);
   
        userCollection.db().collection('users').insertOne(this.data).then(() => {
        resolve()
    }).catch(() => {
        this.errors.push("Please come back later!")
                reject(this.errors);
    })
    }
    })
    
}

module.exports = Users;