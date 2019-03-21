let Subreddit = require("../models/subreddit");
let Post = require("../models/post");
let Profile = require("../models/profile");
let PostState = require("../models/postState")

exports.get_all = function (req, res) {
    let subreddits = undefined;
    let posts = undefined;
    let karma = 0;
    let sort = undefined;
    
   // let subreddits = null;
    //let posts = null;
    //let karma = 0;
    //let sort = null;

    switch (req.query.sort) {
        case "top":
            sort = {
                votes: -1
            }
            break;
        case "new":
            sort = {
                time: -1
            }
            break;
        case "old":
            sort = {
                time: 1
            }
            break;
        default:
            sort = {
                votes: -1
            }
    }

    Profile.find({
        username: req.session.user
    }, function (err, result) {
        if (err) throw err;

        if (result.length) {
            karma = result[0]['karma_post'] + result[0]['karma_comment']
        }
    }).then(function () {
        Subreddit.find({}, function (err, doc) {
            if (err) throw err;

            if (doc.length) {
                subreddits = doc
            }
        }).then(function () {
            PostState.find({
                username: req.session.user
            }, function (err, doc) {
                if (err) throw err;

                if (doc.length) {
                    postStates = doc
                }
            }).then(function () {
                Post.find({}).sort(sort).exec(function (err, result) {
                    if (err) throw err;
                    if (result.length) {
                        posts = result
                    }
                    res.render("./front/front", {
                        posts: posts,
                        subreddits: subreddits,
                        karma: karma,
                        isAuth: req.isAuthenticated()
                    })
                });
            });
        });
    });
}