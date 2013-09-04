/// <reference path="./identity.ts" />
/// <reference path="./entity.ts" />
/// <reference path="../definitions/monapt/monapt.d.ts" />

module DDD {

    export interface IRepository<ID extends Identity<any>, E extends Entity<any>> {
        resolveOption(identity: ID): monapt.Option<E>;

        resolve(identity: ID): E;

        store(entity: E): E;

        storeList(entityList: E[]): E[];

        deleteByEntity(entity: E): IRepository<ID, E>;

        deleteByIdentity(identity: ID): IRepository<ID, E>;
    }
}
