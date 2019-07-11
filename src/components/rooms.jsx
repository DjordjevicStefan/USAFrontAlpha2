import React, { Component } from "react";
import axios from "axios";
import "../css/navbar.css";

import NavBar from "./navBar.jsx";
import { toast, ToastContainer } from "react-toastify";
import Room from "./room.jsx";
import { getRooms } from "../services/fakeRoomService";

class Rooms extends Component {
  state = {
    value: [],
    build: [],
    allItems: []
  };

  async componentDidMount() {
    const data = await axios.get(
      process.env.REACT_APP_API_URL + "/user/allWorkorders"
    );
    console.log(data);

    localStorage.setItem("workorders", JSON.stringify(data.data));

    const work = JSON.parse(localStorage.getItem("workorder"));
    let finalData = {};
    finalData.buildingNumber = work.buildingNumber;
    finalData.apartmentNumber = work.apartmentNumber;
    finalData.userId = work.userId;

    // work.autosaveTime = new Date();
    // work.jobs = jobs;
    // localStorage.setItem("workorder", JSON.stringify(work));
    // const finalData = JSON.parse(localStorage.getItem("workorder"));
    console.log(finalData);
    const data1 = await axios.post(
      process.env.REACT_APP_API_URL + "/user/getTempWorkorder",
      JSON.stringify(finalData)
    );
    console.log(data1);
  }

  handleBackButton = url => {
    // this.props.history.push("/rooms/" + this.props.match.params.id);
    // return console.log(this.props.match.url);
  };
  handleFinishedButton = () => {
    this.props.history.push(
      "/rooms/" + this.props.match.params.id + "/work-order"
    );
    const work = JSON.parse(localStorage.getItem("workorder"));
    const date = new Date();
    work.completedTime = date;
    localStorage.setItem("workorder", JSON.stringify(work));
  };

  handleWorkOrder = async () => {
    window.alert("In development...");
  };

  handleInput = e => {
    // console.log(e.target.value);
    const { showing } = this.state;
    // const{ build}=this.state;
    let buildings = JSON.parse(localStorage.getItem("buildings")).filter(
      m => m.region === this.props.match.params.id
    );

    // if (e.target.value) {
    //   let building = buildings.find(m => m.number == e.target.value);
    //   if (building == undefined) {
    //     toast.error(
    //       "Building number doesn't exist, please enter a valid building number!"
    //     );
    //   }
    // }
    let building = buildings.find(m => m.number == e.target.value);

    const work = JSON.parse(localStorage.getItem("workorder"));

    if (building === undefined) {
      const adress = "Wrong Building Number";

      const work = JSON.parse(localStorage.getItem("workorder"));
      work.buildingNumber = "";
      work.adress = adress;

      localStorage.setItem("workorder", JSON.stringify(work));
      let buildingNum = e.target.value;
      this.setState({ showing: true, adress, buildingNum });
    } else {
      const adress = building.adress + " (" + building.zip + ")";

      const work = JSON.parse(localStorage.getItem("workorder"));
      work.buildingNumber = e.target.value;
      work.adress = adress;
      localStorage.setItem("workorder", JSON.stringify(work));
      let buildingNum = e.target.value;
      this.setState({ showing: true, adress, buildingNum });
    }
    localStorage.removeItem("jobs");
  };

  handleAptNum = e => {
    let value = "";

    // const workOrder = JSON.parse(localStorage.getItem("workorder"));
    // workOrder.workorder.apartmentNumber = e.target.value;
    const work = JSON.parse(localStorage.getItem("workorder"));
    work.apartmentNumber = e.target.value;
    localStorage.setItem("workorder", JSON.stringify(work));
    // localStorage.setItem("workorder", JSON.stringify(workOrder));
    // localStorage.removeItem("jobs");
    this.setState({
      value: e.target.value
    });
  };
  handlelogOut() {
    const answer = window.confirm("Are you sure you want to log out?");
    if (answer) {
      localStorage.removeItem("jobs");
      document.location = "/";
    }
  }
  constructor(props) {
    super(props);
    // toast.error("Please enter Building and Apartment number");
    // const build = [...this.state.build];

    let build = "";
    const adress = "";
    let showing = false;
    let value = "";

    // let allItems = JSON.parse(localStorage.getItem("allItems"));
    // let workorder = JSON.parse(localStorage.getItem("workorder"));

    // let jobs = JSON.parse(localStorage.getItem("jobs"));

    // const jobs = JSON.parse(localStorage.getItem("jobs"));

    // if (!localStorage.getItem("jobs")) {
    //   this.state = { allItems, workorder };
    // }
    // let checkedJobs = jobs.map(item => {
    //   return {
    //     name: item.name,
    //     price: item.price,
    //     room: item.room,
    //     subCategory: item.subCategory,
    //     quantity: item.quantity,
    //     comment: item.comment,
    //     _id: item.id
    //   };
    // });

    // let k = checkedJobs.filter(j => allItems.filter(m => m.name == j.name));
    // // console.log(kurac);
    // let j = checkedJobs.map(j => j).map(m => m.name);
    // let p = allItems.filter(d => d.name != j.find(m => m == d.name));

    // allItems = k.concat(p);
    // localStorage.setItem("allItems", JSON.stringify(allItems));
    // localStorage.setItem("jobs", JSON.stringify(allItems));

    // if (this.props.location.state) {
    //   const buildNumber = this.props.location.state.buildingNumber;
    //   let building = buildings.find(m => m.number == buildNumber);
    //   // }urac
    //   const adress = building.adress + " (" + building.zip + ")";
    //   // console.log(buildings);
    //   const work = JSON.parse(localStorage.getItem("workorder"));
    //   work.workorder.id = this.props.location.state.id;
    //   work.workorder.buildingNumber = buildNumber;
    //   work.workorder.apartmentNumber = this.props.location.state.apartmentNumber;
    //   work.workorder.adress = adress;
    //   localStorage.setItem("workorder", JSON.stringify(work));
    //   showing = true;
    //   this.state = { showing: showing, adress };

    //   value = this.props.location.state.apartmentNumber;
    // }
    // let allItems;
    let rooms = getRooms();
    this.state = {
      rooms: rooms,
      value,
      showing: false,
      build
    };
  }

  render() {
    let adress = [];
    // console.log(typeof this.state.buildingNum);
    let showing = this.state.showing;
    // console.log(this.props);
    // let value = "";

    // console.log(buildNumber);
    let buildings = JSON.parse(localStorage.getItem("buildings")).filter(
      m => m.region == this.props.match.params.id
    );
    let value = "";
    value = this.state.value;

    // if (localStorage.getItem("workorder")) {
    let workorder = JSON.parse(localStorage.getItem("workorder"));
    let build = workorder.buildingNumber;
    let buildNumber = workorder.buildingNumber;
    console.log(workorder.adress);

    // if (e.target.value) {
    //   let building = buildings.find(m => m.number == e.target.value);
    //   if (building == undefined) {
    //
    //   }
    // }

    console.log(this.state.buildingNum, workorder.adress);
    let building = "";
    // let work = JSON.parse(localStorage.getItem("workorder"));
    if (this.state.buildingNum && workorder.adress != undefined) {
      console.log("radi");
      value = workorder.apartmentNumber;
      adress = workorder.adress;
      // let region = JSON.parse(localStorage.getItem("currentUser")).region;
      // let buildings = JSON.parse(localStorage.getItem("buildings")).filter(
      //   m => m.region == region
      // );

      // let building = buildings.find(m => m.number == buildNumber);

      // adress = building.adress + " (" + building.zip + ")";
      // let { showing } = this.state;
      showing = true;
    } else {
      showing = false;
    }

    if (workorder.adress != "" && workorder.buildingNumber != "") {
      value = workorder.apartmentNumber;
      adress = workorder.adress;
      showing = true;
    }
    // if (this.state.buildingNum) {
    //   console.log("radi buildnumb");
    //   // setInterval()

    //   // if (work.workorder.buildingNumber == "") {
    //   //
    //   setTimeout(
    //     (this.state.buildingNum = () => {
    //       let work = JSON.parse(localStorage.getItem("workorder"));
    //       if (work.workorder.buildingNumber == "") {
    //         toast.error(
    //           "Building number doesn't exist, please enter a valid building number!"
    //         );
    //       }
    //     }),
    //     2500
    //   );
    //   // } else {
    //   // }
    // } else {
    //   console.log("thisshit");
    // }

    // console.log(typeof buildNumber);
    // if (buildNumber != undefined && work.workorder.adress == "") {
    //   toast.error(
    //     "Building number doesn't exist, please enter a valid building number!"
    //   );
    // }

    // }
    // let value = "";
    // let workorder = JSON.parse(localStorage.getItem("workorder"));
    // if (workorder.workorder.buildingNumber != "") {
    //   adress = workorder.workorder.adress;

    //   console.log(adress, value);
    // } else {
    // }

    let rooms = this.state.rooms.map(room => {
      return (
        <Room
          key={room.id}
          region={this.props.match.params.id}
          id={room.id}
          image={room.image}
          name={room.name}
        />
      );
    });

    return (
      <div className="container main-page">
        <ToastContainer />
        <NavBar
          {...this.props}
          showing={showing}
          value={value}
          // build={build}
          onHandleInput={this.handleInput}
          adress={adress}
          classs=""
          onHandleChange={this.handleChange1}
          onHandleAptNum={this.handleAptNum}
          onChangeBuildings={() => this.handleChangeBuilding()}
        />
        <div className="buttons">
          <div>
            <button
              onClick={() => this.handleBackButton()}
              className="btn btn-warning m-3"
            >
              ⏎ Home
            </button>
            <button
              onClick={() => this.handlelogOut()}
              className="btn btn-danger m-3"
            >
              &#x2716; Logout
            </button>
            <button
              onClick={() => this.handleWorkOrder()}
              className="btn btn-success m-3"
            >
              Save
            </button>
            <button
              onClick={() => this.handleFinishedButton()}
              className="btn btn-primary m-3"
            >
              Complete All
            </button>
          </div>
        </div>
        {adress && value ? <div className="row">{rooms}</div> : null}
      </div>
    );
  }
}

export default Rooms;
