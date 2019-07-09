import React from "react";
import ModalMy2 from "../common/modal2/modal2"

import _ from "lodash" ;

export default function WorkOrderJobs(props) {
  const { jobs, onDateChange, onVendorChange , vendors, handleId, onOk, searchOption, searchQuery , onProfessionChange, professions, vendorsWhitSamePro , allSentJoobs } = props;
   

  //// sort jobs and vendors
  let sortJobs = _.orderBy(jobs, [item => item.name.toLowerCase()],['asc']) ;
  const sortVendors = _.orderBy(vendorsWhitSamePro, ['profession'],['asc']) ;
  const sortProfessions =  _.orderBy(professions, [item => item.toLowerCase()],['asc']);

  
  // console.log("jobs" , jobs);
  // console.log("vendors jobs table" , vendors);
  

  //// search jobs arrey 
  let searchedArrey = null ; 
  if (searchQuery !== "") {
    searchedArrey = sortJobs.filter(job => job[searchOption].toLowerCase().startsWith(searchQuery.toLowerCase())) ;
    sortJobs = searchedArrey
  } else {
    
  }
  
 const formatDate = (date) => {
    if (date) {
      return date.substring(0,10);
   } else {
      return "" ;
    }
  }

  const checkVendorId =(vendorId) => {
    if (vendorId) {
      let vendorSelected = vendors.find(vendor => vendor._id === vendorId) ;
      // console.log(vendorSelected);
      
      return  `Name: ${vendorSelected.name} | ` + `Profession: ${vendorSelected.profession}` ;
    } else {
      // console.log("ne ulazi u if");
      
      return "Select vendor"
    }
  }

  return (
    <>
      
      {sortJobs.map(job => (
         
        <table key={job._id} className="table table-bordered table-border-bottom">
          <thead>
          
            <tr>
              <th>
                Name:  <span className="font-weight-normal">{job.name}</span>{" "}
              </th>
              <th>
                Room:  <span className="font-weight-normal">{job.room}</span>{" "}
              </th>
              <th>
                Price:  <span className="font-weight-normal"> &#36; {job.price}  </span>{" "}
              </th>
              <th>
                Quantity:  <span className="font-weight-normal">{job.quantity}</span>{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th >
                User Comment:  <span className="font-weight-normal">{job.comment}</span>
              </th>
              <th >
                Subcategory:  <span className="font-weight-normal">{job.subCategory}</span>{" "}
              </th>
            </tr>

            <tr>
              <th>Select profession:
              <select onChange={onProfessionChange} className="form-control form-control-sm">
                  <option>Select profession</option>
                  {sortProfessions.map((pro,index)=> (
                    <option key={index} > {pro} </option>
                  ))}
               </select>

              </th>
              <th id={job._id}>
                
                Select vendor:
               
                  <select disabled={(job.status=== "finished") ? true : false } onChange={onVendorChange} className="form-control form-control-sm">
                  <option>{checkVendorId(job.vendorId)}</option>
                  {sortVendors.map(vendor=> (
                    <option value={vendor._id} key={vendor._id}> {`Name: ${vendor.name} | ` } { `Profession: ${vendor.profession}`   } </option>
                  ))}
                </select>
    
                
                <ModalMy2
                    // workOrders ={this.getUserWorkOrders(id)}
                    // user ={this.state.user}
                    allSentJoobs={allSentJoobs}
                    vendors={vendors}
                    selVendorId={job.vendorId}
                    
               />
               </th>
               
              <th>
                Pick Start Date:
                <div onClick={() => handleId(job._id)} className="btn-dsp-block">
                 
                  <input 
                    type="date"
                    disabled={(job.status=== "finished") ? true : false }
                    value = {formatDate(job.assignmentDate)}
                    onChange={onDateChange}
                    className="form-control form-control-sm"
                  /> 
             </div>
              </th>
              <th>
                Status:   {(job.status==="sent") ? <p className="green-status font-weight-bold">{job.status}</p> : <p>{job.status}</p> }  
              </th>
              <th className="th-text-align">
              {(job.status==="sent") ? "Edit" : "Confirm" }
                <span className="">
                  <button type="button" disabled={(job.status=== "finished") ? true : false } onClick={(e) => onOk(e, job._id)} className="btn btn-sm mdc-button btn-dsp-block">
                    {(job.status==="sent") ? "Edit" : "Ok" }
                  </button>
                </span>
              </th>
            </tr>
          </tbody>
        </table>
      ))}
    </>
  );
}
