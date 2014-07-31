/// <reference path="./identity.ts" />
/// <reference path="./entity.ts" />
/// <reference path="./async_repository.ts" />
/// <reference path="./on_local_storage_repository.ts" />

module DDD {

    export class AsyncOnLocalStorageRepository<ID extends Identity<any>, E extends Entity<any>> extends AsyncRepository<ID, E> {

        constructor(mapper: ILocalStorageMapper<E>) {
            super(new OnLocalStorageRepository(mapper));
        }
    }
}
