/// <reference path="../src/identity.ts" />
/// <reference path="../src/entity.ts" />
/// <reference path="../src/async_repository.ts" />
/// <reference path="../definitions/mocha/mocha.d.ts" />
/// <reference path="../definitions/chai/chai.d.ts" />

module DDD.Spec {

    class Person extends Entity<DDD.NumberIdentity> {

        constructor(identity: DDD.NumberIdentity, public name: string) {
            super(identity);
        }
    }

    var expect = chai.expect;

    describe('AsyncOnMemoryRepository', () => {

        var repository: AsyncOnMemoryRepository<DDD.NumberIdentity, Person>;
        var identity: DDD.NumberIdentity;
        var name: string;
        var person: Person;
        var identity2: DDD.NumberIdentity;
        var name2: string;
        var person2: Person;

        beforeEach(() => {
            repository = new AsyncOnMemoryRepository<DDD.NumberIdentity, Person>();
            identity = new NumberIdentity(10);
            name = 'yaakaito';
            person = new Person(identity, name);
            identity2 = new NumberIdentity(20);
            name2 = 'yaakaito2';
            person2 = new Person(identity2, name2);

        });

        describe('#store', () => {
            it('should store entity, And future returns stored entity', (ok) => {
                repository.store(person).onSuccess(entity => {
                    expect(entity).to.equal(person);
                    ok();
                });
            });
        });

        describe('#storeList', () => {
            it('should store entity list, And future returns stored entity list', (ok) => {
                var persons = [person, person2];
                repository.storeList(persons).onSuccess(entityList => {
                    expect(entityList).to.equal(persons);
                    expect(entityList).to.be.length(2);
                    ok();
                });
            });
        });

        describe('#resolve', () => {
            it('returns succeed Futrue<Entity> if the entity is stored', (ok) => {
                repository.store(person).onSuccess(entity => {
                    repository.resolve(identity).onSuccess(entity => {
                        expect(entity).to.equal(person);
                        ok();
                    });
                });
            });

            it('returns None<Entity> if the entity is not stored', (ok) => {
                repository.resolve(identity).onFailure(error => {
                    expect(error).to.not.be.null;
                    ok();
                });
            });
        });

        describe('#deleteByEntity', () => {
            it('should delete stored entity if given it', (ok) => {
                repository.store(person).onSuccess(entity => {
                    repository.deleteByEntity(person).onSuccess(repo => {
                        repo.resolve(identity).onFailure(error => {
                            expect(error).to.not.be.null;
                            ok();
                        });
                    });
                });
            });
        });

        describe('#deleteByIdentity', () => {
            it('should deelte stored entity if given thats identify', (ok) => {
                repository.store(person).onSuccess(entity => {
                    repository.deleteByIdentity(identity).onSuccess(repo => {
                        repo.resolve(identity).onFailure(error => {
                            expect(error).to.not.be.null;
                            ok();
                        });
                    });
                });                
            });
        });
    });

}
