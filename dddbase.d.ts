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
