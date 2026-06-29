let val: string = 'sdfksajfd';
let val1: number = 5;
let val2: boolean = true;
let val3: null = null;
let val4: undefined = undefined;
let val5: object = {};
let val6: number | string = 'Вася';
val6 = 5;
let arr: string[] = ['html', 'css'];
let arr2: Array<string | number> = ['js', 50, 255]
let tuple: [string, number, boolean] = ['sdfsd', 50, true];
type strTypes = string | string[];
let text: strTypes = 'Вася';
text = ['js', 'css', 'html'];

type User = {
    id: number,
    name: string,
    age: number,
    alive?: boolean
}

type Prof = {
    skill: string[]
}

type Admin = User & Prof;

const vasya: Admin = {
    id: 5,
    name: 'Вася',
    age: 25,
    skill: ['html', 'css', 'js']
    // alive: true
}

interface IProducts {
    id: number,
    title: string,
    desc: string | string[],
    price: number,
    info: (id: number)=>void
}
interface IBonus {
    discount: string
}
interface ISale extends IProducts, IBonus {}

let apple: ISale = {
    id: 50,
    title: 'Яблоко',
    desc: 'голден',
    price: 15000, 
    discount: '20%',
    info: function(id){
        console.log(this.title);
    }
}
let a = 10
// function find<Type> (val:string): string[] {
function find<T> (val:T): T[] {
    return [val]
}
find('Вася')
find<number>(a)
find(true)