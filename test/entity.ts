/// <reference path="../src/entity.ts" />
/// <reference path="../src/identify.ts" />
/// <reference path="../d.ts/mocha.d.ts" />
/// <reference path="../d.ts/chai.d.ts" />


class Person extends DDD.AbstractEntity {

    constructor(identify: DDD.Identify, public name: string) {
        super(identify);
    }
}

describe('Entity', () => {

    var expect = chai.expect;

    var identify;
    var person;
    beforeEach(() => {
        identify = new DDD.NumberIdentify(10);
        person = new Person(identify, 'yaakaito');
    });

    it('has identify', () => {
        expect(person.getIdentify().getValue()).to.equal(10);    
    });

    it('has name property', () => {
        expect(person.name).to.equal('yaakaito');
    });

    describe('equals method', () => {

        it('should be true if given self', () => {
            expect(person.equals(person)).to.be.true;
        });

        it('should be true if given entity that has equiv identify.', () => {
            var right = new Person(identify, 'yaakaito2');
            expect(person.equals(right)).to.be.true;   
        });

        it('should be false if given null', () => {
            expect(person.equals(null)).to.be.false;
        });

        it('should be false if given entity that has not equiv identify', () => {
            var rightIdenfity = new DDD.NumberIdentify(20);
            var right = new Person(rightIdenfity, 'yaakaito2');
            expect(person.equals(right)).to.be.false;
        });
    });
});