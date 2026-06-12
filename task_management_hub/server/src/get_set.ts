// class Employee{
//     _name:string;
//     _age:number;
//     constructor(name:string,age:number){
//         this._name = name;
//         this._age = age;
//     }
//     get name():string{
//         return "Mr. " + this._name;
//     }
//     get age():number{
//         return this._age+30;
//     }
// }

import { tr } from "zod/locales";

// const emp = new Employee("John", 25);
// console.log(emp.name);
// console.log(emp.age);

function getUserData() {
  fetch("https://jsonplaceholder.typicode.com/users/1")
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error fetching user data:", error));
}

function getLoginData() {
  fetch("https://jsonplaceholder.typicode.com/posts/1").then((response) =>
    response.json(),
  );
}

async function getData() {
  try {
    const [userData, loginData] = await Promise.all([getUserData(), getLoginData()]);
    console.log("User Data:", userData);
    console.log("Login Data:", loginData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
getData().then(() => console.log("Data fetching complete"));
console.log("Data fetching complete")