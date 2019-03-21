let Post = require("../models/post");
let Comment = require("../models/comment");
let Profile = require("../models/profile");
let CommentState = require("../models/commentState")


exports.check = function (req, res) {
    CommentState.find({
        username: req.session.user
    }, function (err, doc) {
        if (err) throw err

        if (doc.length) {
            res.send(doc)
        }
    })
    /*
    CommentState.findOneAndUpdate(query, update, options, function (err, result) {
        if (err) throw err;

        if (result) {
            console.log(`[${req.session.user}] comment state set!`)
            res.send("OK")
        }
    */
}
exports.comment = function (req, res) {
    Post.update({
        _id: req.params.id
    }, {
        $inc: {
            num_of_comments: 1
        }
    }, function (err, result) {
        if (err) throw err;

        if (!result.length) {
            console.log("something went wrong")
        }
        if (result.length) {
            console.log(`[${req.params.subreddit}] number of comments updated!`)
        }
    })

    Comment({
        body: req.body.comment,
        username: req.session.user,
        ref: req.params.id,
    }).save(function (err, doc) {
        if (err) throw err

        console.log(`[${req.params.subreddit}] comment posted!`)
        res.redirect(`/r/${req.params.subreddit}/${req.params.id}/comments`)
    })
}


exports.vote = function (req, res) {
    if (req.body.action == "increment") {
        console.log("increment")
        Profile.update({
            username: req.body.user
        }, {
            $inc: {
                karma_comment: 1
            }
        }, function (err, result) {
            if (err) throw err;

            if (result) {
                console.log(`[${req.session.user}] comment karma increased!`)
            }
        });
    } else if (req.body.action == "decrement") {
        console.log("decrement")

        Profile.update({
            username: req.body.user
        }, {
            $inc: {
                karma_comment: -1
            }
        }, function (err, result) {
            if (err) throw err;

            if (result) {
                console.log(`[${req.session.user}] comment karma decreased!`)
            }
        });
    }

    Comment.update({
        _id: req.params.id
    }, {
        votes: req.body.vote
    }, function (err, result) {
        if (err) throw err;

        if (result) {
            console.log(`[${req.params.id}] comment vote count changed!`)
        }
    });

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

    CommentState.findOneAndUpdate(query, update, options, function (err, result) {
        if (err) throw err;

        if (result) {
            console.log(`[${req.session.user}] comment state set!`)
            res.send("OK")
        }
    })
}