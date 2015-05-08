System.register(['aurelia-event-aggregator', './web-api', './messages'], function(exports_1) {
    var aurelia_event_aggregator_1, web_api_1, messages_1;
    var ContactList;
    return {
        setters:[
            function (_aurelia_event_aggregator_1) {
                aurelia_event_aggregator_1 = _aurelia_event_aggregator_1;
            },
            function (_web_api_1) {
                web_api_1 = _web_api_1;
            },
            function (_messages_1) {
                messages_1 = _messages_1;
            }],
        execute: function() {
            ContactList = (function () {
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
                ContactList.inject = [web_api_1.WebAPI, aurelia_event_aggregator_1.EventAggregator];
                return ContactList;
            })();
            exports_1("ContactList", ContactList);
        }
    }
});
