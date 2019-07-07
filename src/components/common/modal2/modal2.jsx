import React, { Component } from "react";

import { Modal } from "react-bootstrap";
import Pagination from "../../common/pagination";
import _ from "lodash";
import "./modal2.css";

class ModalMy2 extends Component {
  state = {
    currentPage: 1,
    itemsPerPage: 8,
    modalShowing : false,

  };

  handlePaginate = number => {
    this.setState({
      currentPage: number
    });
  };


  /////// handle show modal
  hadnleModal = () => {
    this.setState({ modalShowing: true });
  };

  handleCloseModal = () => {
    this.setState({ modalShowing: false });
  };

   formatDate = date => {
    let d = new Date(date).toLocaleString();
    return d;
  };

  popuilateTable = (jobsArrey) => {
    if (!jobsArrey || jobsArrey.length === 0 ) {
       return <td>No jobs asigned to this vendor</td>
    } else {
      // let orderedJobsArrey = _.orderBy(jobsArrey, ["assignmentDate"], ["asc"]);
      return (
        jobsArrey.map(job => <tr key={job._id}> <td>{job.name}</td> <td>{job.room}</td> <td>{this.formatDate(job.assignmentDate)}</td> </tr> ) 
      ) ;
    }
  }


  render() {
     const {  selVendorId ,vendors , allSentJoobs } = this.props;
     const selVendor = vendors.find(vendor => vendor._id === selVendorId ) ;
    //  console.log("all jobs sent", allSentJoobs);
    //  console.log("sel vendor" , selVendor);
    //  console.log("vendors in modal" , vendors);
    //  console.log("vendor id" , selVendorId);
    const vendorJobArrey = allSentJoobs.filter(job=> job.vendorId === selVendorId) ; 
    let vendorJobArreySorted = _.orderBy(vendorJobArrey, ["assignmentDate"], ["asc"]);
     

    const indexOfLast = this.state.currentPage * this.state.itemsPerPage;
    const indexOfFirst = indexOfLast - this.state.itemsPerPage;
    let vendorsJobsPaginated = vendorJobArreySorted.slice(indexOfFirst, indexOfLast);

   

    return (
      <div>
        <div className="">
          <button
            onClick={this.hadnleModal}
            className="mdc-button btn-sm btn"
          >
            Show vendor schedule
          </button>
        </div>
        <Modal show={this.state.modalShowing} onHide={this.handleCloseModal}>
          <Modal.Header className="mHeader" closeButton>
            <Modal.Title>{<p> {(selVendorId) ? selVendor.name +" jobs list" : null  } </p>}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              <>
             
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Job name</th>
                      <th scope="col">Room</th>
                      <th scope="col">Start date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(selVendorId) ? this.popuilateTable(vendorsJobsPaginated) : null  }
                  </tbody>
                </table>
              </>
            }
          </Modal.Body>
          <Modal.Footer>
          
            <button className="btn mdc-button" onClick={this.handleCloseModal}>
              Go back
            </button> 
           
           
            <Pagination
              currentPage={this.state.currentPage}
              total={vendorJobArreySorted.length}
              somethingPerPage={this.state.itemsPerPage}
              paginate={this.handlePaginate}
            />
            
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ModalMy2;
