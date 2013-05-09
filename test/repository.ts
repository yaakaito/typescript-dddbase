/// <reference path="../src/identify.ts" />
/// <reference path="../src/entity.ts" />
/// <reference path="../src/repository.ts" />
/// <reference path="../d.ts/mocha.d.ts" />
/// <reference path="../d.ts/chai.d.ts" />

module DDD {

    class Person extends AbstractEntity {

        constructor(identify: DDD.Identify, public name: string) {
            super(identify);
        }
    }

    describe('Repository', () => {

        var expect = chai.expect;

        describe('OnMemoryRepository', () => {

            var repository;
            var identify;
            var name;
            var person;

            beforeEach(() => {
                repository = new OnMemoryRepository();
                identify = new NumberIdentify(10);
                name = 'yaakaito';
                person = new Person(identify, name);

            });

            it('can store entity and resolve it', () => {
                var stored = repository.store(person);
                expect(stored).to.equal(person);
                
                var resolved = repository.resolveWithIdentify(identify);
                expect(resolved).to.equal(person);    

            });

            it('can delete stored entity with it', () => {
                repository.store(person);

                repository.deleteByEntity(person);
                var resolved = repository.resolveWithIdentify(identify);

                expect(resolved).to.be.undefined;
            });

            it('can delete stored entity with its identify', () => {
                repository.store(person);

                repository.deleteByIdentify(identify);
                var resolved = repository.resolveWithIdentify(identify);

                expect(resolved).to.be.undefined;
            });

        });
    });

}
