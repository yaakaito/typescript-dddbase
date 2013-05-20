/// <reference path="./identity.ts" />

module DDD {

    export interface Entity {
        getIdentity(): Identity;
        equals(that: Entity): bool;
    }

    export class AbstractEntity implements Entity {
        
        constructor(private identity: Identity) { }

        public getIdentity(): Identity {
           return this.identity;
        }

        public equals(that: Entity): bool {
            if (that == null) {
                return false;
            }
            if (this == that) {
                return true;
            }
            return this.identity.equals(that.getIdentity());
        }

    }

}