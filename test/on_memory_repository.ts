/// <reference path="../src/identity.ts" />
/// <reference path="../src/entity.ts" />
/// <reference path="../src/on_memory_repository.ts" />
/// <reference path="../definitions/mocha/mocha.d.ts" />
/// <reference path="../definitions/chai/chai.d.ts" />

module DDD.Spec {

    class Person extends Entity<DDD.NumberIdentity> {

        constructor(identity: DDD.NumberIdentity, public name: string) {
            super(identity);
        }
    }


    var expect = chai.expect;

    describe('OnMemoryRepository', () => {

        var repository: OnMemoryRepository<DDD.NumberIdentity, Person>;
        var identity: DDD.NumberIdentity;
        var name: string;
        var person: Person;
        var identity2: DDD.NumberIdentity;
        var name2: string;
        var person2: Person;

        beforeEach(() => {
            repository = new OnMemoryRepository<DDD.NumberIdentity, Person>();
            identity = new NumberIdentity(10);
            name = 'yaakaito';
            person = new Person(identity, name);
            identity2 = new NumberIdentity(20);
            name2 = 'yaakaito2';
            person2 = new Person(identity2, name2);


        });

        describe('#store', () => {
            it('can store entity, And can select it', () => {
                var stored = repository.store(person);
                expect(stored).to.equal(person);
                
                var resolved = repository.resolve(identity);
                expect(resolved).to.equal(person);
            });
        });

        describe('#storeList', () => {
            it('can store entity list, And can select them', () => {
                var persons = [person, person2];
                var stored = repository.storeList(persons);
                expect(stored).to.equal(persons);

                var resolved = repository.resolve(identity);
                expect(resolved).to.equal(person);
                var resolved2 = repository.resolve(identity2);
                expect(resolved2).to.equal(person2);
            });
        });

        describe('#resolveOption', () => {
            it('returns Some<Entity> if the entity is stored', () => {
                repository.store(person);

                var option = repository.resolveOption(identity);
                expect(option.isEmpty).to.be.false;
                expect(option.get()).to.equal(person);
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

                expect(resolved).to.be.undefined;
            });
        });

        describe('#deleteByIdentity', () => {
            it('should deelte stored entity if given thats identify', () => {
                repository.store(person);

                repository.deleteByIdentity(identity);
                var resolved = repository.resolve(identity);

                expect(resolved).to.be.undefined;                    
            })
        });
    });

}
