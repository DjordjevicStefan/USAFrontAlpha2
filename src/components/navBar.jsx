import React, { Component } from "react";
import { Link } from "react-router-dom";

import qs from "qs";
import axios from "axios";

import "../css/navbar.css";

import logo from "../img/ben-leeds-logo.png";
class NavBar extends Component {
  state = {
    data: [],
    value: "",
    showing: true
  };

  handlelogOut() {
    const answer = window.confirm("Are you sure you want to log out?");
    if (answer) {
      window.location = `/`;
    }
  }
  async handleWorkorders(e) {
    console.log(e.target.value);
    if (e.target.value === "saved") {
      e.preventDefault();
      e.persist();
      console.log("work");
      console.log("sta");
      localStorage.removeItem("jobs");
      const user = JSON.parse(localStorage.getItem("currentUser"));
      // window.location.reload();
      // const params = {
      //   email: user.email,
      //   password: 123
      // };
      console.log("radiiiiiiiiiiiiiiiiiiiii");
      // this.props.history.push(`./user/workorders`);

      const data = await axios.get(
        process.env.REACT_APP_API_URL + `/user/latestWorkorder/${user._id}`
      );
      console.log(data);
      let work = JSON.parse(localStorage.getItem("workorders"));
      work.push(data.data);
      localStorage.setItem("workorders", JSON.stringify(work));
      // await axios.get(process.env.REACT_APP_API_URL)
      // event.persist();
      // localStorage.setItem("workorders", JSON.stringify(response.workorders));
      window.location = `/user/workorders/${e.target.value}`;
    } else if (e.target.value === "pending") {
      e.preventDefault();
      console.log("work");
      console.log("sta");
      localStorage.removeItem("jobs");
      // window.location.reload();

      window.location = `/user/workorders/${e.target.value}`;
    } else if ((e.target.value = "new")) {
      localStorage.removeItem("jobs");
      const work = JSON.parse(localStorage.getItem("workorder"));
      work.workorder.buildingNumber = "";
      work.workorder.apartmentNumber = "";
      work.workorder.adress = "";
      //login vreme ?
      localStorage.setItem("workorder", JSON.stringify(work));
      const region = JSON.parse(localStorage.getItem("currentUser")).region;
      window.location = `/rooms/${region}`;
    }
  }

  constructor(props) {
    super(props);
    const buildings = JSON.parse(localStorage.getItem("buildings")).filter(
      m => m.region === this.props.match.params.id
    );
    // console.log(buildings);
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
    console.log(building);
    const work = JSON.parse(localStorage.getItem("workorder"));
    work.workorder.buildingNumber = building;
    localStorage.setItem("workorder", JSON.stringify(work));
  }

  render() {
    const data = this.state.data;
    const datas = data[0];
    const workorder = JSON.parse(localStorage.getItem("workorder"));

    const dateNow = new Date(workorder.workorder.loginTime).toLocaleString();
    console.log(dateNow);
    console.log(dateNow.toLocaleString());
    const { showing } = this.state;
    const { adress } = this.state;
    // console.log(this.state.data);
    // console.log(this.state.adress);
    // console.log(this.props.adress);
    return (
      <nav className="nav-box  text-center">
        <div className="logo p-3">
          <img src={logo} alt="Ben Leeds Logo" />
        </div>

        <div className="container mainPage">
          <div className="row nav-box">
            <div className="col-sm-4">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <div
                    // onChangeBuild={() => this.props.changeBuild(this.value)}
                    className="build input-group-text  text-white"
                  >
                    Building#
                  </div>
                </div>

                <input
                  type="number"
                  min="1"
                  className={`build-input ${this.props.classs}`}
                  onChange={this.props.onHandleInput}
                  // adress={this.props.adress}
                  // onChangeInput={this.handleInput}
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
              <select
                className="btn btn-secondary form-control m-3"
                name="country"
                // onChange={() => this.setState({ showing: !showing })}
                onChange={this.handleWorkorders}
                // currentBuild={() => this.props.currentBuild(this.state.build)}
                // build={this.props.build}
                // value={this.props.build}
              >
                <option value="">Workorders</option>
                <option value="new">New Workorder</option>
                <option value="saved">Save Workorders</option>
                <option value="pending">Sent Workorders</option>

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
            {/* <Link to={"/user/workorders"} className="btn btn-warning mt-3 mb-3">
              My Workorders
            </Link> */}
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
