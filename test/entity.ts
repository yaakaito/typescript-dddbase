/// <reference path="../src/entity.ts" />
/// <reference path="../src/identity.ts" />
/// <reference path="../definitions/mocha/mocha.d.ts" />
/// <reference path="../definitions/chai/chai.d.ts" />


class Person extends DDD.Entity<DDD.NumberIdentity> {

    constructor(identity: DDD.NumberIdentity, public name: string) {
        super(identity);
    }
}

module DDD.Spec {

    describe('Entity', () => {

        var expect = chai.expect;

        var identity;
        var person;
        beforeEach(() => {
            identity = new DDD.NumberIdentity(10);
            person = new Person(identity, 'yaakaito');
        });

        it('has identity', () => {
            expect(person.getIdentity().getValue()).to.equal(10);    
        });

        it('has name property', () => {
            expect(person.name).to.equal('yaakaito');
        });

        describe('equals method', () => {

            it('should be true if given self', () => {
                expect(person.equals(person)).to.be.true;
            });

            it('should be true if given entity that has equiv identity.', () => {
                var right = new Person(identity, 'yaakaito2');
                expect(person.equals(right)).to.be.true;   
            });

            it('should be false if given null', () => {
                expect(person.equals(null)).to.be.false;
            });

            it('should be false if given entity that has not equiv identity', () => {
                var rightIdenfity = new DDD.NumberIdentity(20);
                var right = new Person(rightIdenfity, 'yaakaito2');
                expect(person.equals(right)).to.be.false;
            });
        });
    });
}