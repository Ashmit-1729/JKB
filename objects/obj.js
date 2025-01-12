let user = {
    name: "Ashmit",
    age: 19,
    skills: ['Flutter','Web Dev','C,C++,Js'],
}

//   Acessing the values   //

//user.name or user.["name"]

//the square bracket is used when we have space in keys like
// "full name" : Ashmit Shelke
//then we access it like 
//user["full name"] = "Ashmit Shelke"

let values = Object.values(user)//returns an array
let user_keys = Object.keys(user)

for(key in user)
{
    console.log(key+user[key])
}

//   copying objects   //

//let student = user;
//they share the same memory location
//^here the reference is copied not the values

//we can use these methods-
//but only first level is copied by value, the rest is copy by reference
//means object inside object is not being copied by value

//let student = Object.assign({},user)
//this is copy by value
//pass an empty object {}

//let student = {...user};


//for entire copy
//let student = structuredClone(user);
//(recent method)

//old hack (using JSON):
// let studentJson = JSON.stringify(user);
// let student = JSON.parse(studentJson);



//   


let car={
    name: 'BMW',
    horn: function(){
        console.log("Honk")
    },
    run: function(){
        console.log(`starting ${this.name}`)
    }

}

car.run();
car.horn();

//optional chain:

//user.age?


//   Constructor   //
let truck = new Object(car);


//assignments - 
//previous two using objects








