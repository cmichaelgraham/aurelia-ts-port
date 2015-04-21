define(["require", "exports", 'aurelia-event-aggregator', './web-api', './messages', './utility'], function (require, exports, aurelia_event_aggregator_1, web_api_1, messages_1, utility_1) {
    var ContactDetail = (function () {
        function ContactDetail(api, ea) {
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
        ContactDetail.inject = [web_api_1.WebAPI, aurelia_event_aggregator_1.EventAggregator];
        return ContactDetail;
    })();
    exports.ContactDetail = ContactDetail;
});
