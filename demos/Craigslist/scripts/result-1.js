(function() {
    function init() {
        console.log('js init');
        var phone = document.querySelector("#phone");
        var email = document.querySelector("#email");
        hideElement(phone);
        hideElement(email);
        
        document.querySelector('#email-btn').addEventListener("click", function(){showElement(email);});
        document.querySelector('#phone-btn').addEventListener("click", function(){showElement(phone);});
    }
    function hideElement(element) {
        element.style.display = 'none';
    }
    function showElement(element) {
        console.log('show element');
        element.style.display = 'inline-block';
    }
    init();
})();