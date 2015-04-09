var __decorate = this.__decorate || function (decorators, target, key, value) {
    var kind = typeof (arguments.length == 2 ? value = target : value);
    for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        switch (kind) {
            case "function": value = decorator(value) || value; break;
            case "number": decorator(target, key, value); break;
            case "undefined": decorator(target, key); break;
            case "object": value = decorator(target, key, value) || value; break;
        }
    }
    return value;
};
define(["require", "exports", '../framework/index', '../event-aggregator/index', './web-api', './messages'], function (require, exports, index_1, index_2, web_api_1, messages_1) {
    var ContactList = (function () {
        function ContactList(api, ea) {
            var _this = this;
            this.api = api;
            this.contacts = [];
            ea.subscribe(messages_1.ContactViewed, function (msg) { return _this.select(msg.contact); });
            ea.subscribe(messages_1.ContactUpdated, function (msg) {
                var id = msg.contact.id;
                var found = _this.contacts.filter(function (x) { return x.id == id; })[0];
                Object.assign(found, msg.contact);
            });
        }
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
        ContactList = __decorate([index_1.inject(web_api_1.WebAPI, index_2.EventAggregator)], ContactList);
        return ContactList;
    })();
    exports.ContactList = ContactList;
});
