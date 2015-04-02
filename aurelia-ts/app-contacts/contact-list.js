define(["require", "exports", '../event-aggregator/index', './web-api', './messages'], function (require, exports, _index, _web_api, _messages) {
    var ContactList = (function () {
        function ContactList(api, ea) {
            var _this = this;
            this.api = api;
            this.contacts = [];
            ea.subscribe(_messages.ContactViewed, function (msg) {
                return _this.select(msg.contact);
            });
            ea.subscribe(_messages.ContactUpdated, function (msg) {
                var id = msg.contact.id;
                var found = _this.contacts.filter(function (x) {
                    return x.id == id;
                })[0];
                Object.assign(found, msg.contact);
            });
        }
        ContactList.inject = function () {
            return [
                _web_api.WebAPI,
                _index.EventAggregator
            ];
        };
        ContactList.prototype.created = function () {
            var _this = this;
            this.api.getContactList().then(function (contacts) {
                _this.contacts = contacts;
            });
        };
        ContactList.prototype.select = function (contact) {
            this.selectedId = contact.id;
            return true;
        };
        return ContactList;
    })();
    exports.ContactList = ContactList;
});
