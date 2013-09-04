/// <reference path="./identity.ts" />
/// <reference path="./entity.ts" />
/// <reference path="./async_repository.ts" />
/// <reference path="./on_memory_repository.ts" />

module DDD {

    export class AsyncOnMemoryRepository<ID extends Identity<any>, E extends Entity<any>> extends AsyncRepository<ID, E> {

        constructor() {
            super(new OnMemoryRepository<ID, E>());
        }
    }
}
