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
define(["require", "exports", '../framework/index', '../event-aggregator/index', './web-api', './app', './messages', './utility'], function (require, exports, index_1, index_2, web_api_1, app_1, messages_1, utility_1) {
    var ContactDetail = (function () {
        function ContactDetail(app, api, ea) {
            this.app = app;
            this.api = api;
            this.ea = ea;
        }
        ContactDetail.prototype.activate = function (params, qs, config) {
            var _this = this;
            return this.api.getContactDetails(params.id).then(function (contact) {
                _this.contact = contact;
                config.navModel.title = contact.firstName;
                _this.originalContact = JSON.parse(JSON.stringify(contact));
                _this.ea.publish(new messages_1.ContactViewed(contact));
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
                _this.ea.publish(new messages_1.ContactUpdated(_this.contact));
            });
        };
        ContactDetail.prototype.canDeactivate = function () {
            if (!utility_1.areEqual(this.originalContact, this.contact)) {
                var result = confirm('You have unsaved changes. Are you sure you wish to leave?');
                if (!result) {
                    this.ea.publish(new messages_1.ContactViewed(this.contact));
                }
                return result;
            }
            return true;
        };
        ContactDetail = __decorate([index_1.inject(app_1.App, web_api_1.WebAPI, index_2.EventAggregator)], ContactDetail);
        return ContactDetail;
    })();
    exports.ContactDetail = ContactDetail;
});
