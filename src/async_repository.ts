/// <reference path="./identity.ts" />
/// <reference path="./entity.ts" />
/// <reference path="./repository.ts" />
/// <reference path="../definitions/monapt/monapt.d.ts" />


module DDD {

    export interface IAsyncRepository<ID extends Identity<any>, E extends Entity<any>> {

        core: IRepository<ID, E>;

        resolve(identity: ID): monapt.Future<E>;

        store(entity: E): monapt.Future<E>;

        storeList(entityList: E[]): monapt.Future<E[]>;

        deleteByEntity(entity: E): monapt.Future<IAsyncRepository<ID, E>>;

        deleteByIdentity(identity: ID): monapt.Future<IAsyncRepository<ID, E>>;
    }

}
