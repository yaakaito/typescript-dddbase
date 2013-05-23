var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DDD;
(function (DDD) {
    var AbstractIdentity = (function () {
        function AbstractIdentity(value) {
            this.value = value;
        }
        AbstractIdentity.prototype.getValue = function () {
            return this.value;
        };
        AbstractIdentity.prototype.equals = function (that) {
            if (that == null) {
                return false;
            }
            if (this == that) {
                return true;
            }
            return this.value === that.getValue();
        };
        return AbstractIdentity;
    })();
    DDD.AbstractIdentity = AbstractIdentity;    
    var NumberIdentity = (function (_super) {
        __extends(NumberIdentity, _super);
        function NumberIdentity(value) {
            _super.call(this, value);
        }
        return NumberIdentity;
    })(AbstractIdentity);
    DDD.NumberIdentity = NumberIdentity;    
})(DDD || (DDD = {}));
var DDD;
(function (DDD) {
    var AbstractEntity = (function () {
        function AbstractEntity(identity) {
            this.identity = identity;
        }
        AbstractEntity.prototype.getIdentity = function () {
            return this.identity;
        };
        AbstractEntity.prototype.equals = function (that) {
            if (that == null) {
                return false;
            }
            if (this == that) {
                return true;
            }
            return this.identity.equals(that.getIdentity());
        };
        return AbstractEntity;
    })();
    DDD.AbstractEntity = AbstractEntity;    
})(DDD || (DDD = {}));
var DDD;
(function (DDD) {
    var OnMemoryRepository = (function () {
        function OnMemoryRepository() {
            this.entities = {};
        }
        OnMemoryRepository.prototype.resolveWithIdentity = function (identity) {
            return this.entities[identity.getValue()];
        };
        OnMemoryRepository.prototype.store = function (entity) {
            this.entities[entity.getIdentity().getValue()] = entity;
            return entity;
        };
        OnMemoryRepository.prototype.deleteByEntity = function (entity) {
            this.deleteByIdentity(entity.getIdentity());
        };
        OnMemoryRepository.prototype.deleteByIdentity = function (identity) {
            delete this.entities[identity.getValue()];
        };
        return OnMemoryRepository;
    })();
    DDD.OnMemoryRepository = OnMemoryRepository;    
})(DDD || (DDD = {}));
var DDD;
(function (DDD) {
    var AsyncOnMemoryRepository = (function (_super) {
        __extends(AsyncOnMemoryRepository, _super);
        function AsyncOnMemoryRepository(Resolver) {
            _super.call(this);
            this.Resolver = Resolver;
        }
        AsyncOnMemoryRepository.prototype.createResolver = function () {
            return new this.Resolver();
        };
        AsyncOnMemoryRepository.prototype.storeAsync = function (entity) {
            this.store(entity);
            return this.createResolver().resolve(entity);
        };
        AsyncOnMemoryRepository.prototype.resolveAsyncWithIdentity = function (identity) {
            var entity = this.resolveWithIdentity(identity);
            return this.createResolver().resolve(entity);
        };
        AsyncOnMemoryRepository.prototype.deleteAsyncByEntity = function (entity) {
            this.deleteByEntity(entity);
            return this.createResolver().resolve();
        };
        AsyncOnMemoryRepository.prototype.deleteAsyncByIdentity = function (identity) {
            this.deleteByIdentity(identity);
            return this.createResolver().resolve();
        };
        return AsyncOnMemoryRepository;
    })(DDD.OnMemoryRepository);
    DDD.AsyncOnMemoryRepository = AsyncOnMemoryRepository;    
})(DDD || (DDD = {}));
