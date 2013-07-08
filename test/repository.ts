// /// <reference path="../src/identity.ts" />
// /// <reference path="../src/entity.ts" />
// /// <reference path="../src/repository.ts" />
// /// <reference path="../definitions/mocha/mocha.d.ts" />
// /// <reference path="../definitions/chai/chai.d.ts" />
// 
// module DDD.Spec {
// 
//     class Person extends AbstractEntity<DDD.NumberIdentity> {
// 
//         constructor(identity: DDD.NumberIdentity, public name: string) {
//             super(identity);
//         }
//     }
// 
//     describe('Repository', () => {
// 
//         var expect = chai.expect;
// 
//         describe('OnMemoryRepository', () => {
// 
//             var repository;
//             var identity;
//             var name;
//             var person;
// 
//             beforeEach(() => {
//                 repository = new OnMemoryRepository();
//                 identity = new NumberIdentity(10);
//                 name = 'yaakaito';
//                 person = new Person(identity, name);
// 
//             });
// 
//             it('can store entity and resolve it', () => {
//                 var stored = repository.store(person);
//                 expect(stored).to.equal(person);
//                 
//                 var resolved = repository.resolveWithIdentity(identity);
//                 expect(resolved).to.equal(person);    
// 
//             });
// 
//             it('can delete stored entity with it', () => {
//                 repository.store(person);
// 
//                 repository.deleteByEntity(person);
//                 var resolved = repository.resolveWithIdentity(identity);
// 
//                 expect(resolved).to.be.undefined;
//             });
// 
//             it('can delete stored entity with its identity', () => {
//                 repository.store(person);
// 
//                 repository.deleteByIdentity(identity);
//                 var resolved = repository.resolveWithIdentity(identity);
// 
//                 expect(resolved).to.be.undefined;
//             });
// 
//         });
//     });
// 
// }
// 