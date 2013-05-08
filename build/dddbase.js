var DDD;
(function (DDD) {
    var AbstractEntity = (function () {
        function AbstractEntity(identify) {
            this.identify = identify;
        }
        AbstractEntity.prototype.getIdentify = function () {
            return this.identify;
        };
        AbstractEntity.prototype.equals = function (that) {
            if(that == null) {
                return false;
            }
            if(this == that) {
                return true;
            }
            return this.identify.equals(that.getIdentify());
        };
        return AbstractEntity;
    })();
    DDD.AbstractEntity = AbstractEntity;    
})(DDD || (DDD = {}));
;var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DDD;
(function (DDD) {
    var AbstractIdentify = (function () {
        function AbstractIdentify(value) {
            this.value = value;
        }
        AbstractIdentify.prototype.getValue = function () {
            return this.value;
        };
        AbstractIdentify.prototype.equals = function (that) {
            if(that == null) {
                return false;
            }
            if(this == that) {
                return true;
            }
            return this.value === that.getValue();
        };
        return AbstractIdentify;
    })();
    DDD.AbstractIdentify = AbstractIdentify;    
    var NumberIdentify = (function (_super) {
        __extends(NumberIdentify, _super);
        function NumberIdentify(value) {
                _super.call(this, value);
            this.value = value;
        }
        return NumberIdentify;
    })(AbstractIdentify);
    DDD.NumberIdentify = NumberIdentify;    
})(DDD || (DDD = {}));
