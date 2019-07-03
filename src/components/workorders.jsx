import React, { Component } from "react";
import NavBar from "./navBar.jsx";
import { Link } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import Checkbox from "./checkbox.jsx";
import _ from "lodash";
import "../css/fullroom.css";
import { getRooms } from "../services/fakeRoomService";
import axios from "axios";
import qs from "qs";
import SearchBox from "./common/searchbox";
import getAllUsers from "../services/users";
class Workorders extends Form {
  state = {
    data: {},
    errors: {},
    rooms: {},
    value: {},
    schema: {},
    checked: [],
    rooms2: {},
    build: []
  };

  handleBackButton = () => {
    this.props.history.push("/rooms/" + this.props.match.params.m);
  };
  async componentDidMount() {}
  getCurrentRoom = () => {
    return this.props.match.params.id;
  };
  handleBackButton = () => {
    const region = JSON.parse(localStorage.getItem("currentUser")).region;
    this.props.history.push("/rooms/" + region);
  };
  handlelogOut() {
    const answer = window.confirm("Are you sure you want to log out?");
    if (answer) {
      window.location = `/`;
    }
  }
  handleFinishedButton = () => {
    // console.log(this.props.match);
    this.props.history.push(
      "/rooms/" + this.props.match.params.id + "/work-order"
    );
    const work = JSON.parse(localStorage.getItem("workorder"));
    const date = new Date();
    work.workorder.completedTime = date;
    localStorage.setItem("workorder", JSON.stringify(work));
  };

  handleChangeArea = ({ currentTarget: input }) => {
    const value = this.state.value;

    value[input.name] = input.value;

    this.setState({ value });

    const rooms = this.state.allItems.find(room => room._id === input.id);

    rooms.comment = this.state.value[input.name];

    localStorage.setItem("allItems", JSON.stringify(this.state.allItems));
  };
  handleSearch = query => {
    this.setState({ searchQuery: query });
  };
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.state.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.state.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = e => {
    const input = e.currentTarget;

    const errors = { ...this.state.errors };
    const schema = { ...this.state.schema };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };

    data[input.name] = input.value;

    this.setState({ data, errors });

    const rooms = this.state.allItems.find(room => room._id === input.id);

    rooms.quantity = data[input.name];

    localStorage.setItem("allItems", JSON.stringify(this.state.allItems));

    // schema = {
    //   [input.name]: Joi.number().label("quantity")
    // };
    // this.setState({ schema });

    // const data = { ...this.state.data };
    // console.log(input.value);
    // console.log(e.target.value);
    // data[input.name] = input.value;
    // this.setState({ data });

    // this.setState({ value: e.target.value });
  };
  // changeBuild(value) {
  //   // console.log(value);
  // }
  handleSearch = query => {
    this.setState({ searchQuery: query });
    console.log(query);
  };
  handleInput = e => {
    const { showing } = this.state;
    const buildNumber = JSON.parse(localStorage.getItem("workorder")).workorder
      .buildingNumber;

    const buildings = JSON.parse(localStorage.getItem("buildings")).find(
      m => m.number == buildNumber
    );

    // element.value = element.number + " (" + element.zip + ")";
    const adress = buildings.adress + " (" + buildings.zip + ")";
    // console.log(buildings);
    this.setState({ adress });
  };
  handleCheckboxChange = e => {
    const checked = { ...this.state.checked };

    const rooms = this.state.allItems.find(
      room => room._id === e.currentTarget.id
    );
    if (e.target.checked === false) {
      checked[e.currentTarget.name] = e.target.checked;
      rooms.checked = false;

      localStorage.setItem("allItems", JSON.stringify(this.state.allItems));
    } else {
      checked[e.currentTarget.name] = e.target.checked;
      rooms.checked = true;
      localStorage.setItem("allItems", JSON.stringify(this.state.allItems));
    }
    this.setState({ checked });
  };

  // handleChange1(e) {
  //   const building1 = e.target.value;
  //   const build = building1.split(":");
  //   const building = build[0];
  //   // console.log(building);
  //   const work = JSON.parse(localStorage.getItem("workorder"));
  //   work.workorder.buildingNumber = building;
  //   localStorage.setItem("workorder", JSON.stringify(work));
  // }
  handleWorkOrder = async () => {
    // const workOrder = JSON.parse(localStorage.getItem("workorder"));

    const allItems = JSON.parse(localStorage.getItem("allItems"));
    const copyItems = [...allItems].filter(item => {
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
    const work = JSON.parse(localStorage.getItem("workorder"));
    work.jobs = finalItems;
    work.workorder.status = "saved";
    work.workorder.sendTime = new Date();
    work.workorder.completedTime = new Date();
    localStorage.setItem("workorder", JSON.stringify(work));
    const finalData = JSON.parse(localStorage.getItem("workorder"));
    console.log(finalData);
    const data = await axios.post(
      process.env.REACT_APP_API_URL + "/user/newWorkorder",
      JSON.stringify(finalData)
    );
    console.log(data);
  };

  constructor(props) {
    super(props);
    // const data = {};
    // const errors = {};
    // const value = {};
    // const checked = {};
    // const rooms = getRooms();
    // localStorage.setItem("workorder", JSON.stringify(work));

    // console.log(response.workorders);

    const allItems = JSON.parse(localStorage.getItem("workorders"));
    console.log(allItems);
    // const room = this.props.match.params.m;

    // const renderedItems = allItems;
    // {
    //   renderedItems.map(item => (checked[item.name] = false));
    // }

    // let schema = this.state.schema;

    // let items = renderedItems;

    // {
    //   items.map(item => (schema[item.name] = Joi.number().label("quantity")));
    // }

    // const buildings = JSON.parse(localStorage.getItem("buildings")).filter(
    //   m => m.region === this.props.match.params.m
    // );

    // const build = [...this.state.build];

    // // const d = buildings.map(
    //   element =>
    //     (element.value =
    //       element.number +
    //       ":" +
    //       " " +
    //       element.adress +
    //       " (" +
    //       element.zip +
    //       ")")
    // );

    // build.push(d);
    // this.state = { data };

    // const workorder = JSON.parse(localStorage.getItem("workorder"));
    // const build1 = [];
    // build1.push(workorder.workorder.buildingNumber);
    // build.push(build1);
    // const adress = [];
    // const searchQuery = "";
    // console.log(build);
    const searchQuery = "";
    this.state = {
      allItems,
      searchQuery
    };
  }

  render() {
    console.log(this.state.allItems);
    let workorders = JSON.parse(localStorage.getItem("workorders"));
    console.log(workorders);
    // const allItems = this.state.allItems;
    const searchQuery = this.state.searchQuery;

    // console.log(this.state.searchQuery);
    // const searchQuery = this.state.searchQuery;
    // const showing = true;
    // // const adress = [];
    // if (
    //   !JSON.parse(localStorage.getItem("workorder")).workorder.buildingNumber
    // ) {
    // }
    // const buildNumber = JSON.parse(localStorage.getItem("workorder")).workorder
    //   .buildingNumber;

    // const building = JSON.parse(localStorage.getItem("buildings")).find(
    //   m => m.number == buildNumber
    // );

    // // element.value = element.number + " (" + element.zip + ")";

    // // const { data, errors, checked, renderedItems } = this.state;

    // const adress = building.adress + " (" + building.zip + ")";
    // console.log(searchQuery);

    // if (searchQuery) {
    //   datas = this.state.allItems.filter(m =>
    //     m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
    //   );
    // }
    // let title = "";
    // if (datas[0] == undefined) {
    //   title = "Not found";
    // } else {
    //   title = datas[0].room;
    // }
    // console.log(datas);
    // let datas = this.state.allItems;
    let allItems = [];
    if (this.props.match.params.i === "saved") {
      allItems = workorders.filter(m => m.status == this.props.match.params.i);
    } else {
      allItems = workorders.filter(m => m.status == this.props.match.params.i);
    }

    const region = JSON.parse(localStorage.getItem("currentUser")).region;
    console.log(allItems);
    if (searchQuery) {
      allItems = allItems.filter(m =>
        m.adress.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }
    // if(){

    // }
    // const workorder = JSON.parse(localStorage.getItem("workorder"));
    // const value = workorder.workorder.apartmentNumber;
    // const { adress } = this.state;
    // console.log(adress);

    return (
      <React.Fragment>
        <div className="container mainPage">
          <NavBar
            {...this.props}
            build={this.state.build}
            // onHandleInput={this.handleInput}
            // build={build}
            onHandleChange={this.handleChange1}
            // onChangeBuildings={() => this.handleChangeBuilding()}
            onHandleAptNum={this.handleAptNum}
            onBackButton={this.handleBackButton}
            onFinishedButton={this.handleFinishedButton}
          />
          <div className="rooms border text-center">
            <h1 className="lead m-2">
              All {this.props.match.params.i} workorders
            </h1>

            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <table className="table">
              <thead>
                <tr>
                  <th>Save/Send Date</th>
                  <th>Building Number</th>
                  <th>Apartment Number</th>
                  <th>Adress</th>

                  <th>Status</th>

                  <th>Link</th>
                </tr>
              </thead>

              <tbody>
                {allItems.map(item => (
                  <tr key={item.name}>
                    <td>{new Date(item.sendTime).toLocaleString()}</td>
                    <td>{item.buildingNumber}</td>
                    <td>{item.apartmentNumber}</td>
                    <td>{item.adress}</td>
                    <td>{item.status}</td>

                    <td>
                      <Link
                        to={{
                          pathname: `/rooms/${region}`,
                          state: {
                            buildingNumber: item.buildingNumber,
                            apartmentNumber: item.apartmentNumber,
                            jobs: item.jobs
                          }
                        }}
                      >
                        Resume to Workorder
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Workorders;
