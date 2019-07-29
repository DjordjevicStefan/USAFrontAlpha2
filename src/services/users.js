// import getAllWorkorders from "./workOrders";
import http from "./httpService" ;
import qs from "qs"


// const allWorkOrders = getAllWorkorders();

// const users = [
//   {
//     userId: 1,
//     firstName: "dj bog",
//     lastName: "kralj",
//     mail: "dj@gmail.com",
//     password: "12345",
//     region: "California",
//     workOrderIds: [2, 3]
//   },
//   {
//     userId: 2,
//     firstName: "Jao",
//     lastName: "Pakao",
//     mail: "ghdgd@gmail.com",
//     password: "123456789",
//     region: "Denver",
//     workOrderIds: [1, 4]
//   }
// ];

// export function getUserWorkOrders(userId) {
//   let userObj = users.find(e => {
//     return e.userId === userId;
//   });

//   let workOrderList = [];

//   userObj.workOrderIds.forEach(element => {
//     let workOrder = allWorkOrders.filter(order => {
//       return order.id === element;
//     });

//     workOrderList.push(workOrder[0]);
//   });

//   return workOrderList;
// }

export function getUser(id) {
  return http.get(process.env.REACT_APP_API_URL + `/admin/users/${id}`)
}

export function saveUser(user) {
  console.log(user);

  if (user._id === "") {
    console.log(user);

    return http.post(process.env.REACT_APP_API_URL + `/admin/newUser`, qs.stringify({
    email: user.email,
    password: user.password,
    emailPassword: user.emailPassword,
    name : user.name,
    region: user.region,
    status : "active"
})) ;
  } 

  
  return http.post(process.env.REACT_APP_API_URL + `/admin/editUser/${user._id}`, qs.stringify({
      email: user.email,
      password: user.password,
      emailPassword: user.emailPassword,
      name : user.name,
      region: user.region,
      status : "active"
  })) ;
 
}

export function deleteUser(user) { 
  
  return http.post(process.env.REACT_APP_API_URL + `/admin/editUser/${user._id}`, qs.stringify({
    email: user.email,
    password: user.password,
    emailPassword: user.emailPassword,
    name : user.name,
    region: user.region,
    status : "disabled"
})) ;

}


export function imgUpload(data) { 
  
  return http.post(process.env.REACT_APP_API_URL + `/admin/imgTest`, data) ;

}

export default function getAllUsers() {
  return http.get(process.env.REACT_APP_API_URL + "/admin/users")
}
