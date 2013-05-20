/// <reference path="../src/identity.ts" />
/// <reference path="../src/entity.ts" />
/// <reference path="../src/async_repository.ts" />
/// <reference path="../d.ts/mocha.d.ts" />
/// <reference path="../d.ts/chai.d.ts" />

module DDD.Spec {

    class Person extends AbstractEntity {

        constructor(identity: DDD.Identity, public name: string) {
            super(identity);
        }
    }

    class SimpleResolver implements Resolver {

        private target: any = null;
        private resolved: bool = false;
        private callback: (target?: any) => any = null;

        public resolve(entity: Entity): Resolver;
        public resolve(identity: Identity): Resolver;
        public resolve(): Resolver;
        public resolve(target?: any): Resolver {
            this.target = target;
            this.fireCallback();
            this.resolved = true;
            return this;
        }

        public onComplete(callback: (target?: any) => any): Resolver {
            this.callback = callback;
            if (this.resolved) {
                this.fireCallback();
            }
            return this;
        }

        private fireCallback() {
            if (this.callback) {
                if (this.target) {
                    this.callback(this.target);
                }
                else {
                    this.callback();
                }
            }
        }
    }

    describe('AsyncRepository', () => {

        var expect = chai.expect;

        describe('OnMemoryRepository', () => {

            var identity;
            var name;
            var person;
            beforeEach(() => {
                identity = new NumberIdentity(10);
                name = 'yaakaito';
                person = new Person(identity, name);
            });

            describe('With SimpleResolver', () => {

                var repository;
                beforeEach(() => {
                    repository = new AsyncOnMemoryRepository(() => new SimpleResolver());

                });

                it('can async store entity and async resolve it', (done) => {
                    repository.storeAsync(person).onComplete((entity: Entity) => {
                        expect(entity).to.equal(person);
                        repository.resolveAsyncWithIdentity(identity).onComplete((entity: Entity) => {
                            expect(entity).to.equal(person);
                            done();
                        });
                    });
                });

                it('can async delete stored entity with it', (done) => {
                    repository.store(person);
                    repository.deleteAsyncByEntity(person).onComplete(() => {
                        var entity = repository.resolveWithIdentity(identity);
                        expect(entity).to.undefined;
                        done();
                    });
                });

                it('can async delete stored entity with its identity', (done) => {
                    repository.store(person);
                    repository.deleteAsyncByIdentity(identity).onComplete(() => {
                        var entity = repository.resolveWithIdentity(identity);
                        expect(entity).to.undefined;
                        done();
                    });
                });
            });
        });
    });

}