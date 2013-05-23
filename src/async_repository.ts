/// <reference path="./identity.ts" />
/// <reference path="./entity.ts" />
/// <reference path="./repository.ts" />


module DDD {

    export interface Resolver<ID extends Identity, E extends Entity<ID>> {
        resolve(entity: E): Resolver<ID, E>;
        resolve(identity: Identity): Resolver<ID, E>; // FIXME:
        resolve(): Resolver<ID, E>;
    }

    export interface AsyncRepository<ID extends Identity, E extends Entity<ID>> {
        storeAsync(entity: E): Resolver<ID, E>;
        resolveAsyncWithIdentity(identity: ID): Resolver<ID, E>;
        deleteAsyncByEntity(entity: E): Resolver<ID, E>;
        deleteAsyncByIdentity(identity: ID): Resolver<ID, E>;
    }

    export class AsyncOnMemoryRepository<ID extends Identity, E extends Entity<ID>>
            extends OnMemoryRepository<ID, E> implements AsyncRepository<ID, E> {

        constructor(private Resolver: new() => Resolver<ID, E>) {
            super();
        }

        private createResolver(): Resolver<ID, E> {
            return new this.Resolver();
        }

        public storeAsync(entity: E): Resolver<ID, E> {
            this.store(entity);
            return this.createResolver().resolve(entity);
        }

        public resolveAsyncWithIdentity(identity: ID): Resolver<ID, E> {
            var entity = this.resolveWithIdentity(identity);
            return this.createResolver().resolve(entity);
        }

        public deleteAsyncByEntity(entity: E): Resolver<ID, E> {
            this.deleteByEntity(entity);
            return this.createResolver().resolve();
        }

        public deleteAsyncByIdentity(identity: ID): Resolver<ID, E> {
            this.deleteByIdentity(identity);
            return this.createResolver().resolve();
        }
    }
}