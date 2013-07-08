var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DDD;
(function (DDD) {
    var Identity = (function () {
        function Identity(value) {
            this.value = value;
        }
        Identity.prototype.getValue = function () {
            return this.value;
        };

        Identity.prototype.equals = function (that) {
            if (that == null) {
                return false;
            }
            if (this == that) {
                return true;
            }

            return this.value === that.getValue();
        };
        return Identity;
    })();
    DDD.Identity = Identity;

    var NumberIdentity = (function (_super) {
        __extends(NumberIdentity, _super);
        function NumberIdentity(value) {
            _super.call(this, value);
        }
        return NumberIdentity;
    })(Identity);
    DDD.NumberIdentity = NumberIdentity;
})(DDD || (DDD = {}));
var DDD;
(function (DDD) {
    var Entity = (function () {
        function Entity(identity) {
            this.identity = identity;
        }
        Entity.prototype.getIdentity = function () {
            return this.identity;
        };

        Entity.prototype.equals = function (that) {
            if (that == null) {
                return false;
            }
            if (this == that) {
                return true;
            }
            return this.identity.equals(that.getIdentity());
        };
        return Entity;
    })();
    DDD.Entity = Entity;
})(DDD || (DDD = {}));
