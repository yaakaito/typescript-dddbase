// /// <reference path="../src/identity.ts" />
// /// <reference path="../src/entity.ts" />
// /// <reference path="../src/async_repository.ts" />
// /// <reference path="../definitions/mocha/mocha.d.ts" />
// /// <reference path="../definitions/chai/chai.d.ts" />
// 
// module DDD.Spec {
// 
//     class Person extends Entity<DDD.NumberIdentity> {
// 
//         constructor(identity: DDD.NumberIdentity, public name: string) {
//             super(identity);
//         }
//     }
// 
//     class SimpleResolver implements Resolver<DDD.NumberIdentity, Person> {
// 
//         private target: any = null;
//         private resolved: bool = false;
//         private callback: (target?: any) => any = null;
// 
//         public resolve(entity: Person): Resolver;
//         public resolve(identity: DDD.NumberIdentity): Resolver;
//         public resolve(): Resolver;
//         public resolve(target?: any): Resolver {
//             this.target = target;
//             this.fireCallback();
//             this.resolved = true;
//             return this;
//         }
// 
//         public onComplete(callback: (target?: any) => any): Resolver {
//             this.callback = callback;
//             if (this.resolved) {
//                 this.fireCallback();
//             }
//             return this;
//         }
// 
//         private fireCallback() {
//             if (this.callback) {
//                 if (this.target) {
//                     this.callback(this.target);
//                 }
//                 else {
//                     this.callback();
//                 }
//             }
//         }
//     }
// 
//     describe('AsyncRepository', () => {
// 
//         var expect = chai.expect;
// 
//         describe('OnMemoryRepository', () => {
// 
//             var identity;
//             var name;
//             var person;
//             beforeEach(() => {
//                 identity = new NumberIdentity(10);
//                 name = 'yaakaito';
//                 person = new Person(identity, name);
//             });
// 
//             describe('With SimpleResolver', () => {
// 
//                 var repository;
//                 beforeEach(() => {
//                     repository = new AsyncOnMemoryRepository(SimpleResolver);
// 
//                 });
// 
//                 it('can async store entity and async resolve it', (done) => {
//                     repository.storeAsync(person).onComplete((entity: Person) => {
//                         expect(entity).to.equal(person);
//                         repository.resolveAsyncWithIdentity(identity).onComplete((entity: Person) => {
//                             expect(entity).to.equal(person);
//                             done();
//                         });
//                     });
//                 });
// 
//                 it('can async delete stored entity with it', (done) => {
//                     repository.store(person);
//                     repository.deleteAsyncByEntity(person).onComplete(() => {
//                         var entity = repository.resolveWithIdentity(identity);
//                         expect(entity).to.undefined;
//                         done();
//                     });
//                 });
// 
//                 it('can async delete stored entity with its identity', (done) => {
//                     repository.store(person);
//                     repository.deleteAsyncByIdentity(identity).onComplete(() => {
//                         var entity = repository.resolveWithIdentity(identity);
//                         expect(entity).to.undefined;
//                         done();
//                     });
//                 });
//             });
//         });
//     });
// 
// }