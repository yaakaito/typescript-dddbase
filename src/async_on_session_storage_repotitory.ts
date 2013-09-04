/// <reference path="./identity.ts" />
/// <reference path="./entity.ts" />
/// <reference path="./async_repository.ts" />
/// <reference path="./on_session_storage_repository.ts" />

module DDD {

    export class AsyncOnSessionStorageRepository<ID extends Identity<any>, E extends Entity<any>> extends AsyncRepository<ID, E> {

        constructor(mapper: ISessionStorageMapper<E>) {
            super(new OnSessionStorageRepository(mapper));
        }
    }
}
