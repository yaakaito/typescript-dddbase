/// <reference path="../src/identify.ts" />
/// <reference path="../d.ts/mocha.d.ts" />
/// <reference path="../d.ts/chai.d.ts" />


describe('Identify', () => {

    var expect = chai.expect;

    describe('NumberIdentify', () => {

        var identify;
        beforeEach(() => {
            identify = new DDD.NumberIdentify(10);
        });

        it('can create by number', () => {
            expect(identify.getValue()).to.equal(10);
        });

        it('should `equals` returns `true` if given self', () => {
            expect(identify.equals(identify)).to.be.true;
        });

        it('should `equals` returns `true` if given equals value object', () => {
            var right = new DDD.NumberIdentify(10);
            expect(identify.equals(right)).to.be.true;
        });

        it('should `equals` returns `false` if given not equals value object', () => {
            var right = new DDD.NumberIdentify(20);
            expect(identify.equals(right)).to.be.false;
        });

        it('should `equals` returns `false` if given null', () => {
            expect(identify.equals(null)).to.be.false;
        });
    });
    
});