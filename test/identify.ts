/// <reference path="../src/identity.ts" />
/// <reference path="../definitions/mocha/mocha.d.ts" />
/// <reference path="../definitions/chai/chai.d.ts" />

module DDD.Spec {

    describe('Identity', () => {

        var expect = chai.expect;

        describe('NumberIdentity', () => {

            var identity;
            beforeEach(() => {
                identity = new DDD.NumberIdentity(10);
            });

            it('can create by number', () => {
                expect(identity.getValue()).to.equal(10);
            });

            describe('equals method', () => {

                it('should be true if given self', () => {
                    expect(identity.equals(identity)).to.be.true;
                });

                it('should be true if given idenfity that has equiv value', () => {
                    var right = new DDD.NumberIdentity(10);
                    expect(identity.equals(right)).to.be.true;
                });

                it('should be false if given null', () => {
                    expect(identity.equals(null)).to.be.false;
                });

                it('should be false if given idenfity that has not equiv value', () => {
                    var right = new DDD.NumberIdentity(20);
                    expect(identity.equals(right)).to.be.false;
                });

            });
        });
    });
}