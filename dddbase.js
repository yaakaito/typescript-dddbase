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
var DDD;
(function (DDD) {
    var AsyncRepository = (function () {
        function AsyncRepository(core) {
            this.core = core;
        }
        AsyncRepository.prototype.resolve = function (identity) {
            var _this = this;
            return monapt.future(function (p) {
                p.success(_this.core.resolveOption(identity).get());
            });
        };

        AsyncRepository.prototype.store = function (entity) {
            var _this = this;
            return monapt.future(function (p) {
                p.success(_this.core.store(entity));
            });
        };

        AsyncRepository.prototype.storeList = function (entityList) {
            var _this = this;
            return monapt.future(function (p) {
                p.success(_this.core.storeList(entityList));
            });
        };

        AsyncRepository.prototype.deleteByEntity = function (entity) {
            var _this = this;
            return monapt.future(function (p) {
                _this.core.deleteByEntity(entity);
                p.success(_this);
            });
        };

        AsyncRepository.prototype.deleteByIdentity = function (identity) {
            var _this = this;
            return monapt.future(function (p) {
                _this.core.deleteByIdentity(identity);
                p.success(_this);
            });
        };
        return AsyncRepository;
    })();
    DDD.AsyncRepository = AsyncRepository;
})(DDD || (DDD = {}));
var DDD;
(function (DDD) {
    var OnLocalStorageRepository = (function () {
        function OnLocalStorageRepository(mapper) {
            this.parse = mapper.parse;
            this.stringify = mapper.stringify;
        }
        OnLocalStorageRepository.prototype.resolveOption = function (identity) {
            var entity = this.resolve(identity);
            if (entity != null) {
                return new monapt.Some(entity);
            } else {
                return new monapt.None();
            }
        };

        OnLocalStorageRepository.prototype.resolve = function (identity) {
            var json = JSON.parse(localStorage.getItem(identity.getValue()));
            if (json) {
                return this.parse(json);
            }
            return null;
        };

        OnLocalStorageRepository.prototype.store = function (entity) {
            localStorage.setItem(entity.getIdentity().getValue(), this.stringify(entity));
            return entity;
        };

        OnLocalStorageRepository.prototype.storeList = function (entityList) {
            for (var i in entityList) {
                this.store(entityList[i]);
            }
            return entityList;
        };

        OnLocalStorageRepository.prototype.deleteByEntity = function (entity) {
            this.deleteByIdentity(entity.getIdentity());
            return this;
        };

        OnLocalStorageRepository.prototype.deleteByIdentity = function (identity) {
            localStorage.removeItem(identity.getValue());
            return this;
        };
        return OnLocalStorageRepository;
    })();
    DDD.OnLocalStorageRepository = OnLocalStorageRepository;
})(DDD || (DDD = {}));
var DDD;
(function (DDD) {
    var AsyncOnLocalStorageRepository = (function (_super) {
        __extends(AsyncOnLocalStorageRepository, _super);
        function AsyncOnLocalStorageRepository(mapper) {
            _super.call(this, new DDD.OnLocalStorageRepository(mapper));
        }
        return AsyncOnLocalStorageRepository;
    })(DDD.AsyncRepository);
    DDD.AsyncOnLocalStorageRepository = AsyncOnLocalStorageRepository;
})(DDD || (DDD = {}));
var DDD;
(function (DDD) {
    var OnMemoryRepository = (function () {
        function OnMemoryRepository() {
            this.entities = {};
        }
        OnMemoryRepository.prototype.resolveOption = function (identity) {
            var entity = this.resolve(identity);
            if (entity != null) {
                return new monapt.Some(entity);
            } else {
                return new monapt.None();
            }
        };

        OnMemoryRepository.prototype.resolve = function (identity) {
            return this.entities[identity.getValue()];
        };

        OnMemoryRepository.prototype.store = function (entity) {
            this.entities[entity.getIdentity().getValue()] = entity;
            return entity;
        };

        OnMemoryRepository.prototype.storeList = function (entityList) {
            for (var i in entityList) {
                this.store(entityList[i]);
            }
            return entityList;
        };

        OnMemoryRepository.prototype.deleteByEntity = function (entity) {
            this.deleteByIdentity(entity.getIdentity());
            return this;
        };

        OnMemoryRepository.prototype.deleteByIdentity = function (identity) {
            delete this.entities[identity.getValue()];
            return this;
        };
        return OnMemoryRepository;
    })();
    DDD.OnMemoryRepository = OnMemoryRepository;
})(DDD || (DDD = {}));
var DDD;
(function (DDD) {
    var AsyncOnMemoryRepository = (function (_super) {
        __extends(AsyncOnMemoryRepository, _super);
        function AsyncOnMemoryRepository() {
            _super.call(this, new DDD.OnMemoryRepository());
        }
        return AsyncOnMemoryRepository;
    })(DDD.AsyncRepository);
    DDD.AsyncOnMemoryRepository = AsyncOnMemoryRepository;
})(DDD || (DDD = {}));
var DDD;
(function (DDD) {
    var OnSessionStorageRepository = (function () {
        function OnSessionStorageRepository(mapper) {
            this.parse = mapper.parse;
            this.stringify = mapper.stringify;
        }
        OnSessionStorageRepository.prototype.resolveOption = function (identity) {
            var entity = this.resolve(identity);
            if (entity != null) {
                return new monapt.Some(entity);
            } else {
                return new monapt.None();
            }
        };

        OnSessionStorageRepository.prototype.resolve = function (identity) {
            var item = sessionStorage.getItem(identity.getValue());
            var json = item ? JSON.parse(item) : null;
            return json ? this.parse(json) : null;
        };

        OnSessionStorageRepository.prototype.store = function (entity) {
            sessionStorage.setItem(entity.getIdentity().getValue(), this.stringify(entity));
            return entity;
        };

        OnSessionStorageRepository.prototype.storeList = function (entityList) {
            for (var i in entityList) {
                this.store(entityList[i]);
            }
            return entityList;
        };

        OnSessionStorageRepository.prototype.deleteByEntity = function (entity) {
            this.deleteByIdentity(entity.getIdentity());
            return this;
        };

        OnSessionStorageRepository.prototype.deleteByIdentity = function (identity) {
            sessionStorage.removeItem(identity.getValue());
            return this;
        };
        return OnSessionStorageRepository;
    })();
    DDD.OnSessionStorageRepository = OnSessionStorageRepository;
})(DDD || (DDD = {}));
var DDD;
(function (DDD) {
    var AsyncOnSessionStorageRepository = (function (_super) {
        __extends(AsyncOnSessionStorageRepository, _super);
        function AsyncOnSessionStorageRepository(mapper) {
            _super.call(this, new DDD.OnSessionStorageRepository(mapper));
        }
        return AsyncOnSessionStorageRepository;
    })(DDD.AsyncRepository);
    DDD.AsyncOnSessionStorageRepository = AsyncOnSessionStorageRepository;
})(DDD || (DDD = {}));
