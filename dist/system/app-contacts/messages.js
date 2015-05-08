System.register([], function(exports_1) {
    var ContactUpdated, ContactViewed;
    return {
        setters:[],
        execute: function() {
            ContactUpdated = (function () {
                function ContactUpdated(contact) {
                    this.contact = contact;
                }
                return ContactUpdated;
            })();
            exports_1("ContactUpdated", ContactUpdated);
            ContactViewed = (function () {
                function ContactViewed(contact) {
                    this.contact = contact;
                }
                return ContactViewed;
            })();
            exports_1("ContactViewed", ContactViewed);
        }
    }
});
