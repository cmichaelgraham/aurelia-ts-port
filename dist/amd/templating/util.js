define(["require", "exports"], function (require, exports) {
    var capitalMatcher = /([A-Z])/g;
    function addHyphenAndLower(char) {
        return "-" + char.toLowerCase();
    }
    function hyphenate(name) {
        return (name.charAt(0).toLowerCase() + name.slice(1)).replace(capitalMatcher, addHyphenAndLower);
    }
    exports.hyphenate = hyphenate;
    function nextElementSibling(element) {
        if (element.nextElementSibling) {
            return element.nextElementSibling;
        }
        do {
            element = element.nextSibling;
        } while (element && element.nodeType !== 1);
        return element;
    }
    exports.nextElementSibling = nextElementSibling;
});
