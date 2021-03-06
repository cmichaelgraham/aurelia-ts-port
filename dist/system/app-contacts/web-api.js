System.register([], function(exports_1) {
    var latency, id, contacts, WebAPI;
    function getId() {
        return ++id;
    }
    return {
        setters:[],
        execute: function() {
            latency = 0;
            id = 0;
            contacts = [
                {
                    id: getId(),
                    firstName: 'John',
                    lastName: 'Tolkien',
                    email: 'tolkien@inklings.com',
                    phoneNumber: '867-5309'
                },
                {
                    id: getId(),
                    firstName: 'Clive',
                    lastName: 'Lewis',
                    email: 'lewis@inklings.com',
                    phoneNumber: '867-5309'
                },
                {
                    id: getId(),
                    firstName: 'Owen',
                    lastName: 'Barfield',
                    email: 'barfield@inklings.com',
                    phoneNumber: '867-5309'
                },
                {
                    id: getId(),
                    firstName: 'Charles',
                    lastName: 'Williams',
                    email: 'williams@inklings.com',
                    phoneNumber: '867-5309'
                },
                {
                    id: getId(),
                    firstName: 'Roger',
                    lastName: 'Green',
                    email: 'green@inklings.com',
                    phoneNumber: '867-5309'
                }
            ];
            WebAPI = (function () {
                function WebAPI() {
                }
                WebAPI.prototype.getContactList = function () {
                    var _this = this;
                    this.isRequesting = true;
                    return new Promise(function (resolve) {
                        setTimeout(function () {
                            var results = contacts.map(function (x) {
                                return {
                                    id: x.id,
                                    firstName: x.firstName,
                                    lastName: x.lastName,
                                    email: x.email
                                };
                            });
                            resolve(results);
                            _this.isRequesting = false;
                        }, latency);
                    });
                };
                WebAPI.prototype.getContactDetails = function (id) {
                    var _this = this;
                    this.isRequesting = true;
                    return new Promise(function (resolve) {
                        setTimeout(function () {
                            var found = contacts.filter(function (x) { return x.id == id; })[0];
                            resolve(JSON.parse(JSON.stringify(found)));
                            _this.isRequesting = false;
                        }, latency);
                    });
                };
                WebAPI.prototype.saveContact = function (contact) {
                    var _this = this;
                    this.isRequesting = true;
                    return new Promise(function (resolve) {
                        setTimeout(function () {
                            var instance = JSON.parse(JSON.stringify(contact));
                            var found = contacts.filter(function (x) { return x.id == contact.id; })[0];
                            if (found) {
                                var index = contacts.indexOf(found);
                                contacts[index] = instance;
                            }
                            else {
                                instance.id = getId();
                                contacts.push(instance);
                            }
                            _this.isRequesting = false;
                            resolve(instance);
                        }, latency);
                    });
                };
                return WebAPI;
            })();
            exports_1("WebAPI", WebAPI);
        }
    }
});
