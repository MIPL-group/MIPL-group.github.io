function init() {
    n = 0;
}


function list() {
    if (document.getElementById("USER_DROPDOWN_ID").getAttribute("aria_expanded") == "true") {
        document.getElementById("USER_DROPDOWN_ID").setAttribute("aria_expanded", "false");
        document.body.removeChild(document.body.lastChild);
    } else {
        if (n == 0) {
            n = 1;
            document.getElementsByClassName("_3jiriKeNer8y0-1r6oWIFM _3rS8YTDjcT7fs0k9W4rxDG")[0].innerHTML += page(document.getElementById("user").getAttribute("user"));
        } else {
            n = 0
            document.getElementsByClassName("_3jiriKeNer8y0-1r6oWIFM _3rS8YTDjcT7fs0k9W4rxDG")[0]
                .removeChild(document.getElementsByClassName("_3jiriKeNer8y0-1r6oWIFM _3rS8YTDjcT7fs0k9W4rxDG")[0].lastChild);
        }
    }
}

function menu() {
    if (document.getElementById("USER_DROPDOWN_ID").getAttribute("aria_expanded") == "true") {

        document.body.removeChild(document.body.lastChild);

        document.getElementById("USER_DROPDOWN_ID").setAttribute("aria_expanded", "false");

    } else {

        if (n == 0) {
            document.getElementById("USER_DROPDOWN_ID").setAttribute("aria_expanded", "true");
            document.body.innerHTML +=
                "<div class><button class=\"_1YWXCINvcuU7nk0ED-bta8\"><a data-redditstyle=\"true\" href=\"../index.html\"><div class=\"vzhy90YD0qH7ZDJi7xMGw\">Log Out</div></a></button></div>";
        } else {
            n = 0;
            document.getElementsByClassName("_3jiriKeNer8y0-1r6oWIFM _3rS8YTDjcT7fs0k9W4rxDG")[0]
                .removeChild(document.getElementsByClassName("_3jiriKeNer8y0-1r6oWIFM _3rS8YTDjcT7fs0k9W4rxDG")[0].lastChild);
        }
    }
}



function page(user) {
    if (user == "A") {
        return (
            `<div role="menu" class="TMMvbwyeh9yuHKmQWHrE3">
        <div aria-live="assertive" aria-label=""></div>
        <div class="_1Ok0AiXwAeYl2SsUBaxgPC _2XRPX11qL4-HxWPuHAzOW5" role="heading">Reddit Feeds</div>
        <a id="focus-Home" role="menuitem" class="_26MVepkxZHzpNv1cuAA4JA _2MgAHlPDdKvXiG-Qbz5cbC " tabindex="-1" aria-label="/" href="../signup.html"><span class="_1nBP1OfpQDgTmzRFqaVult">Home</span></a>
        <br><a id="focus-Home" role="menuitem" class="_26MVepkxZHzpNv1cuAA4JA _2MgAHlPDdKvXiG-Qbz5cbC " tabindex="-1" aria-label="/" href="../signup.html"><span class="_1nBP1OfpQDgTmzRFqaVult">Popular</span></a>
        <br><a id="focus-Home" role="menuitem" class="_26MVepkxZHzpNv1cuAA4JA _2MgAHlPDdKvXiG-Qbz5cbC " tabindex="-1" aria-label="/" href="../signup.html"><span class="_1nBP1OfpQDgTmzRFqaVult">All</span></a>
        <br><a id="focus-Home" role="menuitem" class="_26MVepkxZHzpNv1cuAA4JA _2MgAHlPDdKvXiG-Qbz5cbC " tabindex="-1" aria-label="/" href="../signup.html"><span class="_1nBP1OfpQDgTmzRFqaVult">Top</span></a>
        <div class="_1Ok0AiXwAeYl2SsUBaxgPC _2XRPX11qL4-HxWPuHAzOW5" role="heading">My Communities</div>
        <a class="XEkFoehJNxIH9Wlr5Ilzd _2MgAHlPDdKvXiG-Qbz5cbC " id="focus-subt5_2qh22" role="menuitem" tabindex="-1" aria-label="r/ps4" href="A.html"><span class="_2aqH0n-kSzFY7HZZ5GL-Jb">r/ps4</span></a>
        <br><a class="XEkFoehJNxIH9Wlr5Ilzd _2MgAHlPDdKvXiG-Qbz5cbC " id="focus-subt5_2rh_22" role="menuitem" tabindex="-1" aria-label="r/xboxobe" href="A.html"><span class="_2aqH0n-kSzFY7HZZ5GL-Jb">r/xboxone</span></a>
        <br><a class="XEkFoehJNxIH9Wlr5Ilzd _2MgAHlPDdKvXiG-Qbz5cbC " id="focus-subt5_2p_h22" role="menuitem" tabindex="-1" aria-label="r/switch" href="A.html"><span class="_2aqH0n-kSzFY7HZZ5GL-Jb">r/switch</span></a>
        <br><a class="XEkFoehJNxIH9Wlr5Ilzd _2MgAHlPDdKvXiG-Qbz5cbC " id="focus-subt5_2c_r22" role="menuitem" tabindex="-1" aria-label="r/gameboy" href="A.html"><span class="_2aqH0n-kSzFY7HZZ5GL-Jb">r/gameboy</span></a>
        <br><a class="XEkFoehJNxIH9Wlr5Ilzd _2MgAHlPDdKvXiG-Qbz5cbC " id="focus-subt5_2q_h22" role="menuitem" tabindex="-1" aria-label="r/wii" href="A.html"><span class="_2aqH0n-kSzFY7HZZ5GL-Jb">r/wii</span></a>
        <div class="_1Ok0AiXwAeYl2SsUBaxgPC _2XRPX11qL4-HxWPuHAzOW5" role="heading">Other</div>
        <a id="focus-CreatePost" role="menuitem" class="_26MVepkxZHzpNv1cuAA4JA _2MgAHlPDdKvXiG-Qbz5cbC " tabindex="-1" aria-label="/submit" href="../signup.html"><span class="_1nBP1OfpQDgTmzRFqaVult">Coins</span></a>
        <br><a id="focus-CreatePost" role="menuitem" class="_26MVepkxZHzpNv1cuAA4JA _2MgAHlPDdKvXiG-Qbz5cbC " tabindex="-1" aria-label="/submit" href="../signup.html"><span class="_1nBP1OfpQDgTmzRFqaVult">Premium</span></a>
        </div>`
        );
    }
    if (user == "B") {
        return (
            `<div role="menu" class="TMMvbwyeh9yuHKmQWHrE3">
        <div aria-live="assertive" aria-label=""></div>
        <div class="_1Ok0AiXwAeYl2SsUBaxgPC _2XRPX11qL4-HxWPuHAzOW5" role="heading">Reddit Feeds</div>
        <a id="focus-Home" role="menuitem" class="_26MVepkxZHzpNv1cuAA4JA _2MgAHlPDdKvXiG-Qbz5cbC " tabindex="-1" aria-label="/" href="../signup.html"><span class="_1nBP1OfpQDgTmzRFqaVult">Home</span></a>
        <br><a id="focus-Home" role="menuitem" class="_26MVepkxZHzpNv1cuAA4JA _2MgAHlPDdKvXiG-Qbz5cbC " tabindex="-1" aria-label="/" href="../signup.html"><span class="_1nBP1OfpQDgTmzRFqaVult">Popular</span></a>
        <br><a id="focus-Home" role="menuitem" class="_26MVepkxZHzpNv1cuAA4JA _2MgAHlPDdKvXiG-Qbz5cbC " tabindex="-1" aria-label="/" href="../signup.html"><span class="_1nBP1OfpQDgTmzRFqaVult">All</span></a>
        <br><a id="focus-Home" role="menuitem" class="_26MVepkxZHzpNv1cuAA4JA _2MgAHlPDdKvXiG-Qbz5cbC " tabindex="-1" aria-label="/" href="../signup.html"><span class="_1nBP1OfpQDgTmzRFqaVult">Top</span></a>
        <div class="_1Ok0AiXwAeYl2SsUBaxgPC _2XRPX11qL4-HxWPuHAzOW5" role="heading">My Communities</div>
        <a class="XEkFoehJNxIH9Wlr5Ilzd _2MgAHlPDdKvXiG-Qbz5cbC " id="focus-subt5_2qh22" role="menuitem" tabindex="-1" aria-label="r/NBA" href="B.html"><span class="_2aqH0n-kSzFY7HZZ5GL-Jb">r/NBA</span></a>
        <br><a class="XEkFoehJNxIH9Wlr5Ilzd _2MgAHlPDdKvXiG-Qbz5cbC " id="focus-subt5_2rah_22" role="menuitem" tabindex="-1" aria-label="r/WNBA" href="B.html"><span class="_2aqH0n-kSzFY7HZZ5GL-Jb">r/WNBA</span></a>
        <br><a class="XEkFoehJNxIH9Wlr5Ilzd _2MgAHlPDdKvXiG-Qbz5cbC " id="focus-subt5_2p_ch22" role="menuitem" tabindex="-1" aria-label="r/MMA" href="B.html"><span class="_2aqH0n-kSzFY7HZZ5GL-Jb">r/MMA</span></a>
        <br><a class="XEkFoehJNxIH9Wlr5Ilzd _2MgAHlPDdKvXiG-Qbz5cbC " id="focus-subt5_2c_qr22" role="menuitem" tabindex="-1" aria-label="r/WWE" href="B.html"><span class="_2aqH0n-kSzFY7HZZ5GL-Jb">r/WWE</span></a>
        <br><a class="XEkFoehJNxIH9Wlr5Ilzd _2MgAHlPDdKvXiG-Qbz5cbC " id="focus-subt5_2q_th22" role="menuitem" tabindex="-1" aria-label="r/NFL" href="B.html"><span class="_2aqH0n-kSzFY7HZZ5GL-Jb">r/NFL</span></a>
        <br><a class="XEkFoehJNxIH9Wlr5Ilzd _2MgAHlPDdKvXiG-Qbz5cbC " id="focus-subt5_2q_ph22" role="menuitem" tabindex="-1" aria-label="r/NBL" href="B.html"><span class="_2aqH0n-kSzFY7HZZ5GL-Jb">r/NBL</span></a> 
        <div class="_1Ok0AiXwAeYl2SsUBaxgPC _2XRPX11qL4-HxWPuHAzOW5" role="heading">Other</div>
        <a id="focus-CreatePost" role="menuitem" class="_26MVepkxZHzpNv1cuAA4JA _2MgAHlPDdKvXiG-Qbz5cbC " tabindex="-1" aria-label="/submit" href="../signup.html"><span class="_1nBP1OfpQDgTmzRFqaVult">Coins</span></a>
        <br><a id="focus-CreatePost" role="menuitem" class="_26MVepkxZHzpNv1cuAA4JA _2MgAHlPDdKvXiG-Qbz5cbC " tabindex="-1" aria-label="/submit" href="../signup.html"><span class="_1nBP1OfpQDgTmzRFqaVult">Premium</span></a>
        </div>`
        );
    }
}

init();