import React from "react";
import DatePicker from "react-datepicker";
import _ from "lodash" ;

export default function WorkOrderJobs(props) {
  const { jobs, onDateChange, onVendorChange , vendors, handleId, onOk, searchOption, searchQuery , okTriger } = props;
   
  let sortJobs = _.orderBy(jobs, ['name'],['asc']) ;

  //// search jobs arrey 
  let searchedArrey = null ; 
  if (searchQuery !== "") {
    searchedArrey = sortJobs.filter(job => job[searchOption].toLowerCase().startsWith(searchQuery.toLowerCase())) ;
    sortJobs = searchedArrey
  } else {
    
  }
  
 

  const sortVendors = _.orderBy(vendors, ['profession'],['asc']) ;
  
  console.log("jobs arrey",sortJobs);
  

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
                quantity:  <span className="font-weight-normal">{job.quantity}</span>{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th >
                User comment:  <span className="font-weight-normal">{job.comment}</span>
              </th>
              <th >
                Subcategory:  <span className="font-weight-normal">{job.subCategory}</span>{" "}
              </th>
            </tr>

            <tr>
              <th id={job._id}>
                
                Select vendor:
               
                  <select  onChange={onVendorChange} className="form-control form-control-sm">
                  <option>df</option>
                  {sortVendors.map(vendor=> (
                    <option value={vendor._id} key={vendor._id}> {`Name: ${vendor.name} | ` } { `Profession: ${vendor.profession}`   } </option>
                  ))}
                </select>
              
                
              </th>
              <th>
                Pick start date:
                <div onClick={() => handleId(job._id)} className="btn-dsp-block">
                 
                  <input 
                    type="date"
                    // disabled ={(job.assignmentDate !== "" ) ? true : false}
                    value = {job.assignmentDate}
                    onChange={onDateChange}
                    className="form-control form-control-sm"
                  /> 

                 
                </div>
              </th>
              <th>
                Status:   {(job.status==="sent") ? <p className="green-status font-weight-bold">{job.status}</p> : <p>{job.status}</p> }  
              </th>
              <th className="th-text-align">
                Confirm:
                <span className="">
                  
                  <button type="button" onClick={(e) => onOk(e, job._id)} className="btn btn-sm mdc-button btn-dsp-block">
                    Ok
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
