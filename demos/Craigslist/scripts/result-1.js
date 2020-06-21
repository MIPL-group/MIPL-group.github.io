(function() {
    function init() {
        console.log('js init');
        var phone = document.querySelector("#phone");
        var email = document.querySelector("#email");
        hideShow(phone);
        hideShow(email);
        document.querySelector('#email-btn').addEventListener("click", function(){hideShow(email);});
        document.querySelector('#phone-btn').addEventListener("click", function(){hideShow(phone);});
    }
    function hideShow(element) {
        if(element.style.display === 'none') {
            element.style.display = 'inline-block';
        } else {
            element.style.display = 'none';
        }
    }

    init();
})();