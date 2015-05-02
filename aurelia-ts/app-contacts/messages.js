define(["require", "exports"], function (require, exports) {
    var ContactUpdated = (function () {
        function ContactUpdated(contact) {
            this.contact = contact;
        }
        return ContactUpdated;
    })();
    exports.ContactUpdated = ContactUpdated;
    var ContactViewed = (function () {
        function ContactViewed(contact) {
            this.contact = contact;
        }
        return ContactViewed;
    })();
    exports.ContactViewed = ContactViewed;
});
