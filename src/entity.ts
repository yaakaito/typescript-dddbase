/// <reference path="./identity.ts" />

module DDD {

    export interface Entity<ID extends Identity> {
        getIdentity(): Identity;
        equals(that: Entity): boolean;
    }

    export class AbstractEntity<ID extends Identity> implements Entity<ID> {
        
        constructor(private identity: ID) { }

        public getIdentity(): ID {
           return this.identity;
        }

        public equals(that: Entity<ID>): boolean {
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