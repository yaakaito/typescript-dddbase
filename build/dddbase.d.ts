declare module DDD {
    interface Identity<T> {
        getValue(): T;
        equals(that: Identity<T>): boolean;
    }
    class AbstractIdentity<T> implements Identity<T> {
        private value;
        constructor(value: T);
        public getValue(): T;
        public equals(that: Identity<T>): boolean;
    }
    class NumberIdentity extends AbstractIdentity<number> {
        constructor(value: number);
    }
}
declare module DDD {
    interface Entity<ID extends DDD.Identity<T>> {
        getIdentity(): Identity<T>;
        equals(that: Entity<ID extends DDD.Identity<T>>): boolean;
    }
    class AbstractEntity<ID extends DDD.Identity<T>> implements Entity<ID extends DDD.Identity<T>> {
        private identity;
        constructor(identity: ID);
        public getIdentity(): ID;
        public equals(that: Entity<ID extends DDD.Identity<T>>): boolean;
    }
}
declare module DDD {
    interface Repository<ID extends DDD.Identity<T>, E extends Entity<ID extends DDD.Identity<T>>> {
        store(entity: E): E;
        deleteByEntity(entity: E);
        deleteByIdentity(identity: ID);
    }
    class OnMemoryRepository<ID extends DDD.Identity<T>, E extends Entity<ID extends DDD.Identity<T>>> implements Repository<ID extends DDD.Identity<T>, E extends Entity<ID extends DDD.Identity<T>>> {
        private entities;
        public resolveWithIdentity(identity: ID): Entity<ID extends DDD.Identity<T>>;
        public store(entity: E): E;
        public deleteByEntity(entity: E): void;
        public deleteByIdentity(identity: ID): void;
    }
}
declare module DDD {
    interface Resolver<ID extends DDD.Identity<T>, E extends Entity<ID extends DDD.Identity<T>>> {
        resolve(entity: E): Resolver<ID extends DDD.Identity<T>, E extends Entity<ID extends DDD.Identity<T>>>;
        resolve(identity: Identity<any>): Resolver<ID extends DDD.Identity<T>, E extends Entity<ID extends DDD.Identity<T>>>;
        resolve(): Resolver<ID extends DDD.Identity<T>, E extends Entity<ID extends DDD.Identity<T>>>;
    }
    interface AsyncRepository<ID extends DDD.Identity<T>, E extends Entity<ID extends DDD.Identity<T>>> {
        storeAsync(entity: E): Resolver<ID extends DDD.Identity<T>, E extends Entity<ID extends DDD.Identity<T>>>;
        resolveAsyncWithIdentity(identity: ID): Resolver<ID extends DDD.Identity<T>, E extends Entity<ID extends DDD.Identity<T>>>;
        deleteAsyncByEntity(entity: E): Resolver<ID extends DDD.Identity<T>, E extends Entity<ID extends DDD.Identity<T>>>;
        deleteAsyncByIdentity(identity: ID): Resolver<ID extends DDD.Identity<T>, E extends Entity<ID extends DDD.Identity<T>>>;
    }
    class AsyncOnMemoryRepository<ID extends DDD.Identity<T>, E extends Entity<ID extends DDD.Identity<T>>> extends OnMemoryRepository<ID extends DDD.Identity<T>, E extends Entity<ID extends DDD.Identity<T>>> implements AsyncRepository<ID extends DDD.Identity<T>, E extends Entity<ID extends DDD.Identity<T>>> {
        private Resolver;
        constructor(Resolver: new() => Resolver<ID extends DDD.Identity<T>, E extends Entity<ID extends DDD.Identity<T>>>);
        private createResolver();
        public storeAsync(entity: E): Resolver<ID extends DDD.Identity<T>, E extends Entity<ID extends DDD.Identity<T>>>;
        public resolveAsyncWithIdentity(identity: ID): Resolver<ID extends DDD.Identity<T>, E extends Entity<ID extends DDD.Identity<T>>>;
        public deleteAsyncByEntity(entity: E): Resolver<ID extends DDD.Identity<T>, E extends Entity<ID extends DDD.Identity<T>>>;
        public deleteAsyncByIdentity(identity: ID): Resolver<ID extends DDD.Identity<T>, E extends Entity<ID extends DDD.Identity<T>>>;
    }
}
