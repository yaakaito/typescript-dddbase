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
    class OnMemoryRepository<ID extends DDD.Identity<any>, E extends DDD.Entity<ID>> {
        private entities;
        public resolveOption(identity: ID): monapt.Option<E>;
        public resolve(identity: ID): E;
        public store(entity: E): E;
        public deleteByEntity(entity: E): void;
        public deleteByIdentity(identity: ID): void;
    }
}
