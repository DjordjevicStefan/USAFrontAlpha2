import React from "react";
import { log } from "util";

export default function JobsTable(props) {
  const { jobs , jobStateSelect , searchQuery , searchOption , onFinish } = props ;
   
  let filteredJobsArrey = jobs.filter(job => job.status === jobStateSelect);

  
 
  if (filteredJobsArrey.length === 0) {
     return ( 
      <table className="table table-bordered ">
        <thead>
           <tr>
             <th>There is no jobs whit that status at this moment</th>
           </tr>
          </thead>   
      </table>
      )
  }

   

  //// search implement on arrey
  let searchedArrey = null ; 
  if (searchQuery !== "") {
    searchedArrey = filteredJobsArrey.filter(job => job[searchOption].toLowerCase().startsWith(searchQuery.toLowerCase()) )
    filteredJobsArrey = searchedArrey ;
  } else {
    
  }


  

  const formatDate = (assignmentDate) => {
    
    // const year = assignmentDate.substring(0,4) ;
    // const month = assignmentDate.substring(5,7);
    // const day = assignmentDate.substring(8,10);
  
    // const formatedSelDate = month + "/" + day +"/" + year ;
    let d = new Date(assignmentDate).toLocaleString();
    return d;
    
    
      
  }


  

  return (
    <>
      
      {filteredJobsArrey.map(job=> (
          
        <table key={job._id} className="table table-bordered ">

           <thead>
             <tr className="text-left">
            <th>Building number</th>
            <th>Apartment number</th>
            <th>Vendor</th>
            <th>Assignment Date</th>
          </tr>
           </thead>
           <tbody>
           <tr className="text-left">
             <td>{job.workorder.buildingNumber}</td>
             <td>{job.workorder.apartmentNumber}</td>
             <td>{(job.vendor) ?  job.vendor.name  : "not selected or deleted"}</td>
             <td>{(job.assignmentDate) ?  formatDate(job.assignmentDate): "not assigned" } </td>
           </tr>
           <tr className={ (job.vendor) ? "" : "table-border-bottom"}>
             <th colSpan="4">Room: <span className="font-weight-normal mr-5"> {job.room} </span>
             Name: <span className="font-weight-normal mr-5"> {job.name} </span>
             Price: <span className="font-weight-normal">&#36;</span> <span className="font-weight-normal mr-5"> {job.price} </span>
             Quantity: <span className="font-weight-normal mr-5"> {job.quantity} </span>
             {(job.endDate !== "") ?  <span className="font-weight-normal"> <span className="font-weight-bold">End date:</span>  <span className="endDate">{job.endDate}</span></span> : null }</th>
           </tr>
           {(job.vendor && (job.endDate === "") ) ? <tr className={ (job.vendor ) ? "table-border-bottom" : null}>
               <th colSpan="3">Finish job : </th>
               <th colSpan="1"> <button className="btn btn-sm mdc-button" onClick={()=>onFinish(job._id)}>finish</button> </th>
            </tr> : null }
           </tbody>
           </table>

          
         ))}  
       
      
    </>
  );
}
