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
import SearchBox from "./common/searchbox";
import { KeyObject } from "crypto";

class FullRoom extends Form {
  state = {
    data: {},
    errors: {},
    rooms: {},
    value: {},
    value1: {},
    schema: {},
    checked: [],
    rooms2: {},
    build: []
  };

  componentDidMount() {}
  getCurrentRoom = () => {
    return this.props.match.params.id;
  };
  handleBackButton = async () => {
    let start = true;
    localStorage.setItem("startBtn", JSON.stringify(start));
    const jobs = JSON.parse(localStorage.getItem("jobs"));
    const work = JSON.parse(localStorage.getItem("workorder"));
    work.autosaveTime = new Date();
    if (jobs != null) {
      work.jobs = jobs;
    }

    localStorage.setItem("workorder", JSON.stringify(work));
    const finalData = JSON.parse(localStorage.getItem("workorder"));
    console.log(finalData);
    const data = await axios.post(
      process.env.REACT_APP_API_URL + "/user/newTempWorkorder",
      JSON.stringify(finalData)
    );
    console.log(data);
    this.props.history.push("/rooms/" + this.props.match.params.m);
  };
  handlelogOut() {
    const answer = window.confirm("Are you sure you want to log out?");
    if (answer) {
      localStorage.clear();
      document.location = "/";
    }
  }
  handleFinishedButton = async () => {
    let start = true;
    localStorage.setItem("startBtn", JSON.stringify(start));
    const jobs = JSON.parse(localStorage.getItem("jobs"));
    const work = JSON.parse(localStorage.getItem("workorder"));
    work.autosaveTime = new Date();
    if (jobs != null) {
      work.jobs = jobs;
    }

    localStorage.setItem("workorder", JSON.stringify(work));
    const finalData = JSON.parse(localStorage.getItem("workorder"));
    console.log(finalData);
    const data = await axios.post(
      process.env.REACT_APP_API_URL + "/user/newTempWorkorder",
      JSON.stringify(finalData)
    );

    this.props.history.push(
      "/rooms/" + this.props.match.params.id + "/work-order"
    );
    // const work = JSON.parse(localStorage.getItem("workorder"));
    const date = new Date();
    work.completedTime = date;
    localStorage.setItem("workorder", JSON.stringify(work));
  };

  handleChangeArea = ({ currentTarget: input }) => {
    const value = this.state.value1;
    console.log(input.name, value);

    value[input.id] = input.value;

    this.setState({ value });

    const rooms = this.state.allItems.find(room => room._id === input.id);

    rooms.comment = this.state.value[input.id];

    localStorage.setItem("allItems", JSON.stringify(this.state.allItems));
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

    data[input.id] = input.value;
    // console.log(input.value);

    // let number = e.currentTarget.value;
    // console.log(number);
    const allItems = JSON.parse(localStorage.getItem("allItems"));
    const rooms = this.state.allItems.find(room => room._id === input.id);
    console.log(rooms);
    rooms.quantity = data[input.id];

    console.log(data[input.name]);
    console.log(rooms.quantity);

    // localStorage.setItem("jobs", JSON.stringify(this.state.allItems));
    localStorage.setItem("allItems", JSON.stringify(this.state.allItems));
    console.log(this.state.allItems);
    this.setState({ data, errors, value: input.value });

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

  handleSearch = query => {
    this.setState({ searchQuery: query });
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
  handleHomeButton() {
    let work = JSON.parse(localStorage.getItem("workorder"));

    localStorage.removeItem("jobs");
    localStorage.removeItem("startBtn");

    work.jobs = {};
    work.buildingNumber = "";
    work.apartmentNumber = "";
    work.adress = "";
    work.squareFeet = "";
    delete work._id;

    localStorage.setItem("workorder", JSON.stringify(work));
    const region = JSON.parse(localStorage.getItem("currentUser")).region;

    this.props.history.push(`/rooms/${region}`);
    document.location.reload();
  }
  handleCheckboxChange = e => {
    const checked = { ...this.state.checked };
    // let value = this.state.value;
    // console.log(this.state.value);
    let value = this.state.value;
    // if (this.state.value[0] == undefined) {
    //   value = 1;
    //   console.log("radi", value);
    //   // this.setState({ value });
    // } else {
    //   value = this.state.value;
    // }

    console.log(checked, value);
    // console.log(this.state.value);
    const rooms = this.state.allItems.find(
      room => room._id === e.currentTarget.id
    );

    if (e.target.checked === false) {
      if (this.state.data[e.currentTarget.id] == undefined) {
        value = "";
      } else {
        value = this.state.data[e.currentTarget.id];
      }
      checked[e.currentTarget.id] = e.target.checked;
      rooms.checked = false;

      rooms.quantity = value;
      localStorage.setItem("allItems", JSON.stringify(this.state.allItems));
      // localStorage.setItem("jobs", JSON.stringify(this.state.allItems));

      this.setState({ checked });
    } else {
      checked[e.currentTarget.id] = e.target.checked;
      rooms.checked = true;
      // console.log(this.state.quantity);

      if (
        this.state.data[e.currentTarget.id] == undefined ||
        this.state.value[0] == undefined
      ) {
        value = 1;
      }
      // if (value == undefined) {
      //   value = 1;
      // }
      if (this.state.data[e.currentTarget.id] != undefined) {
        value = this.state.data[e.currentTarget.id];
        console.log("radi vrednost u data");
      } else {
        console.log("radivalue");
        rooms.quantity = value;
      }

      this.setState({ checked });
    }

    localStorage.setItem("allItems", JSON.stringify(this.state.allItems));

    const allItems = JSON.parse(localStorage.getItem("allItems"));

    let checkedAllItems = allItems.filter(m => m.checked === true);
    localStorage.setItem("jobs", JSON.stringify(checkedAllItems));
    value = "";
    this.setState({ value });
  };

  handleWorkOrder = async () => {
    window.alert("In development...");
  };

  handleLinks = (e, link) => {
    let target = this.state.target;
    // console.log(link);
    // let b = e.currentTarget.target;
    // console.log(e.currentTarget.target);
    if (link == "") {
      target = "#";
      this.setState({ target });
    } else {
      window.location = `${link}`;
      target = "_blank";
      this.setState({ target });
    }
  };
  handleSquare = e => {
    let value2 = "";
    let work = JSON.parse(localStorage.getItem("workorder"));
    // value = workorder.apartmentNumber;
    work.squareFeet = e.target.value;
    // const workOrder = JSON.parse(localStorage.getItem("workorder"));
    // workOrder.workorder.apartmentNumber = e.target.value;
    localStorage.setItem("workorder", JSON.stringify(work));

    this.setState({
      value2: e.target.value
    });
  };
  // handleLinksTarget = b => {
  //   b = "_blank";
  //   return b;
  // };
  constructor(props) {
    super(props);
    let data = {};
    const errors = {};
    const value = {};
    const value1 = {};
    const checked = {};
    const rooms = getRooms();
    let renderedItems = [];
    let room0 = "";
    let room = "";

    let allItems = [];
    if (JSON.parse(localStorage.getItem("jobs"))) {
      const jobs = JSON.parse(localStorage.getItem("jobs"));

      allItems = JSON.parse(localStorage.getItem("allItems"));
      data = { ...this.state.data };
      let newArr = [...jobs];
      let datas = {};
      newArr.forEach(i => {
        let x = i._id;
        datas[x] = i.quantity;
      });
      console.log(datas);
      data = datas;
      // let datas = [];

      // let datass = [];

      // newArr.map(m => {
      //   datas.push(m.name);
      // });

      // let name = newArr.filter(m => datas.push(m.name));
      // let kurac = newArr.map(k => k).map(v => v.quantity);
      // datas.filter(m => (datas[m] = kurac.map(j => j)));
      // console.log(datas);
      // jobs.map(j => j).map(m => m.name);
      // let name1 = Object.assign({}, datas);
      // let quantity = newArr.filter(k => datass.push(k.quantity));
      // let name2 = Object.assign({ datas }, name1);
      // console.log(name2);

      // console.log(datas, datass);

      // const datass = { ...this.state.data };

      // data[input.name] = input.value;
      // {
      //   renderedItems.map(item => (checked[item.name] = false));
      // }
      // // jobs.filter(j => allItems.filter(m => (j.checked = true)));

      let checked = jobs.filter(j => allItems.filter(m => m.name == j.name));
      // console.log(kurac);
      let checkedArr = jobs.map(j => j).map(m => m.name);
      let unchecked = allItems.filter(
        d => d.name != checkedArr.find(m => m == d.name)
      );

      allItems = checked.concat(unchecked);
      // localStorage.setItem("allItems", JSON.stringify(allItems));
      // localStorage.setItem("jobs", JSON.stringify(jobs));

      room = this.props.match.params.id;

      room0 = rooms.filter(m => m.id == this.props.match.params.id);

      renderedItems = allItems.filter(m => m.room === room0[0].name);
      // {
      //   renderedItems.map(item => (checked[item.name] = false));
      // }
    } else {
      allItems = JSON.parse(localStorage.getItem("allItems"));

      room = this.props.match.params.m;

      room0 = rooms.filter(m => m.id == this.props.match.params.id);

      renderedItems = allItems.filter(m => m.room === room0[0].name);
      // {
      //   renderedItems.map(item => (checked[item.name] = false));
      // }
    }
    let schema = this.state.schema;

    let items = renderedItems;

    {
      items.map(item => (schema[item.name] = Joi.number().label("quantity")));
    }

    const buildings = JSON.parse(localStorage.getItem("buildings")).filter(
      m => m.region === this.props.match.params.m
    );

    const build = [...this.state.build];
    const workorder = JSON.parse(localStorage.getItem("workorder"));
    const build1 = [];
    build1.push(workorder.buildingNumber);
    build.push(build1);
    const adress = [];
    const searchQuery = "";

    this.state = {
      room0,
      searchQuery,
      adress,
      build,
      rooms,
      schema,
      allItems,
      data,
      errors,
      value,
      value1,
      checked,
      renderedItems
    };
  }

  render() {
    // console.log(this.state.renderedItems);
    console.log(this.state.data);
    // console.log(this.state.data);
    // // let number = 1;
    // // if (this.state.value==undefined){
    // //   number=
    // // }
    // console.log();
    let allItems = JSON.parse(localStorage.getItem("allItems"));

    const jobs = JSON.parse(localStorage.getItem("jobs"));

    const searchQuery = this.state.searchQuery;
    const showing = true;
    // const adress = [];
    if (!JSON.parse(localStorage.getItem("workorder")).buildingNumber) {
    }
    const buildNumber = JSON.parse(localStorage.getItem("workorder"))
      .buildingNumber;

    const building = JSON.parse(localStorage.getItem("buildings")).find(
      m => m.number == buildNumber
    );

    const adress = building.adress + " (" + building.zip + ")";

    let datas = [];

    datas = this.state.renderedItems;

    if (searchQuery) {
      datas = this.state.renderedItems.filter(m =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    let title = "";
    if (datas[0] == undefined) {
      title = "Not found";
    } else {
      title = datas[0].room;
    }
    // let b = "";
    const workorder = JSON.parse(localStorage.getItem("workorder"));
    const value2 = workorder.squareFeet;
    const value = workorder.apartmentNumber;
    // let number = this.state.data[0];

    return (
      <React.Fragment>
        <div className="container main-page">
          <NavBar
            {...this.props}
            value={value}
            value2={value2}
            adress={adress}
            showing={showing}
            classs="disabled"
            build={this.state.build}
            onHandleChange={this.handleChange1}
            onHandleSquare={this.handleSquare}
            onHandleAptNum={this.handleAptNum}
            onBackButton={this.handleBackButton}
            onFinishedButton={this.handleFinishedButton}
          />
          <div className="buttons">
            <button
              onClick={() => this.handleBackButton()}
              className="btn btn-warning m-3"
            >
              ⏎ Back
            </button>
            <div className="float-left">
              <button
                onClick={() => this.handleHomeButton()}
                className="btn btn-info  m-3"
              >
                Home
              </button>
            </div>
            <button
              onClick={() => this.handleFinishedButton()}
              className="btn btn-primary m-3"
            >
              Complete All
            </button>

            <button
              onClick={() => this.handlelogOut()}
              className="btn btn-danger m-3 float-right"
            >
              &#x2716; Logout
            </button>
          </div>
          {/* <Link
              to={"/rooms/new-workorder"}
              onClick={this.handleNewWorkorders}
              className="btn btn-secondary mt-3 mb-3 float-right"
            >
              New Workorder
            </Link>
            <Link
              to={"/user/workorders"}
              onClick={this.handleWorkorders}
              className="btn btn-warning mt-3 mb-3"
            >
              My Workorders
            </Link> */}

          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <div className="rooms  text-center">
            <h1 className="lead m-3">{title}</h1>
            <table className="table text-left ">
              <thead>
                <tr>
                  <th className="item-name">Item</th>
                  <th>SubCategory</th>
                  <th>Price</th>
                  <th className="quantity">#</th>
                  {/* <th>Total Price</th> */}
                  {/* <th>Comment</th> */}

                  <th>Link</th>
                  <th>✔</th>
                </tr>
              </thead>
              {datas.map(item => (
                <tbody key={item._id}>
                  <tr>
                    <td className="item-name">{item.name}</td>
                    <td>{item.subCategory}</td>
                    <td>${item.price}</td>
                    <td>
                      <input
                        disabled={item.checked}
                        name={item.name}
                        label="quantity"
                        onChange={this.handleChange}
                        value={item.quantity}
                        className="quantity"
                        type="number"
                        min="1"
                        id={item._id}
                      />{" "}
                    </td>

                    <td>
                      <Link
                        target={this.state.target}
                        onClick={e => this.handleLinks(e, item.link)}
                      >
                        Link
                      </Link>
                    </td>
                    <td>
                      <Checkbox
                        number={this.state.value}
                        type="checkbox"
                        className="form-control"
                        name={item.name}
                        id={item._id}
                        checked={item.checked}
                        onChange={this.handleCheckboxChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="6">
                      <textarea
                        // cols="38"
                        // rows="2"
                        placeholder="Comment"
                        disabled={item.checked}
                        onChange={this.handleChangeArea}
                        name={item.name}
                        value={item.comment}
                        id={item._id}
                        className="form-control"
                      />
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FullRoom;
