/// <reference path="./identify.ts" />
/// <reference path="./entity.ts" />
/// <reference path="./repository.ts" />


module DDD {

    export interface Resolver {
        resolve(entity: Entity): Resolver;
        resolve(identify: Identify): Resolver;
        resolve(): Resolver;
    }

    export interface AsyncRepository {
        storeAsync(entity: Entity): Resolver;
        resolveAsyncWithIdentify(identify: Identify): Resolver;
        deleteAsyncByEntity(entity: Entity): Resolver;
        deleteAsyncByIdentify(identify: Identify): Resolver;
    }

    export class AsyncOnMemoryRepository extends OnMemoryRepository implements AsyncRepository {

        constructor(private createResolver: () => Resolver) {
            super();
        }

        public storeAsync(entity: Entity): Resolver {
            this.store(entity);
            return this.createResolver().resolve(entity);
        }

        public resolveAsyncWithIdentify(identify: Identify): Resolver {
            var entity = this.resolveWithIdentify(identify);
            return this.createResolver().resolve(entity);
        }

        public deleteAsyncByEntity(entity: Entity): Resolver {
            this.deleteByEntity(entity);
            return this.createResolver().resolve();
        }

        public deleteAsyncByIdentify(identify: Identify): Resolver {
            this.deleteByIdentify(identify);
            return this.createResolver().resolve();
        }
    }
}