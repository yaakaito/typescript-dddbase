/// <reference path="definitions/monapt/monapt.d.ts" />
declare module DDD {
    class Identity<T> {
        private value;
        constructor(value: T);
        public getValue(): T;
        public equals(that: Identity<T>): boolean;
    }
    class NumberIdentity extends Identity<number> {
        constructor(value: number);
    }
}
declare module DDD {
    class Entity<ID extends DDD.Identity<any>> {
        private identity;
        constructor(identity: ID);
        public getIdentity(): ID;
        public equals(that: Entity<ID>): boolean;
    }
}
declare module DDD {
    interface IRepository<ID extends DDD.Identity<any>, E extends DDD.Entity<any>> {
        resolveOption(identity: ID): monapt.Option<E>;
        resolve(identity: ID): E;
        store(entity: E): E;
        storeList(entityList: E[]): E[];
        deleteByEntity(entity: E): IRepository<ID, E>;
        deleteByIdentity(identity: ID): IRepository<ID, E>;
    }
}
declare module DDD {
    class AsyncRepository<ID extends DDD.Identity<any>, E extends DDD.Entity<any>> {
        private core;
        constructor(core: DDD.IRepository<ID, E>);
        public resolve(identity: ID): monapt.Future<E>;
        public store(entity: E): monapt.Future<E>;
        public storeList(entityList: E[]): monapt.Future<E[]>;
        public deleteByEntity(entity: E): monapt.Future<AsyncRepository<ID, E>>;
        public deleteByIdentity(identity: ID): monapt.Future<AsyncRepository<ID, E>>;
    }
}
declare module DDD {
    class OnMemoryRepository<ID extends DDD.Identity<any>, E extends DDD.Entity<any>> implements DDD.IRepository<ID, E> {
        private entities;
        public resolveOption(identity: ID): monapt.Option<E>;
        public resolve(identity: ID): E;
        public store(entity: E): E;
        public storeList(entityList: E[]): E[];
        public deleteByEntity(entity: E): OnMemoryRepository<ID, E>;
        public deleteByIdentity(identity: ID): OnMemoryRepository<ID, E>;
    }
}
declare module DDD {
    class AsyncOnMemoryRepository<ID extends DDD.Identity<any>, E extends DDD.Entity<any>> extends DDD.AsyncRepository<ID, E> {
        constructor();
    }
}
declare module DDD {
    interface ISessionStorageMapper<E extends DDD.Entity<any>> {
        parse(json: Object): E;
        stringify(entity: E): string;
    }
    class OnSessionStorageRepository<ID extends DDD.Identity<any>, E extends DDD.Entity<any>> implements DDD.IRepository<ID, E> {
        constructor(mapper: ISessionStorageMapper<E>);
        public parse: (json: Object) => E;
        public stringify: (entity: E) => string;
        public resolveOption(identity: ID): monapt.Option<E>;
        public resolve(identity: ID): E;
        public store(entity: E): E;
        public storeList(entityList: E[]): E[];
        public deleteByEntity(entity: E): OnSessionStorageRepository<ID, E>;
        public deleteByIdentity(identity: ID): OnSessionStorageRepository<ID, E>;
    }
}
declare module DDD {
    class AsyncOnSessionStorageRepository<ID extends DDD.Identity<any>, E extends DDD.Entity<any>> extends DDD.AsyncRepository<ID, E> {
        constructor(mapper: DDD.ISessionStorageMapper<E>);
    }
}
