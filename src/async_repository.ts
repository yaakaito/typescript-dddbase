/// <reference path="./identity.ts" />
/// <reference path="./entity.ts" />
/// <reference path="./repository.ts" />


module DDD {

    export interface Resolver {
        resolve(entity: Entity): Resolver;
        resolve(identity: Identity): Resolver;
        resolve(): Resolver;
    }

    export interface AsyncRepository {
        storeAsync(entity: Entity): Resolver;
        resolveAsyncWithIdentity(identity: Identity): Resolver;
        deleteAsyncByEntity(entity: Entity): Resolver;
        deleteAsyncByIdentity(identity: Identity): Resolver;
    }

    export class AsyncOnMemoryRepository extends OnMemoryRepository implements AsyncRepository {

        constructor(private createResolver: () => Resolver) {
            super();
        }

        public storeAsync(entity: Entity): Resolver {
            this.store(entity);
            return this.createResolver().resolve(entity);
        }

        public resolveAsyncWithIdentity(identity: Identity): Resolver {
            var entity = this.resolveWithIdentity(identity);
            return this.createResolver().resolve(entity);
        }

        public deleteAsyncByEntity(entity: Entity): Resolver {
            this.deleteByEntity(entity);
            return this.createResolver().resolve();
        }

        public deleteAsyncByIdentity(identity: Identity): Resolver {
            this.deleteByIdentity(identity);
            return this.createResolver().resolve();
        }
    }
}