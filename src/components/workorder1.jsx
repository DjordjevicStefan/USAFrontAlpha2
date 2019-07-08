import React, { Component } from "react";
import NavBar from "./navBar.jsx";
import _ from "lodash";
import axios from "axios";

import "../css/workorder.css";

class Wo extends Component {
  state = {
    allItems: {}
    // jobsList: getItemList()
  };
  saveStateToLocalStorage() {
    const allItems = JSON.parse(localStorage.getItem("allItems"));
    localStorage.setItem("allItems", JSON.stringify(allItems));
  }
  handlelogOut() {
    const answer = window.confirm("Are you sure you want to log out?");
    if (answer) {
      window.location = `/`;
    }
  }
  componentDidMount() {
    // this.hydrateStateWithLocalStorage();
    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    // window.addEventListener(
    //   "beforeunload",
    //   this.saveStateToLocalStorage.bind(this)
    // );
  }
  handleGeneralNotes = e => {
    // let woComment = this.state.woComment;
    // console.log(e.target.value);
    let woComment = e.target.value;
    this.setState({ woComment });
  };
  handleBackButton = url => {
    // console.log(this.props.match.params.m);
    const region = JSON.parse(localStorage.getItem("currentUser")).region;
    this.props.history.push(
      "/rooms/" + this.props.match.params.m + "/" + region
    );
  };

  handlePrintButton = () => {
    window.print();
  };
  handleFinishedButton = async () => {
    let prompt = window.confirm(
      "Are you sure you want to send this workorder?"
    );
    if (prompt) {
      const jobs = JSON.parse(localStorage.getItem("jobs"));
      const copyItems = [...jobs].filter(item => {
        return item.checked;
      });
      const finalItems = copyItems.map(item => {
        return {
          name: item.name,
          price: item.price,
          room: item.room,
          subCategory: item.subCategory,
          quantity: item.quantity,
          comment: item.comment
        };
      });
      const total = this.state.total;
      const woComment = this.state.woComment;
      // console.log(woComment);
      const work = JSON.parse(localStorage.getItem("workorder"));
      work.jobs = finalItems;

      work.workorder.totalPrice = total;
      work.workorder.comment = woComment;
      work.workorder.sendTime = new Date();
      work.workorder.status = "pending";
      localStorage.setItem("workorder", JSON.stringify(work));
      const finalData = JSON.parse(localStorage.getItem("workorder"));
      console.log("final data", finalData);
      const data = await axios.post(
        process.env.REACT_APP_API_URL + "/user/newWorkorder",
        JSON.stringify(finalData)
      );
      console.log(data);
      if (data.statusText === "OK") {
        const work = JSON.parse(localStorage.getItem("workorder"));
        localStorage.removeItem("jobs");
        work.workorder.buildingNumber = "";
        work.workorder.apartmentNumber = "";
        work.workorder.totalPrice = "";
        work.workorder.comment = "";
        work.workorder.loginTime = new Date();
        localStorage.setItem("workorder", JSON.stringify(work));
        let region = JSON.parse(localStorage.getItem("currentUser")).region;
        window.location = "/rooms/" + region;
        // localStorage.removeItem("workorder");
      }
    } else {
      return;
    }
  };
  constructor(props) {
    super(props);
    let total = 0;
    let woComment = "";
    // let allItems = JSON.parse(localStorage.getItem("allItems"));
    if (localStorage.getItem("jobs")) {
      let jobs = JSON.parse(localStorage.getItem("jobs")).filter(
        m => m.checked == true
      );
      for (let i = 0; i < jobs.length; i++) {
        total += Math.ceil(jobs[i].quantity * jobs[i].price);
      }
    }
    // console.log(total);
    this.state = {
      total,

      woComment
    };
  }
  render() {
    let jobs = "";
    // console.log(this.state.woComment);
    let total = this.state.total;
    if (localStorage.getItem("jobs")) {
      //  jobs = JSON.parse(localStorage.getItem("jobs"));
      // console.log(total);
      jobs = JSON.parse(localStorage.getItem("jobs")).filter(
        m => m.checked == true
      );
    } else {
      jobs = false;
    }
    console.log(jobs);
    const showing = true;
    const adress = JSON.parse(localStorage.getItem("workorder")).workorder
      .adress;
    // const total = this.state.total;
    // const totalprice = this.state.allItems.map(
    //   item => item.quantity * item.price
    // );

    // const total = totalprice.map(item => );
    const workorder = JSON.parse(localStorage.getItem("workorder"));
    const buildingNumber = workorder.workorder.buildingNumber;
    const value = workorder.workorder.apartmentNumber;
    return (
      <React.Fragment>
        <div className="container main-page">
          <NavBar
            {...this.props}
            adress={adress}
            showing={showing}
            build={buildingNumber}
            value={value}
            classs="disabled"
            onHandleAptNum={this.handleAptNum}
            onChangeBuildings={() => this.handleChangeBuilding()}
            onBackButton={this.handleBackButton}
            onFinishedButton={this.handleFinishedButton}
          />
          <div className="work-order border text-center mt-3">
            <h1 className="m-3">Work order</h1>
            <table className="table">
              <thead>
                <tr>
                  <th>Room</th>
                  <th>Item</th>
                  <th>SubCategory</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total Price</th>
                  <th>Comment</th>
                </tr>
              </thead>
              <tbody>
                {jobs
                  ? jobs.map(item => (
                      <tr>
                        <td>{item.room}</td>
                        <td>{item.name}</td>
                        <td>{item.subCategory}</td>

                        <td>{item.quantity}</td>
                        <td>${item.price}</td>
                        <td>
                          {" "}
                          $
                          {Math.ceil(item.quantity * item.price)
                            ? Math.ceil(item.quantity * item.price)
                            : 0}
                        </td>
                        <td>{item.comment}</td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
            <div>Total Price: ${total}</div>
            <textarea
              placeholder="General Notes"
              onChange={this.handleGeneralNotes}
              name=""
              id=""
              cols="30"
              rows="4"
            />

            <div className="buttons">
              <button
                onClick={() => this.handleBackButton()}
                className="btn btn-warning m-3"
              >
                ⏎ Cancel
              </button>
              <button
                className="btn btn-success m-3"
                // placeholder="General Notes"
                onClick={this.handlePrintButton}
                // name=""
                // id=""
                // cols="30"
                // rows="4"
              >
                Print
              </button>

              <button
                onClick={() => this.handleFinishedButton()}
                className="btn btn-primary m-3"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Wo;
