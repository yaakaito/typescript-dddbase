/// <reference path="../src/identify.ts" />
/// <reference path="../d.ts/mocha.d.ts" />
/// <reference path="../d.ts/chai.d.ts" />

module DDD.Spec {

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

            describe('equals method', () => {

                it('should be true if given self', () => {
                    expect(identify.equals(identify)).to.be.true;
                });

                it('should be true if given idenfity that has equiv value', () => {
                    var right = new DDD.NumberIdentify(10);
                    expect(identify.equals(right)).to.be.true;
                });

                it('should be false if given null', () => {
                    expect(identify.equals(null)).to.be.false;
                });

                it('should be false if given idenfity that has not equiv value', () => {
                    var right = new DDD.NumberIdentify(20);
                    expect(identify.equals(right)).to.be.false;
                });

            });
        });
    });
}