let Post = require("../models/post");
let Profile = require("../models/profile");
let PostState = require("../models/postState")
//let CommentState = require("../models/commentState")

exports.check = function (req, res) {
    PostState.find({
        username: req.session.user
    }, function (err, doc) {
        if (err) throw err

        if (doc.length) {
            res.send(doc)
        }
    })
}

exports.vote = function (req, res) {
    console.log(req.params.id)


    if (req.body.action == "increment") {
        console.log("increment")
        Profile.update({
            username: req.body.user
        }, {
            $inc: {
                karma_post: 1
            }
        }, function (err, result) {
            if (err) throw err;

            if (result) {
                console.log(`votes increased!`)
                //console.log(`post number: []`)
            }
        });
    } else if (req.body.action == "decrement") {
        console.log("decrement")

        Profile.update({
            username: req.body.user
        }, {
            $inc: {
                karma_post: -1
            }
        }, function (err, result) {
            if (err) throw err;

            if (result) {
                console.log(`votes decreased!`)
                 //console.log(`post number: []`)
            }
        });
    }

    let query = {
        username: req.session.user,
        ref: req.params.id
    };
    let update = {
        vote: req.body.state
    };
    let options = {
        upsert: true,
        setDefaultsOnInsert: true
    };

    Post.update({
        _id: req.params.id
    }, {
        votes: req.body.vote
    }, function (err, result) {
        if (err) throw err;

        if (result) {
            console.log(`vote count changed!`)
            
        }
    })


    PostState.findOneAndUpdate(query, update, options, function (err, result) {
        if (err) throw err;

        if (result) {
            console.log(`vote count changed!`)
            res.send("OK")
        }
    })
}