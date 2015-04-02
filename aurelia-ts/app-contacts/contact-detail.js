define(["require", "exports", '../event-aggregator/index', './web-api', './app', './messages', './utility'], function (require, exports, _index, _web_api, _app, _messages, _utility) {
    var ContactDetail = (function () {
        function ContactDetail(app, api, ea) {
            this.app = app;
            this.api = api;
            this.ea = ea;
        }
        ContactDetail.inject = function () {
            return [
                _app.App,
                _web_api.WebAPI,
                _index.EventAggregator
            ];
        };
        ContactDetail.prototype.activate = function (params, qs, config) {
            var _this = this;
            return this.api.getContactDetails(params.id).then(function (contact) {
                _this.contact = contact;
                config.navModel.title = contact.firstName;
                _this.originalContact = JSON.parse(JSON.stringify(contact));
                _this.ea.publish(new _messages.ContactViewed(contact));
            });
        };
        Object.defineProperty(ContactDetail.prototype, "canSave", {
            get: function () {
                return this.contact.firstName && this.contact.lastName && !this.api.isRequesting;
            },
            enumerable: true,
            configurable: true
        });
        ContactDetail.prototype.save = function () {
            var _this = this;
            this.api.saveContact(this.contact).then(function (contact) {
                _this.contact = contact;
                _this.originalContact = JSON.parse(JSON.stringify(contact));
                _this.ea.publish(new _messages.ContactUpdated(_this.contact));
            });
        };
        ContactDetail.prototype.canDeactivate = function () {
            if (!_utility.areEqual(this.originalContact, this.contact)) {
                var result = confirm('You have unsaved changes. Are you sure you wish to leave?');
                if (!result) {
                    this.ea.publish(new _messages.ContactViewed(this.contact));
                }
                return result;
            }
            return true;
        };
        return ContactDetail;
    })();
    exports.ContactDetail = ContactDetail;
});
