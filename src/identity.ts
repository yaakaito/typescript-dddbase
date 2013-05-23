module DDD {

    export interface Identity {
        getValue(): any;
        equals(that: Identity): bool;
    }

    export class AbstractIdentity implements Identity {

        constructor(private value: any) { }

        public getValue(): any {
            return this.value;
        }

        public equals(that: any): bool {
            if (that == null) {
                return false;
            }
            if (this == that) {
                return true;
            }

            return this.value === that.getValue();
        }
    }

    export class NumberIdentity extends AbstractIdentity {

        constructor(value: number) {
            super(value);
        }
    }
}
