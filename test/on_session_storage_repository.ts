/// <reference path="../src/identity.ts" />
/// <reference path="../src/entity.ts" />
/// <reference path="../src/on_session_storage_repository.ts" />
/// <reference path="../definitions/mocha/mocha.d.ts" />
/// <reference path="../definitions/chai/chai.d.ts" />

module DDD.Spec {

    class Person extends Entity<DDD.NumberIdentity> {

        constructor(identity: DDD.NumberIdentity, public name: string) {
            super(identity);
        }
    }

    var expect = chai.expect;

    describe('OnSessionStorageRepository', () => {

        var repository: OnSessionStorageRepository<DDD.NumberIdentity, Person>;
        var identity: DDD.NumberIdentity;
        var name: string;
        var person: Person;
        var identity2: DDD.NumberIdentity;
        var name2: string;
        var person2: Person;

        beforeEach(() => {
            repository = new OnSessionStorageRepository({
                parse: (json: Object): Person => {
                    return new Person(new NumberIdentity(json['identity']['value']), json['name']);
                },
                stringify: (person: Person): string => {
                    return JSON.stringify(person);
                }
            });
            identity = new NumberIdentity(10);
            name = 'yaakaito';
            person = new Person(identity, name);
            identity2 = new NumberIdentity(20);
            name2 = 'yaakaito2';
            person2 = new Person(identity2, name2);
        });

        afterEach(() => {
            sessionStorage.clear();
        });

        describe('#store', () => {
            it('can store entity, And can select it', () => {
                var stored = repository.store(person);
                expect(stored).to.equal(person);

                var resolved = repository.resolve(identity);
                expect(resolved.getIdentity().getValue()).to.equal(person.getIdentity().getValue());
                expect(resolved.name).to.equal(person.name);
            });
        });

        describe('#storeList', () => {
            it('can store entity list, And can select them', () => {
                var persons = [person, person2];
                var stored = repository.storeList(persons);
                expect(stored).to.equal(persons);

                var resolved = repository.resolve(identity);
                expect(resolved.getIdentity().getValue()).to.equal(person.getIdentity().getValue());
                expect(resolved.name).to.equal(person.name);
                var resolved2 = repository.resolve(identity2);
                expect(resolved2.getIdentity().getValue()).to.equal(person2.getIdentity().getValue());
                expect(resolved2.name).to.equal(person2.name);
            });
        });

        describe('#resolveOption', () => {
            it('returns Some<Entity> if the entity is stored', () => {
                repository.store(person);

                var option = repository.resolveOption(identity);
                expect(option.isEmpty).to.be.false;
                expect(option.get().getIdentity().getValue()).to.equal(person.getIdentity().getValue());
            });

            it('returns None<Entity> if the entity is not stored', () => {
                var option = repository.resolveOption(identity);
                expect(option.isEmpty).to.be.true;
            });
        });

        describe('#deleteByEntity', () => {
            it('should delete stored entity if given it', () => {
                repository.store(person);

                repository.deleteByEntity(person);
                var resolved = repository.resolve(identity);

                expect(resolved).to.be.null;
            });
        });

        describe('#deleteByIdentity', () => {
            it('should delete stored entity if given thats identify', () => {
                repository.store(person);

                repository.deleteByIdentity(identity);
                var resolved = repository.resolve(identity);

                expect(resolved).to.be.null;
            })
        });
    });

}
