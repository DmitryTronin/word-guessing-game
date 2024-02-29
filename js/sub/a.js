let people = [
    {name: 'John', age: 25},
    {name: 'Jane', age: 30},
    {name: 'Emily', age: 35}
];

let getNames = (people) => people.map(person => person.name);
console.log(getNames(people));

let getOlderThanTwentyEight = (people) => people.filter(person => person.age > 28);
//console.log(getOlderThanTwentyEight(people));

let listWithDelay = (person, timeout) => {
    setTimeout(() => {
        console.log('It\'s ' + person.name);
    }, timeout);
};

people.forEach((person, index) => listWithDelay(person, (index + 1) * 1000));

const mySmth = () => {

};
