import http from "./httpService" ;
import qs from "qs"

export function getRooms() {
  return http.get(process.env.REACT_APP_API_URL + `/admin/newItem`)
}

export function getItemsFromRoom(name) {
  return http.get(process.env.REACT_APP_API_URL + `/admin/rooms/${name}`)
}


//// na isti path ce ici oba 
//// room livingroom kada sejvujem one koji nemaju sobu, i drugi status za njih
export function saveNewItem(item) {
  return http.post(process.env.REACT_APP_API_URL + "/admin/newItem" , qs.stringify({
      status : "regular" ,
      name : item.name ,
      subCategory : item.subCategory,
      room : item.room ,
      price : item.price,
      link : item.link
  }) ) ;
}

export function deleteItem(itemId){
  return http.post(process.env.REACT_APP_API_URL + `/admin/items/${itemId}`)
}

export function deleteExtraItem(){

  const item = {
    room : "Entrance" ,
    subCategory : "Appliances: Stove" ,  
    name : "Flex" ,
    price : "49.5" ,
    link : "" 
  } ;

  console.log("usao u funkciju");
  

  return http.post(process.env.REACT_APP_API_URL + `/admin/deleteItem` , qs.stringify({
    status : "extra" ,
    name : item.name ,
    subCategory : item.subCategory,
    room : item.room ,
    price : item.price,
    link : item.link
})
  
  
  )
}

export function editItem(item) {
  console.log("item link" , item.link );
  
  //// dodati status 

  return http.post(process.env.REACT_APP_API_URL + `/admin/editItem/${item._id}` , qs.stringify({
      name : item.name ,
      subCategory : item.subCategory,
      room : item.room ,
      price : item.price,
      link : item.link
  }) ) ;
}





