module DDD {

    export interface Identity<T> {
        getValue(): T;
        equals(that: Identity<T>): boolean;
    }

    export class AbstractIdentity<T> implements Identity<T> {

        constructor(private value: T) { }

        public getValue(): T {
            return this.value;
        }

        public equals(that: Identity<T>): boolean {
            if (that == null) {
                return false;
            }
            if (this == that) {
                return true;
            }

            return this.value === that.getValue();
        }
    }

    export class NumberIdentity extends AbstractIdentity<number> {

        constructor(value: number) {
            super(value);
        }
    }
}
