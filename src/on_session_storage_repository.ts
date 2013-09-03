/// <reference path="./identity.ts" />
/// <reference path="./entity.ts" />
/// <reference path="./repository.ts" />
/// <reference path="../definitions/monapt/monapt.d.ts" />

module DDD {

    export class OnSessionStorageRepository<ID extends Identity<any>, E extends Entity<any>> implements IRepository<ID, E> {

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

        // Implement in every repository extended from this repository.
        parse(json: Object): E {
            return new Entity<Identity<any>>(new Identity<any>(json['identity']['value']));
        }

        // Can implement in every repository extended from this repository.
        stringify(entity: E): string {
            return JSON.stringify(entity);
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
