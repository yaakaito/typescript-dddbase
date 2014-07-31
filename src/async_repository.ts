/// <reference path="./identity.ts" />
/// <reference path="./entity.ts" />
/// <reference path="./repository.ts" />
/// <reference path="../definitions/monapt/monapt.d.ts" />


module DDD {

    export class AsyncRepository<ID extends Identity<any>, E extends Entity<any>> {

        constructor(private core: IRepository<ID, E>) {}

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

        deleteByEntity(entity: E): monapt.Future<AsyncRepository<ID, E>> {
            return monapt.future<AsyncRepository<ID, E>>(p => {
                this.core.deleteByEntity(entity);
                p.success(this);
            });
        }

        deleteByIdentity(identity: ID): monapt.Future<AsyncRepository<ID, E>> {
            return monapt.future<AsyncRepository<ID, E>>(p => {
                this.core.deleteByIdentity(identity);
                p.success(this);
            });
        }
    }
}
