$(document).ready(function () {
    $("#debug").click(function () {
        if (debug ? debug = false : debug = true) {
            $("div[class^='row'], div[class*=' row']").css("border", "");
            $("div[class^='col'], div[class*=' col']").css("border", "");
            $("div[class^='row'], div[class*=' row']").css("background-color", "");
            $("div[class^='col'], div[class*=' col']").css("background-color", "");
        } else {
            $("div[class^='row'], div[class*=' row']").css("border", "1px solid rgba(255, 181, 134, 0.50)");
            $("div[class^='col'], div[class*=' col']").css("border", "1px solid rgba(143, 196, 255, 0.50)");
            $("div[class^='row'], div[class*=' row']").css("background-color", "rgba(255, 225, 200, 0.25)");
            $("div[class^='col'], div[class*=' col']").css("background-color", "rgba(200, 225, 255, 0.50)");
        }
    });
});