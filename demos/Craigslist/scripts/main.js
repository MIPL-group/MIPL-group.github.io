(function() {
    function init() {
        var filterSet = document.querySelector("#filter-set");
        hideElement(filterSet);
        console.log('js init');
        document.querySelector('#filter-btn').addEventListener("click", function(){showElement(filterSet);});
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