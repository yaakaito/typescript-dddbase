/// <reference path="./identify.ts" />
/// <reference path="./entity.ts" />


module DDD {

    export interface Repository {
        store(entity: Entity): Entity;
        deleteByEntity(entity: Entity);
        deleteByIdentify(identify: Identify);
    }

    export class OnMemoryRepository implements Repository {
        private entities: any = {};

        public resolveWithIdentify(identify: Identify): Entity {
            // TODO:
            return this.entities[identify.getValue()];
        }

        public store(entity: Entity): Entity {
            // TODO:
            this.entities[entity.getIdentify().getValue()] = entity;
            return entity;
        }

        public deleteByEntity(entity: Entity) {
            // TODO:
            this.deleteByIdentify(entity.getIdentify());
        }

        public deleteByIdentify(identify: Identify) {
            // TODO:
            delete this.entities[identify.getValue()];
        }
    }
}