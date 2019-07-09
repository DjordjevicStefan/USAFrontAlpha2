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
    if (e.target.value === "saved") {
      e.preventDefault();
      console.log(this);
      window.alert("In development...");
    } else if (e.target.value === "pending") {
      e.preventDefault();

      localStorage.removeItem("jobs");
      // window.location.reload();
      this.props.history.push(`/user/workorders/${e.target.value}`);
      document.location.reload();
      // window.location = `/user/workorders/${e.target.value}`;
    } else if ((e.target.value = "new")) {
      localStorage.removeItem("jobs");

      let work = JSON.parse(localStorage.getItem("workorder"));
      work.jobs = {};
      work.workorder.buildingNumber = "";
      work.workorder.apartmentNumber = "";
      work.workorder.adress = "";

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
    work.workorder.buildingNumber = building;
    localStorage.setItem("workorder", JSON.stringify(work));
  }

  render() {
    const data = this.state.data;
    const datas = data[0];
    const workorder = JSON.parse(localStorage.getItem("workorder"));

    const dateNow = new Date(workorder.workorder.loginTime).toLocaleString();

    return (
      <nav className="nav-box  text-center">
        <div className="logoBenLeeds p-3">
          <img src={logo} alt="Ben Leeds Logo" />
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
                  <div className="build-div">{this.props.adress}</div>
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
              <select
                className="mdb-select md-form colorful-select dropdown-primary form-control mb-3"
                name="country"
                onChange={this.handleWorkorders}
              >
                <option disabled selected>
                  Choose your option
                </option>
                <option value="new">New Workorder</option>
                <option value="saved">Saved Workorders</option>
                <option value="pending">Sent Workorders</option>
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
            </div>
            <div className="col-sm-4">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <div className="build input-group-text text-white">Date:</div>
                </div>

                <input
                  type="text"
                  className="form-control"
                  defaultValue={dateNow}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
