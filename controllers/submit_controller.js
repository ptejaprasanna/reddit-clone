let Subreddit = require("../models/subreddit");
let Post = require("../models/post");
let Profile = require("../models/profile");

exports.subreddit_post_view = function (req, res) {
    let karma = 0

    Profile.find({
        username: req.session.user
    }, function (err, result) {
        if (err) throw err;

        if (result.length) {
            karma = result[0]['karma_post'] + result[0]['karma_comment']
        }
    });

    Profile.find({
        username: req.session.user,
    }, function (err, doc) {
        if (err) throw err;

        if (!doc.length) {
            // res.send("Unable to find subreddit state")
            return;
        }
    }).then(function () {
        Subreddit.find({
            name: req.params.subreddit
        }, function (err, doc) {
            if (err) throw err

            if (doc.length) {
                res.render('./subreddit/subreddit_post', {
                    info: doc[0],
                    karma: karma,
                    isAuth: req.isAuthenticated(),
                })
            }
        })
    })
}
exports.subreddit_post = function (req, res) {
    Post({
        title: req.body.title,
        body: req.body.body,
        username: req.session.user,
        type: "post",
        subreddit: req.params.subreddit,
    }).save(function (err, doc) {
        if (err) throw err;

        console.log(`post submitted!`)
        res.redirect(`/r/${req.params.subreddit}`)
    })
}
exports.subreddit_link_view = function (req, res) {
    let karma = 0

    Profile.find({
        username: req.session.user
    }, function (err, result) {
        if (err) throw err;

        if (result.length) {
            karma = result[0]['karma_post'] + result[0]['karma_comment']
        }
    });


    Profile.find({
        username: req.session.user,
    }, function (err, doc) {
        if (err) throw err;

        if (!doc.length) {
            // res.send("Unable to find subreddit state")
            return;
        }
    }).then(function () {
        Subreddit.find({
            name: req.params.subreddit
        }, function (err, doc) {
            if (err) throw err

            if (doc.length) {
                res.render('./subreddit/subreddit_link', {
                    info: doc[0],
                    karma: karma,
                    isAuth: req.isAuthenticated(),
                })
            }
        })
    })
}
/*
exports.subreddit_link = function (req, res) {
    let type = "link"

    Post({
        title: req.body.title,
        body: req.body.body,
        username: req.session.user,
        type: type,
        link: req.body.link,
        subreddit: req.params.subreddit,
    }).save(function (err, doc) {
        if (err) throw error;

        console.log(`link submitted!`)
        res.redirect(`/r/${req.params.subreddit}`)
    })
}
*/

// SUBMITING A POST
exports.front_post = function (req, res) {
    Post({
        title: req.body.title,
        body: req.body.text,
        username: req.session.user,
        type: "post",
        subreddit: req.body.subreddit,
    }).save(function (err, doc) {
        if (err) throw err;

        //console.log(`[Frontpage] post submitted to [${req.body.subreddit}]`)
        res.redirect(`/r/${req.body.subreddit}/${doc._id}/comments`);
    });
}


// SUBMITING A SUBREDDIT
exports.subreddit = function (req, res) {
    Profile.update({
            username: req.session.user
        }, {
            $push: {
                owned: req.body.subreddit
            }
        },
        function (err, doc) {
            if (err) throw err;

        }).then(function () {
        Subreddit({
            name: req.body.subreddit,
            description: req.body.description
        }).save(function (err, doc) {
            if (err) throw err

            console.log(`subreddit created`)
            res.redirect(`/r/${req.body.subreddit}`);
        });
    });
}


exports.front_post_view = function (req, res) {
    let karma = 0;

    Profile.find({
        username: req.session.user
    }, function (err, result) {
        if (err) throw err;

        if (result.length) {
            karma = result[0]['karma_post'] + result[0]['karma_comment']

        }

        res.render("./front/front_post", {
            isAuth: req.isAuthenticated(),
            karma: karma
        });
    })
}

exports.front_post_view = function (req, res) {
    let karma = 0;

    Profile.find({
        username: req.session.user
    }, function (err, result) {
        if (err) throw err;

        if (result.length) {
            karma = result[0]['karma_post'] + result[0]['karma_comment']

        }

        res.render("./front/front_post", {
            isAuth: req.isAuthenticated(),
            karma: karma
        });
    })
}
exports.front_link_view = function (req, res) {
    let karma = 0;

    Profile.find({
        username: req.session.user
    }, function (err, result) {
        if (err) throw err;

        if (result.length) {
            karma = result[0]['karma_post'] + result[0]['karma_comment']
        }

        res.render("./front/front_link", {
            isAuth: req.isAuthenticated(),
            karma: karma
        });
    })
}
exports.subreddit_view = function (req, res) {
    let karma = 0;

    Profile.find({
        username: req.session.user
    }, function (err, result) {
        if (err) throw err;

        if (result.length) {
            karma = result[0]['karma_post'] + result[0]['karma_comment']
        }

        res.render("./front/front_subreddit", {
            isAuth: req.isAuthenticated(),
            karma: karma
        });
    })
}