/// <reference path="../src/identity.ts" />
/// <reference path="../src/entity.ts" />
/// <reference path="../src/repository.ts" />
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

        beforeEach(() => {
            repository = new OnMemoryRepository<DDD.NumberIdentity, Person>();
            identity = new NumberIdentity(10);
            name = 'yaakaito';
            person = new Person(identity, name);

        });

        describe('#store', () => {
            it('can store entity, And can select it', () => {
                var stored = repository.store(person);
                expect(stored).to.equal(person);
                
                var resolved = repository.resolve(identity);
                expect(resolved).to.equal(person);
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
