/// <reference path="./identify.ts" />

module DDD {

    export interface Entity {
    }

    export class AbstractEntity implements Entity {
        
        constructor(public indetify: Identify) {

        }
    }

}