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
// import getAllUsers from "../services/users";
import qs from "qs";
class FullRoom extends Form {
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

  componentDidMount() {
    // const allItems={...this.state.al}
    // let allItems = JSON.parse(localStorage.getItem("allItems"));
    // const jobs = JSON.parse(localStorage.getItem("jobs"));
    // // jobs.filter(j => allItems.filter(m => (j.checked = true)));
    // let kurac = jobs.filter(j => allItems.filter(m => m.name == j.name));
    // // console.log(kurac);
    // let jebise = jobs.map(j => j).map(m => m.name);
    // let picka = allItems.filter(d => d.name != jebise.find(m => m == d.name));
    // allItems = kurac.concat(picka);
    // localStorage.setItem("allItems", JSON.stringify(allItems));
    // // this.setState({ allItems });
  }
  getCurrentRoom = () => {
    return this.props.match.params.id;
  };
  handleBackButton = () => {
    this.props.history.push("/rooms/" + this.props.match.params.m);
  };
  handlelogOut() {
    const answer = window.confirm("Are you sure you want to log out?");
    if (answer) {
      localStorage.removeItem("jobs");
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
    // console.log(e.target.checked);
    const checked = { ...this.state.checked };

    const rooms = this.state.allItems.find(
      room => room._id === e.currentTarget.id
    );
    console.log(rooms);
    console.log(e.currentTarget.id);
    if (e.target.checked === false) {
      checked[e.currentTarget.name] = e.target.checked;
      rooms.checked = false;
      localStorage.setItem("jobs", JSON.stringify(this.state.allItems));
      localStorage.setItem("allItems", JSON.stringify(this.state.allItems));

      this.setState({ checked });
    } else {
      checked[e.currentTarget.name] = e.target.checked;
      rooms.checked = true;
      localStorage.setItem("jobs", JSON.stringify(this.state.allItems));
      localStorage.setItem("allItems", JSON.stringify(this.state.allItems));

      this.setState({ checked });
    }
  };
  // handleWorkorders = async e => {
  //   e.preventDefault();
  //   console.log("work");
  //   console.log("sta");
  //   localStorage.removeItem("jobs");
  //   // window.location.reload();
  //   const params = {
  //     email: "roxana@benleedsproperties.com",
  //     password: 123
  //   };
  //   console.log("radiiiiiiiiiiiiiiiiiiiii");
  //   // this.props.history.push(`./user/workorders`);

  //   const { data: response } = await axios.post(
  //     process.env.REACT_APP_API_URL + "/login",
  //     qs.stringify(params)
  //   );
  //   console.log(response);

  //   localStorage.setItem("workorders", JSON.stringify(response.workorders));
  //   window.location = "/user/workorders";
  // };
  // handleNewWorkorders() {
  //   localStorage.removeItem("jobs");
  //   window.location = "/rooms/new-workorder";
  // }

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

    let prompt = window.confirm(
      "Are you sure you want to save this workorder?"
    );
    if (prompt) {
      const allItems = JSON.parse(localStorage.getItem("allItems"));
      // console.log(allItems);
      const copyItems = [...allItems].filter(item => {
        return item.checked;
      });
      // console.log(copyItems);
      const finalItems = copyItems.map(item => {
        let id = "";
        if (item._id) {
          id = item._id;
        } else {
          id = item.id;
        }
        return {
          checked: true,
          name: item.name,
          price: item.price,
          room: item.room,
          subCategory: item.subCategory,
          quantity: item.quantity,
          comment: item.comment,
          _id: id
        };
      });
      console.log(finalItems);
      const work = JSON.parse(localStorage.getItem("workorder"));
      work.jobs = finalItems;
      console.log(work.workorder);
      if (!work.workorder._id) {
        work.workorder.id = "";
      } else {
        work.workorder.id = work.workorder;
      }
      console.log(work.workorder.id);
      // console.log(work.workorder.id);
      // console.log(work);
      work.workorder.status = "saved";
      work.workorder.totalPrice = 0;
      // work.workorder.adress =;
      work.workorder.comment = "Saved";
      work.workorder.sendTime = new Date();
      work.workorder.completedTime = new Date();
      localStorage.setItem("workorder", JSON.stringify(work));
      console.log(work);
      const finalData = JSON.parse(localStorage.getItem("workorder"));
      console.log(finalData);
      const data = await axios.post(
        process.env.REACT_APP_API_URL + "/user/newWorkorder",
        JSON.stringify(finalData)
      );
      console.log(data);
      // localStorage.removeItem("jobs");
      //drugi deo pozivanje zadnjeg

      // const user = JSON.parse(localStorage.getItem("currentUser"));
      // const data1 = await axios.get(
      //   process.env.REACT_APP_API_URL + `/user/latestWorkorder/${user._id}`
      // );

      // // let jobs = JSON.parse(localStorage.getItem("jobs"));
      // let workorder = data1.data.workorder;
      // console.log(data1);
      // // let jobs = data1.data.jobs;
      // // jobs.jobs = data1.data.jobs;
      // // workorder.jobs = jobs;
      // // console.log(data.data.jobs);
      // console.log(workorder);
      // workorder.jobs = finalItems;
      // let work1 = JSON.parse(localStorage.getItem("workorders"));
      // work1.push(workorder);
      // localStorage.setItem("workorders", JSON.stringify(work1));
      localStorage.removeItem("jobs");
      // console.log(data1);
      this.props.history.push("/rooms/" + this.props.match.params.m);
      // window.location.reload();
    } else {
      return;
    }
  };

  constructor(props) {
    super(props);
    const data = {};
    const errors = {};
    const value = {};
    const checked = {};
    const rooms = getRooms();
    let renderedItems = [];
    let room0 = "";
    let room = "";
    // const allItems = [];

    // if (this.props.location.state) {
    //   localStorage.setItem(
    //     "jobs",
    //     JSON.stringify(this.props.location.state.jobs)
    //   );
    // }
    // let value = "";
    // const showing = "";
    // if (this.props.location.state) {
    //   const buildNumber = this.props.location.state.buildingNumber;
    //   let building = buildings.find(m => m.number == buildNumber);
    //   // }
    //   const adress = building.adress + " (" + building.zip + ")";
    //   console.log(buildings);
    //   const work = JSON.parse(localStorage.getItem("workorder"));
    //   work.workorder.buildingNumber = buildNumber;
    //   work.workorder.apartmentNumber = this.props.location.state.apartmentNumber;
    //   work.workorder.adress = adress;
    //   localStorage.setItem("workorder", JSON.stringify(work));
    //   showing = true;
    //   this.state = { showing: showing, adress };

    //   value = this.props.location.state.apartmentNumber;
    // }

    let allItems = [];
    // console.log(localStorage.getItem("jobs"));
    if (localStorage.getItem("jobs")) {
      // if (localStorage.getItem("jobs") != undefined)
      let jobs = JSON.parse(localStorage.getItem("jobs"));
      // const jobs = JSON.parse(localStorage.getItem("jobs"));
      allItems = JSON.parse(localStorage.getItem("allItems"));
      // jobs.filter(j => allItems.filter(m => (j.checked = true)));

      let kurac = jobs.filter(j => allItems.filter(m => m.name == j.name));
      // console.log(kurac);
      let jebise = jobs.map(j => j).map(m => m.name);
      let picka = allItems.filter(d => d.name != jebise.find(m => m == d.name));

      allItems = kurac.concat(picka);
      localStorage.setItem("allItems", JSON.stringify(allItems));
      localStorage.setItem("jobs", JSON.stringify(allItems));

      room = this.props.match.params.id;
      console.log(room);
      room0 = rooms.filter(m => m.id == this.props.match.params.id);

      renderedItems = allItems.filter(m => m.room === room0[0].name);
      {
        renderedItems.map(item => (checked[item.name] = false));
      }
      // } else if (localStorage.getItem("jobs") == null) {
      //   allItems = JSON.parse(localStorage.getItem("allItems"));
      //   let jobs = JSON.parse(localStorage.getItem("workorder")).jobs;
      //   let kurac = jobs.filter(j => allItems.filter(m => m.name == j.name));
      //   // console.log(kurac);
      //   let jebise = jobs.map(j => j).map(m => m.name);
      //   let picka = allItems.filter(d => d.name != jebise.find(m => m == d.name));

      //   allItems = kurac.concat(picka);
      //   localStorage.setItem("allItems", JSON.stringify(allItems));
      //   localStorage.setItem("jobs", JSON.stringify(allItems));
    } else {
      allItems = JSON.parse(localStorage.getItem("allItems"));
      room = this.props.match.params.m;

      room0 = rooms.filter(m => m.id == this.props.match.params.id);

      renderedItems = allItems.filter(m => m.room === room0[0].name);
      {
        renderedItems.map(item => (checked[item.name] = false));
      }
      // console.log(renderedItems);
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

    // const d = buildings.map(
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
    // const allItems = [];
    // this.state = { data };

    const workorder = JSON.parse(localStorage.getItem("workorder"));
    const build1 = [];
    build1.push(workorder.workorder.buildingNumber);
    build.push(build1);
    const adress = [];
    const searchQuery = "";

    // console.log(build);
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
      checked,
      renderedItems
    };
  }

  render() {
    // console.log(this.state.renderedItems);

    // console.log(this.state.allItems);
    let allItems = JSON.parse(localStorage.getItem("allItems"));
    // jobs.filter(j => allItems.filter(m => (j.checked = true)));
    const jobs = JSON.parse(localStorage.getItem("jobs"));
    // let kurac = jobs.filter(j => allItems.filter(m => m.name == j.name));
    // // console.log(kurac);
    // let jebise = jobs.map(j => j).map(m => m.name);
    // let picka = allItems.filter(d => d.name != jebise.find(m => m == d.name));

    // allItems = kurac.concat(picka);
    // console.log();
    const searchQuery = this.state.searchQuery;
    const showing = true;
    // const adress = [];
    if (
      !JSON.parse(localStorage.getItem("workorder")).workorder.buildingNumber
    ) {
    }
    const buildNumber = JSON.parse(localStorage.getItem("workorder")).workorder
      .buildingNumber;

    const building = JSON.parse(localStorage.getItem("buildings")).find(
      m => m.number == buildNumber
    );

    // element.value = element.number + " (" + element.zip + ")";

    // const { data, errors, checked, renderedItems } = this.state;

    const adress = building.adress + " (" + building.zip + ")";

    // console.log(this.state.room0[0].name);
    // console.log(this.state.room0[0].name);
    let datas = [];
    // // console.log(datas);
    // if (JSON.parse(localStorage.getItem("jobs"))) {
    //   let jobs = JSON.parse(localStorage.getItem("jobs"));
    //   console.log(jobs);
    //   let jj = [...jobs].filter(j => j.room == this.state.room0[0].name);
    //   console.log(jj);
    // jj = [...jj].filter(j => (j.checked = false));

    datas = this.state.renderedItems;
    //   let kurac = jj.filter(j => datas.filter(m => m.name == j.name));
    //   // console.log(kurac);

    //   let jebise = jobs.map(j => j).map(m => m.name);
    //   let picka = datas.filter(d => d.name != jebise.find(m => m == d.name));

    //   datas = kurac.concat(picka);
    //   // console.log(datas);
    // } else {
    //   datas = this.state.renderedItems;
    // }
    // console.log(jebise.map(m => m));
    // const copyItems = [...datas].filter(item => {
    //   jobs.find(j => j.name != item.name);
    //   return datas;
    // });
    // console.log(copyItems);
    // datas.find(m => (m.comment = jobs.filter(j => j.comment)));
    // console.log(datas);
    // console.log(picka);
    if (searchQuery) {
      datas = this.state.renderedItems.filter(m =>
        m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }

    let title = "";
    if (datas[0] == undefined) {
      title = "Not found";
    } else {
      title = datas[0].room;
    }
    // console.log(datas);

    const workorder = JSON.parse(localStorage.getItem("workorder"));
    const value = workorder.workorder.apartmentNumber;
    // const { adress } = this.state;
    // console.log(adress);

    return (
      <React.Fragment>
        <div className="container mainPage">
          <NavBar
            {...this.props}
            value={value}
            adress={adress}
            showing={showing}
            classs="disabled"
            build={this.state.build}
            // onHandleInput={this.handleInput}
            // build={build}
            onHandleChange={this.handleChange1}
            // onChangeBuildings={() => this.handleChangeBuilding()}
            onHandleAptNum={this.handleAptNum}
            onBackButton={this.handleBackButton}
            onFinishedButton={this.handleFinishedButton}
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
            <button
              onClick={() => this.handlelogOut()}
              className="btn btn-danger m-3"
            >
              &#x2716; Logout
            </button>
          </div>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <div className="rooms border text-center">
            <h1 className="lead m-3">{title}</h1>
            <table className="table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>SubCategory</th>

                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Comment</th>

                  <th>Link</th>
                  <th>✔</th>
                </tr>
              </thead>
              <tbody>
                {datas.map(item => (
                  <tr key={item.name}>
                    <td>{item.name}</td>
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
                        min="0"
                        id={item._id}
                      />{" "}
                    </td>
                    {/* {NaN ? $0 : } */}

                    <td>
                      $
                      {Math.ceil(item.quantity * item.price)
                        ? Math.ceil(item.quantity * item.price)
                        : 0}
                    </td>
                    <td>
                      <textarea
                        cols="38"
                        rows="2"
                        disabled={item.checked}
                        onChange={this.handleChangeArea}
                        name={item.name}
                        value={item.comment}
                        id={item._id}
                      />
                    </td>
                    <td>
                      <Link to="#">Link</Link>
                    </td>
                    <td>
                      <Checkbox
                        type="checkbox"
                        className="form-control"
                        name={item.name}
                        id={item._id}
                        checked={item.checked}
                        onChange={this.handleCheckboxChange}
                      />
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

export default FullRoom;
