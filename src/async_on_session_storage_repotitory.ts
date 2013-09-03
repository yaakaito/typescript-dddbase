/// <reference path="./identity.ts" />
/// <reference path="./entity.ts" />
/// <reference path="./async_repository.ts" />
/// <reference path="./on_session_storage_repository.ts" />
/// <reference path="../definitions/monapt/monapt.d.ts" />

module DDD {

    export class AsyncOnSessionStorageRepository<ID extends Identity<any>, E extends Entity<any>> implements IAsyncRepository<ID, E> {

        // Implement in every repository extended from this repository.
        core = new OnSessionStorageRepository<ID, E>();

        resolve(identity: ID): monapt.Future<E> {
            return monapt.future<E>(p => {
                p.success(this.core.resolveOption(identity).get());
            });
        }

        store(entity: E): monapt.Future<E> {
            return monapt.future<E>(p => {
                p.success(this.core.store(entity));
            });
        }

        storeList(entityList: E[]): monapt.Future<E[]> {
            return monapt.future<E[]>(p => {
                p.success(this.core.storeList(entityList));
            });
        }

        deleteByEntity(entity: E): monapt.Future<AsyncOnSessionStorageRepository<ID, E>> {
            return monapt.future<AsyncOnSessionStorageRepository>(p => {
                this.core.deleteByEntity(entity);
                p.success(this);
            });
        }

        deleteByIdentity(identity: ID): monapt.Future<AsyncOnSessionStorageRepository<ID, E>> {
            return monapt.future<AsyncOnSessionStorageRepository>(p => {
                this.core.deleteByIdentity(identity);
                p.success(this);
            });
        }
    }

}
