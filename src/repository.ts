/// <reference path="./identity.ts" />
/// <reference path="./entity.ts" />


module DDD {

    export interface Repository {
        store(entity: Entity): Entity;
        deleteByEntity(entity: Entity);
        deleteByIdentity(identity: Identity);
    }

    export class OnMemoryRepository implements Repository {
        private entities: any = {};

        public resolveWithIdentity(identity: Identity): Entity {
            // TODO:
            return this.entities[identity.getValue()];
        }

        public store(entity: Entity): Entity {
            // TODO:
            this.entities[entity.getIdentity().getValue()] = entity;
            return entity;
        }

        public deleteByEntity(entity: Entity) {
            // TODO:
            this.deleteByIdentity(entity.getIdentity());
        }

        public deleteByIdentity(identity: Identity) {
            // TODO:
            delete this.entities[identity.getValue()];
        }
    }
}