/// <reference path="./identity.ts" />

module DDD {

    export class Entity<ID extends Identity<any>> {
        
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