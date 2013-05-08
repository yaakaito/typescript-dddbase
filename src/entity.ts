/// <reference path="./identify.ts" />

module DDD {

    export interface Entity {
        getIdentify(): Identify;
        equals(that: Entity): bool;
    }

    export class AbstractEntity implements Entity {
        
        constructor(private identify: Identify) { }

        public getIdentify(): Identify {
           return this.identify;
        }

        public equals(that: Entity): bool {
            if (that == null) {
                return false;
            }
            if (this == that) {
                return true;
            }
            return this.identify.equals(that.getIdentify());
        }

    }

}