
    function onClick() {
        var name = document.getElementById("loginUsername")
        if (name.value.length % 2 == 0) {
            window.location.href = "userpage/" + "A" + ".html";
        } else {
            window.location.href = "userpage/" + "B" + ".html";
        }
    }