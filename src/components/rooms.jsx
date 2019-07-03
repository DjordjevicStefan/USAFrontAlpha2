import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/navbar.css";

import NavBar from "./navBar.jsx";

import Room from "./room.jsx";
import { getRooms } from "../services/fakeRoomService";
import WorkOrder from "./workOrder";

class Rooms extends Component {
  state = {
    rooms: getRooms(),
    value: [],
    build: []
  };

  componentDidMount() {}

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
    work.workorder.completedTime = date;
    localStorage.setItem("workorder", JSON.stringify(work));
  };

  // handleChange1 = e => {
  //   console.log(e);
  //   const building1 = e.target.value;
  //   const build = building1.split(":");
  //   const building = build[0];
  //   console.log(building);
  //   const work = JSON.parse(localStorage.getItem("workorder"));
  //   work.workorder.buildingNumber = building;
  //   localStorage.setItem("workorder", JSON.stringify(work));
  // };

  handleInput = e => {
    console.log(e.target.value);
    const { showing } = this.state;
    console.log();
    // const buildings = "";
    // if (buildingNumber) {
    //   buildings = JSON.parse(localStorage.getItem("buildings")).find(
    //     m => m.number == buildingNumber
    //   );
    // } else {
    let buildings = JSON.parse(localStorage.getItem("buildings")).filter(
      m => m.region === this.props.match.params.id
    );
    let building = buildings.find(m => m.number == e.target.value);
    // }
    console.log(buildings);
    if (building === undefined) {
      const adress = "";

      const work = JSON.parse(localStorage.getItem("workorder"));
      work.workorder.buildingNumber = "";
      work.workorder.adress = adress;
      localStorage.setItem("workorder", JSON.stringify(work));
      this.setState({ showing: false, adress: false });
    } else {
      const adress = building.adress + " (" + building.zip + ")";
      console.log(buildings);
      const work = JSON.parse(localStorage.getItem("workorder"));
      work.workorder.buildingNumber = e.target.value;
      work.workorder.adress = adress;
      localStorage.setItem("workorder", JSON.stringify(work));
      this.setState({ showing: !showing, adress });
    }
    localStorage.removeItem("jobs");
    // element.value = element.number + " (" + element.zip + ")";
  };

  handleAptNum = e => {
    const value = "";

    const workOrder = JSON.parse(localStorage.getItem("workorder"));
    workOrder.workorder.apartmentNumber = e.target.value;

    localStorage.setItem("workorder", JSON.stringify(workOrder));
    localStorage.removeItem("jobs");
    this.setState({
      value: e.target.value
    });
  };
  handlelogOut() {
    const answer = window.confirm("Are you sure you want to log out?");
    if (answer) {
      localStorage.removeItem("jobs");
      window.location = `/`;
    }
  }
  constructor(props) {
    super(props);

    const build = [...this.state.build];

    let buildings = JSON.parse(localStorage.getItem("buildings")).filter(
      m => m.region == this.props.match.params.id
    );
    // const regionBuildings = {};
    // const d = buildings.map(
    //   element => (
    //     (regionBuildings.number = element.number),
    //     (regionBuildings.adress = element.address + " (" + element.zip + ")")
    //   )
    // );
    // console.log(d);

    // build.push(d);

    console.log(buildings);
    const adress = "";
    let showing = false;
    let value = [];
    // const value = "";
    if (this.props.location.state) {
      localStorage.setItem(
        "jobs",
        JSON.stringify(this.props.location.state.jobs)
      );
    }
    // let value = "";
    // const showing = "";
    if (this.props.location.state) {
      const buildNumber = this.props.location.state.buildingNumber;
      let building = buildings.find(m => m.number == buildNumber);
      // }
      const adress = building.adress + " (" + building.zip + ")";
      console.log(buildings);
      const work = JSON.parse(localStorage.getItem("workorder"));
      work.workorder.buildingNumber = buildNumber;
      work.workorder.apartmentNumber = this.props.location.state.apartmentNumber;
      work.workorder.adress = adress;
      localStorage.setItem("workorder", JSON.stringify(work));
      showing = true;
      this.state = { showing: showing, adress };

      value = this.props.location.state.apartmentNumber;
    }

    // this.state = { data };
    // if(this.props.location.state){
    //                                localStorage.setItem(
    //                                  "buildingNumber",
    //                                  JSON.stringify(
    //                                    this.location
    //                                      .state
    //                                      .buildingNumber
    //                                  )
    //                                );
    //                              }
    const allItems = JSON.parse(localStorage.getItem("allItems"));
    // const showing = [];
    const rooms = getRooms();
    this.state = {
      rooms: getRooms(),
      value: false,
      // build,
      showing
    };
  }
  handleNewWorkorders() {
    localStorage.removeItem("jobs");
    window.location = "/rooms/new-workorder";
  }

  render() {
    let adress = [];
    let showing = this.state.showing;
    console.log(this.props);
    const workorder = JSON.parse(localStorage.getItem("workorder"));
    let value = "";
    let buildNumber = "";
    // if (this.props.location.state) {
    //   const buildNumber = this.props.location.state.buildingNumber;
    //   const buildings = JSON.parse(localStorage.getItem("buildings")).find(
    //     m => m.number == buildNumber
    //   );
    //   // }
    //   const adress = buildings.adress + " (" + buildings.zip + ")";
    //   console.log(buildings);
    //   const work = JSON.parse(localStorage.getItem("workorder"));
    //   work.workorder.buildingNumber = buildNumber;
    //   work.workorder.adress = adress;
    //   localStorage.setItem("workorder", JSON.stringify(work));
    //   showing = true;
    //   // showing = showing;
    //   // this.setState({ showing: !showing, adress });

    //   value = this.props.location.state.apartmentNumber;
    // } else {
    buildNumber = JSON.parse(localStorage.getItem("workorder")).workorder
      .buildingNumber;
    value = workorder.workorder.apartmentNumber;
    // showing = true;
    // const { showing } = this.state;
    // showing = showing;
    // }
    let building = "";
    if (buildNumber == "") {
      adress = "";
      console.log("radii");
      // let workord = JSON.parse(localStorage.getItem("workorder"))
      // workord.workorder.apartmentNumber=""
      // localStorage.setItem("workorder", JSON.stringify(workord));
      showing = false;
    } else {
      let region = JSON.parse(localStorage.getItem("currentUser")).region;
      let buildings = JSON.parse(localStorage.getItem("buildings")).filter(
        m => m.region == region
      );
      let building = buildings.find(m => m.number == buildNumber);
      console.log(building);
      // console.log(building);
      // const adress = "";
      // if (building == undefined) {
      //   const adress = "Upisi adresu";
      // } else {
      //   // element.value = element.number + " (" + element.zip + ")";

      //   // const { data, errors, checked, renderedItems } = this.state;

      adress = building.adress + " (" + building.zip + ")";
      // let { showing } = this.state;
      showing = true;
    }
    // const showing = true;
    // }

    // const adress = workorder.workorder.buildingNumber;
    // console.log(value, adress);

    // const build = workorder.workorder.buildingNumber;
    // console.log(build);
    let rooms = this.state.rooms.map(room => {
      return (
        <Room
          region={this.props.match.params.id}
          id={room.id}
          image={room.image}
          name={room.name}
        />
      );
    });

    return (
      <div className="container main-page">
        <NavBar
          {...this.props}
          showing={showing}
          value={value}
          build={this.state.build}
          onHandleInput={this.handleInput}
          adress={adress}
          classs=""
          // build={build}
          onHandleChange={this.handleChange1}
          onHandleAptNum={this.handleAptNum}
          onChangeBuildings={() => this.handleChangeBuilding()}
        />
        <div className="buttons">
          <div className="col-6">
            <button
              onClick={() => this.handleBackButton()}
              className="btn btn-warning m-3"
            >
              ⏎ Home
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
          {/* <Link
              to={"/user/workorders"}
              onClick={this.handleWorkorders}
              className="btn btn-warning mt-3 mb-3"
            >
              My Workorders
            </Link>
            <Link
              to={"/rooms/new-workorder"}
              onClick={this.handleNewWorkorders}
              className="btn btn-secondary mt-3 mb-3 float-right"
            >
              New Workorder
            </Link> */}
          <button
            onClick={() => this.handlelogOut()}
            className="btn btn-danger m-3"
          >
            &#x2716; Logout
          </button>
        </div>
        {adress && value ? <div className="row">{rooms}</div> : null}
      </div>
    );
  }
}

export default Rooms;
