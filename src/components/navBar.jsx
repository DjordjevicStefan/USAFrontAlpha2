import React, { Component } from "react";
import axios from "axios";
import "../css/navbar.css";
import logo from "../img/ben-leeds-logo.png";
import WorkOrder from "./workOrder";

class NavBar extends Component {
  state = {
    data: [],
    value: "",
    showing: true
  };

  handlelogOut() {
    const answer = window.confirm("Are you sure you want to log out?");
    if (answer) {
      this.props.history.push(`/`);
      // window.location = `/`;
    }
  }
  handleWorkorders = async e => {
    if (e.target.value == "saved") {
      e.preventDefault();
      e.persist();
      let userId = JSON.parse(localStorage.getItem("currentUser"))._id;
      // let workorders = JSON.parse(localStorage.getItem("savedWorkorders"));

      console.log(userId);
      // let workorders = JSON.parse(localStorage.getItem("savedWorkorders"));
      // let workorders1 =
      const data = await axios.get(
        process.env.REACT_APP_API_URL + `/user/getAllTempWorkorders/${userId}`
      );
      console.log(data.data);
      localStorage.setItem("savedWorkorders", JSON.stringify(data.data));
      localStorage.setItem("workorders", JSON.stringify(data.data));
      // console.log(workorders1);
      // workorders = data;
      // window.alert("In development...");
      // let value = "saved";
      this.props.history.push(`/user/workorders/${e.target.value}`);
      document.location.reload();
    } else if (e.target.value == "pending") {
      // let userId = JSON.parse(localStorage.getItem("savedWorkorders")).userId;
      e.preventDefault();

      console.log(e.target.value);
      localStorage.removeItem("jobs");
      let workorders = JSON.parse(localStorage.getItem("completedWorkorders"));
      localStorage.setItem("workorders", JSON.stringify(workorders));

      // window.location.reload();
      this.props.history.push(`/user/workorders/${e.target.value}`);
      document.location.reload();
      // window.location = `/user/workorders/${e.target.value}`;
    } else if ((e.target.value = "new")) {
      localStorage.removeItem("jobs");
      localStorage.removeItem("startBtn");

      let work = JSON.parse(localStorage.getItem("workorder"));
      work.jobs = {};
      work.buildingNumber = "";
      work.apartmentNumber = "";
      work.adress = "";
      delete work._id;

      localStorage.setItem("workorder", JSON.stringify(work));
      const region = JSON.parse(localStorage.getItem("currentUser")).region;

      this.props.history.push(`/rooms/${region}`);
      document.location.reload();
      // window.location = `/rooms/${region}`;
    } else {
    }
  };

  constructor(props) {
    super(props);
    const buildings = JSON.parse(localStorage.getItem("buildings")).filter(
      m => m.region === this.props.match.params.id
    );

    const data = [...this.state.data];

    const d = buildings.map(
      element => (element.value = element.adress + " (" + element.zip + ")")
    );

    const showing = false;
    data.push(d);
    this.state = { data, showing };
  }

  handleChange(e) {
    const building1 = e.target.value;
    const build = building1.split(":");
    const building = build[0];

    const work = JSON.parse(localStorage.getItem("workorder"));
    work.buildingNumber = building;
    localStorage.setItem("workorder", JSON.stringify(work));
  }

  render() {
    let klasa = "";
    if (this.props.adress == "Wrong Building Number") {
      klasa = "build-div btn btn-danger";
    } else {
      klasa = "build-div btn btn-success";
    }

    const data = this.state.data;
    const datas = data[0];
    const workorder = JSON.parse(localStorage.getItem("workorder"));
    let dat = new Date(workorder.loginTime).toLocaleString();
    const dateNow =
      dat.substring(0, dat.length - 6) + dat.slice(dat.length - 3);
    return (
      <nav className="nav-box  text-center">
        <div className="logoBenLeeds p-3">
          <img src={logo} alt="Ben Leeds Logo" />
        </div>

        <select
          className="select dropdown-primary form-control mb-3"
          name="country"
          onChange={this.handleWorkorders}
        >
          <option defaultValue>Choose your option</option>
          <option value="new">New Work Order</option>
          <option value="saved">Saved Work Orders</option>
          <option value="pending">Sent Work Orders</option>
          {/* <label class="mdb-main-label">Blue select</label> */}
          {/* <option value="">Select building</option>
                  {this.props.build[0].map(e => {
                    console.log(e);
                    // console.log(e);
                    // console.log(this.state.data);
                    // console.log(e);
                    // console.log(index);

                    return <option value={e}>{e}</option>;
                  })} */}
        </select>
        <div className="row m-3 ">
          <div className="col-sm-6 offset-3">
            <div className="input-group ">
              <div className="input-group-prepend ">
                <div className="build input-group-text text-white ">
                  Date/Time:
                </div>
              </div>
              <input
                disabled
                type="text"
                className="form-control text-center"
                defaultValue={dateNow}
              />
            </div>
          </div>
        </div>
        <div className="container mainPage">
          <div className="row nav-box">
            <div className="col-sm-4">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <div className="build input-group-text  text-white">
                    Building#
                  </div>
                </div>

                <input
                  type="number"
                  min="1"
                  value={this.props.build}
                  className={`build-input ${this.props.classs}`}
                  onChange={this.props.onHandleInput}
                />
                <br />
                {this.props.showing ? (
                  <div className={klasa}>{this.props.adress}</div>
                ) : null}
              </div>
            </div>
            <div className="col-sm-4">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <div className="build input-group-text  text-white">
                    Apartment#
                  </div>
                </div>
                <input
                  value={this.props.value}
                  onChange={this.props.onHandleAptNum}
                  className={`build-input ${this.props.classs}`}
                />
              </div>
              {/* <label className="btn btn-secondary ">Workorders</label> */}
            </div>
            <div className="col-sm-4">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <div className="build input-group-text  text-white">
                    Square Footage
                  </div>
                </div>
                <input
                  value={this.props.value2}
                  onChange={this.props.onHandleSquare}
                  className={`build-input ${this.props.classs}`}
                />
              </div>

              {/* <label className="btn btn-secondary ">Workorders</label> */}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
