/// <reference path="./identity.ts" />
/// <reference path="./entity.ts" />
/// <reference path="./repository.ts" />
/// <reference path="../definitions/monapt/monapt.d.ts" />


module DDD {

    export class AsyncOnMemoryRepository<ID extends Identity<any>, E extends Entity<any>> {

        private core = new OnMemoryRepository<ID, E>();

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

        deleteByEntity(entity: E): monapt.Future<AsyncOnMemoryRepository<ID, E>> {
            return monapt.future<AsyncOnMemoryRepository>(p => {
                this.core.deleteByEntity(entity);
                p.success(this);
            });
        }

        deleteByIdentity(identity: ID): monapt.Future<AsyncOnMemoryRepository<ID, E>> {
            return monapt.future<AsyncOnMemoryRepository>(p => {
                this.core.deleteByIdentity(identity);
                p.success(this);
            });
        }
    }

}