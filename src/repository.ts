/// <reference path="./identity.ts" />
/// <reference path="./entity.ts" />


module DDD {

    export interface Repository<ID extends Identity, E extends Entity<ID>> {
        store(entity: E): E;
        deleteByEntity(entity: E);
        deleteByIdentity(identity: ID);
    }

    export class OnMemoryRepository<ID extends Identity, E extends Entity<ID>> implements Repository<ID, E> {
        private entities: Object = {};

        public resolveWithIdentity(identity: ID): Entity {
            return this.entities[identity.getValue()];
        }

        public store(entity: E): E {
            this.entities[entity.getIdentity().getValue()] = entity;
            return entity;
        }

        public deleteByEntity(entity: E) {
            this.deleteByIdentity(entity.getIdentity());
        }

        public deleteByIdentity(identity: ID) {
            delete this.entities[identity.getValue()];
        }
    }
}