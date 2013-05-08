module DDD {

    export interface Identify {
        getValue(): any;
        equals(that: Identify): bool;
    }

    export class AbstractIdentify implements Identify {

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

    export class NumberIdentify extends AbstractIdentify {

        constructor(private value: number) {
            super(value);
        }
    }
}
