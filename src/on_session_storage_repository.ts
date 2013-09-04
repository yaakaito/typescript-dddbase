/// <reference path="./identity.ts" />
/// <reference path="./entity.ts" />
/// <reference path="./repository.ts" />
/// <reference path="../definitions/monapt/monapt.d.ts" />

module DDD {

    export interface ISessionStorageMapper<E extends Entity<any>> {
        parse(json: Object): E;
        stringify(entity: E): string;
    }

    export class OnSessionStorageRepository<ID extends Identity<any>, E extends Entity<any>> implements IRepository<ID, E> {

        constructor(mapper: ISessionStorageMapper<E>) {
            this.parse = mapper.parse;
            this.stringify = mapper.stringify;
        }

        parse: (json: Object) => E;
        stringify: (entity: E) => string;

        resolveOption(identity: ID): monapt.Option<E> {
            var entity = this.resolve(identity);
            if (entity != null) {
                return new monapt.Some(entity);
            }
            else {
                return new monapt.None<E>();
            }
        }

        resolve(identity: ID): E {
            var json = JSON.parse(sessionStorage.getItem(identity.getValue()));
            if (json) {
                return this.parse(json);
            }
            return null;
        }

        store(entity: E): E {
            sessionStorage.setItem(entity.getIdentity().getValue(), this.stringify(entity));
            return entity;
        }

        storeList(entityList: E[]): E[] {
            for (var i in entityList) {
                this.store(entityList[i]);
            }
            return entityList;
        }

        deleteByEntity(entity: E): OnSessionStorageRepository<ID, E> {
            this.deleteByIdentity(entity.getIdentity());
            return this;
        }

        deleteByIdentity(identity: ID): OnSessionStorageRepository<ID, E> {
            sessionStorage.removeItem(identity.getValue());
            return this;
        }
    }
}
