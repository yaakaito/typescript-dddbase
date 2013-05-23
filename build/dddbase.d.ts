declare module DDD {
    interface Identity {
        getValue(): any;
        equals(that: Identity): boolean;
    }
    class AbstractIdentity implements Identity {
        private value;
        constructor(value: any);
        public getValue(): any;
        public equals(that: any): boolean;
    }
    class NumberIdentity extends AbstractIdentity {
        constructor(value: number);
    }
}
declare module DDD {
    interface Entity {
        getIdentity(): Identity;
        equals(that: Entity): boolean;
    }
    class AbstractEntity implements Entity {
        private identity;
        constructor(identity: Identity);
        public getIdentity(): Identity;
        public equals(that: Entity): boolean;
    }
}
declare module DDD {
    interface Repository {
        store(entity: Entity): Entity;
        deleteByEntity(entity: Entity);
        deleteByIdentity(identity: Identity);
    }
    class OnMemoryRepository implements Repository {
        private entities;
        public resolveWithIdentity(identity: Identity): Entity;
        public store(entity: Entity): Entity;
        public deleteByEntity(entity: Entity): void;
        public deleteByIdentity(identity: Identity): void;
    }
}
declare module DDD {
    interface Resolver {
        resolve(entity: Entity): Resolver;
        resolve(identity: Identity): Resolver;
        resolve(): Resolver;
    }
    interface AsyncRepository {
        storeAsync(entity: Entity): Resolver;
        resolveAsyncWithIdentity(identity: Identity): Resolver;
        deleteAsyncByEntity(entity: Entity): Resolver;
        deleteAsyncByIdentity(identity: Identity): Resolver;
    }
    class AsyncOnMemoryRepository extends OnMemoryRepository implements AsyncRepository {
        private createResolver;
        constructor(createResolver: () => Resolver);
        public storeAsync(entity: Entity): Resolver;
        public resolveAsyncWithIdentity(identity: Identity): Resolver;
        public deleteAsyncByEntity(entity: Entity): Resolver;
        public deleteAsyncByIdentity(identity: Identity): Resolver;
    }
}
