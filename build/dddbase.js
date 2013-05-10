var __extends = this.__extends || function (d, b) {
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
var DDD;
(function (DDD) {
    var OnMemoryRepository = (function () {
        function OnMemoryRepository() {
            this.entities = {
            };
        }
        OnMemoryRepository.prototype.resolveWithIdentify = function (identify) {
            return this.entities[identify.getValue()];
        };
        OnMemoryRepository.prototype.store = function (entity) {
            this.entities[entity.getIdentify().getValue()] = entity;
            return entity;
        };
        OnMemoryRepository.prototype.deleteByEntity = function (entity) {
            this.deleteByIdentify(entity.getIdentify());
        };
        OnMemoryRepository.prototype.deleteByIdentify = function (identify) {
            delete this.entities[identify.getValue()];
        };
        return OnMemoryRepository;
    })();
    DDD.OnMemoryRepository = OnMemoryRepository;    
})(DDD || (DDD = {}));
var DDD;
(function (DDD) {
    var AsyncOnMemoryRepository = (function (_super) {
        __extends(AsyncOnMemoryRepository, _super);
        function AsyncOnMemoryRepository(createResolver) {
                _super.call(this);
            this.createResolver = createResolver;
        }
        AsyncOnMemoryRepository.prototype.storeAsync = function (entity) {
            this.store(entity);
            return this.createResolver().resolve(entity);
        };
        AsyncOnMemoryRepository.prototype.resolveAsyncWithIdentify = function (identify) {
            var entity = this.resolveWithIdentify(identify);
            return this.createResolver().resolve(entity);
        };
        AsyncOnMemoryRepository.prototype.deleteAsyncByEntity = function (entity) {
            this.deleteByEntity(entity);
            return this.createResolver().resolve();
        };
        AsyncOnMemoryRepository.prototype.deleteAsyncByIdentify = function (identify) {
            this.deleteByIdentify(identify);
            return this.createResolver().resolve();
        };
        return AsyncOnMemoryRepository;
    })(DDD.OnMemoryRepository);
    DDD.AsyncOnMemoryRepository = AsyncOnMemoryRepository;    
})(DDD || (DDD = {}));
