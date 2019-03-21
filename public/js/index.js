$("document").ready(function () {

    // event handler that checks if the user is authenticated when they click an auth-only action.
    $(".auth-req").click(function (e) {
        if ($("#auth").text() == "false") {
            alert("You must be logged in to do that.")
            e.stopImmediatePropagation();
            return false;
        }
    });


});