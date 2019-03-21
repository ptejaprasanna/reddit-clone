$("document").ready(function () {

    //event handler for reply
    /*
    
    */
    
    
    // event handler for upvoting a comment
    $(".upvote-comment").click(function () {
        let down_arrow = $(this).parent().find(".downvote-comment")
        let query = $(this).closest('article')

        let ref = query.data('ref')
        let votes = query.find('.comment-votes')
        let comment_user = query.find('.comment-user').text()
        let counter;

     
        // toggle off 
        if ($(this).hasClass("up-enabled")) {
            counter = votes.text();
            votes.text(--counter);
            $(this).removeClass("up-enabled");

            $.ajax({
                type: "put",
                url: `/vote/comment/${ref}`,
                data: {
                    vote: counter,
                    state: "neutral",
                    action: "decrement",
                    user: comment_user
                }
            });
            return false;
        }

        // downvote
        if (down_arrow.hasClass('down-enabled')) {
            down_arrow.removeClass("down-enabled");
            counter = votes.text();
            votes.text(++counter);

            $.ajax({
                type: "put",
                url: `/vote/comment/${ref}`,
                data: {
                    vote: counter,
                    state: "neutral",
                    action: "increment",
                    user: comment_user
                }
            });
        }

        // upvote
        else if (!$(this).hasClass("up-enabled")) {
            counter = votes.text();
            votes.text(++counter);
            $(this).addClass("up-enabled");

            $.ajax({
                type: "put",
                url: `/vote/comment/${ref}`,
                data: {
                    vote: counter,
                    state: "up",
                    action: "increment",
                    user: comment_user
                }
            });
        }
        return false;
    })

    // event handler for downvoting a comment
    $(".downvote-comment").click(function () {
        let up_arrow = $(this).parent().find(".upvote-comment")
        let query = $(this).closest('article')

        let ref = query.data('ref')
        let votes = query.find('.comment-votes')
        let comment_user = query.find('.comment-user').text()
        let counter;


        if ($(this).hasClass("down-enabled")) {
            counter = votes.text();
            votes.text(++counter);
            $(this).removeClass("down-enabled");

            $.ajax({
                type: "put",
                url: `/vote/comment/${ref}`,
                data: {
                    vote: counter,
                    state: "neutral",
                    action: "increment",
                    user: comment_user
                }
            });
            return false;
        }


        if (up_arrow.hasClass('up-enabled')) {
            up_arrow.removeClass("up-enabled");
            counter = votes.text();
            votes.text(--counter);

            $.ajax({
                type: "put",
                url: `/vote/comment/${ref}`,
                data: {
                    vote: counter,
                    state: "neutral",
                    action: "decrement",
                    user: comment_user
                }
            });

    
        } else if (!$(this).hasClass("down-enabled")) {
            counter = votes.text();
            votes.text(--counter);
            $(this).addClass("down-enabled");

            $.ajax({
                type: "put",
                url: `/vote/comment/${ref}`,
                data: {
                    vote: counter,
                    state: "down",
                    action: "decrement",
                    user: comment_user
                }
            });
        }
        return false;
    });
});