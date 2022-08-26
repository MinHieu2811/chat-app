let myFavoritePet: 'dog';
myFavoritePet = 'dog'

type Species = 'cat' | 'dog' | 'bird'

interface Pet {
    species: Species;
    name: string;
    eat();
    walk();
    sleep();
}

interface Cat extends Pet {
    species: "cat";
}

interface Dog extends Pet {
    species: "dog";
}

interface Bird extends Pet {
    species: "bird";
    sing();
}

function buyPet(pet: Species, name: string): Pet;

function buyPet(pet: 'cat', name: string): Cat;

function buyPet(pet: "dog", name: string): Dog;

function buyPet(pet: "bird", name: string): Bird;

function buyPet(pet: Species, name: string): Pet {
    if (pet === 'cat') {
        return {
            species: "cat",
            name: name,
            eat: function () {
                console.log(`${this.name} eats`)
            },
            walk: function () {
                console.log(`${this.name} walk`)
            },
            sleep: function () {
                console.log(`${this.name} sleep`)
            }
        } as Cat
    } else if (pet === "dog") {
        return {
            species: "dog",
            name: name,
            eat: function () {
                console.log(`${this.name} eats.`);
            }, walk: function () {
                console.log(`${this.name} walks.`);
            }, sleep: function () {
                console.log(`${this.name} sleeps.`);
            }
        } as Dog;
    } else if (pet === "bird") {
        return {
            species: "bird",
            name: name,
            eat: function () {
                console.log(`${this.name} eats.`);
            }, walk: function () {
                console.log(`${this.name} walks.`);
            }, sleep: function () {
                console.log(`${this.name} sleeps.`);
            }, sing: function () {
                console.log(`${this.name} sings.`);
            }
        } as Bird;
    } else {
        throw `Sorry we do not have a ${pet}. Would you like to buy a dog?`;
    }
}

function petIsCat(pet: Pet): pet is Cat {
    return pet.species === 'cat'
}

function petIsDog(pet: Pet): pet is Cat {
    return pet.species === 'dog'
}

function petIsBird(pet: Pet): pet is Bird {
    return pet.species === 'bird'
}

function playWithPet(pet: Pet) {
    if (petIsCat(pet)) {
        pet.eat();
        pet.sleep();
    } else if (petIsBird(pet)) {
        pet.eat()
        pet.sing()
        pet.sleep()
    }else if(petIsDog(pet)) {
        pet.eat()
        pet.walk()
        pet.sleep()
    } else {
        throw "An unknown pet. Did you buy a rock?";
    }
}

let myDog = buyPet(myFavoritePet, 'Rocky')
playWithPet(myDog)

// CLASS

class Employee{
    // public name: string
    // private age: number
    // readonly male: boolean

    // constructor(n: string, a: number, m: boolean){
    //     this.name = n;
    //     this.age = a;
    //     this.male = m;
    // }

    constructor(
        public name: string,
        private age: number,
        readonly male: boolean
    ) {}

    print() {
        return `Name: ${this.name}, age: ${this.age}, male: ${this.male}`
    }
}

const henry = new Employee('hieu', 20, true)

// INTERFACE

interface Person {
    name: string
    age: number
    speak(lang: string) : void
    spend(amount: number) : number
}

const hieu : Person = {
    name: 'hieu',
    age: 20,
    speak(text: string) : void {
        console.log(text)
    },
    spend(amt: number) {
        return amt
    }
}

// TUPLE
let arr = ['hieu', 20, false]

const tup: [string, boolean, number] = ['henry', false, 20]

// GENERICS

type myArr = Array<String>

const last = (arr: Array<number>) => arr[arr.length - 1]

const lastT = <T>(arr: Array<T>) => arr[arr.length - 1]

const l3 = lastT([1, 'a', 3])

const l4 = lastT<string>(['a', 'f'])

const makeArr = (x: number) => [x]

const makeArrT = <T>(x : T) => [x]

const makeArrXY = <X, Y>(x: X, y: Y) => [x, y]

const makeTuple = <X, Y>(x: X, y: Y): [X, Y] => [x, y]
const example = makeTuple<string, number>('e', 9)

const makeTupleWithDefault = <X, Y = number>(x: X, y: Y): [X, Y] => [x, y]
const ex1 = makeTupleWithDefault<string | null>('a', 4)

// GENERICS EXTENDS
const makeFullName = (obj: {firstName: string, lastName: string}) => ({
    ...obj,
    fullName: `${obj.firstName} ${obj.lastName}`
})

const makeFullNameWithGenerics = <T extends {firstName: string, lastName: string}>(obj: T) => ({
    ...obj,
    fullName: `${obj.firstName} ${obj.lastName}`
})

const ex2 = makeFullNameWithGenerics({firstName: 'hieu', lastName: 'he', age: 20, gender: 'male'})

const addNewEmployee = <T extends object>(e: T) => {
    const uid = Math.floor(Math.random() * 100)
    return{
        ...e,
        uid
    }
}

// GENERICS in INTERFACE

interface Resource<T> {
    uid: number
    name: string
    data: T
}

const resourceOne: Resource<string> = {
    uid: 1,
    name: 'hieu',
    data: 'data'
}

type NumberResouce = Resource<number[]>

