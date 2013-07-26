/// <reference path="./identity.ts" />
/// <reference path="./entity.ts" />
/// <reference path="../definitions/monapt/monapt.d.ts" />


module DDD {

    export class OnMemoryRepository<ID extends Identity<any>, E extends Entity<any>> {
        private entities: Object = {};

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
            return this.entities[identity.getValue()];
        }

        store(entity: E): E {
            this.entities[entity.getIdentity().getValue()] = entity;
            return entity;
        }

        storeList(entityList: E[]): E[] {
            for (var i in entityList) {
                this.store(entityList[i]);
            }
            return entityList;
        }

        deleteByEntity(entity: E): OnMemoryRepository {
            this.deleteByIdentity(entity.getIdentity());
            return this;
        }

        deleteByIdentity(identity: ID): OnMemoryRepository {
            delete this.entities[identity.getValue()];
            return this;
        }
    }
}
