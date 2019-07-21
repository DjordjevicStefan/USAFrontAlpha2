import React, { Component } from 'react';
import AdminNavbar from './common/adminNavbar';
import TableName from './common/tableName';

import { toast, ToastContainer } from 'react-toastify';

import {
  getRooms,
  getItemsFromRoom,
  saveNewItem,
  deleteItem,
  editItem, 
  deleteExtraItem,
  editTest
} from '../services/items';

import ItemsTable from './semicommon/itemsTable';
import { async } from 'q';

export default class Items extends Component {
  state = {
    searchQuery : "" ,
    searchOption : "name",
    options : [ "name" , "subCategory" ] ,
    rooms: null,
    load: false,
    selectedRoom: { items: [], room: '' },
    itemsTableShow: false,
    currentPage: 1,
    itemsPerPage: 10,
    newItem: {
      name: '',
      subCategory: '',
      price: '',
      link: ''
    }
  };

  //// fetching all rooms from database
  async componentDidMount() {
    const { data: rooms } = await getRooms();
    this.setState(() => ({
      rooms: rooms,
      load: true
    }));
  }

  //// handling select options and returning items from selected room
  handleChange = async e => {
    if (e.target.value === 'select') {
      this.setState({ itemsTableShow: false });
      return;
    }

    const { data: selectedRoom } = await getItemsFromRoom(e.target.value);
    if (selectedRoom.error) {
      toast.error(selectedRoom.error);
      return;
    }
   
    console.log("items",selectedRoom);
    

    this.setState(() => ({
      selectedRoom: selectedRoom,
      itemsTableShow: true
    }));
  };

  //// new item submit , after the submit i re-render all items and clean the input fields
  handleNewSubmit = async name => {
    const itemReady = { ...this.state.newItem };
    itemReady.room = name;

    const { data } = await saveNewItem(itemReady);
    if (data.error) {
      toast.error('Item add error, please fill all fields and try again');
    } else {
      toast.success('Item successfully added', { autoClose: 2700 });
    }

    const { data: selectedRoom } = await getItemsFromRoom(name);
    if (selectedRoom.error) {
      toast.error(selectedRoom.error);
      return;
    }
    this.setState(() => ({
      selectedRoom: selectedRoom,
      itemsTableShow: true,
      newItem: {
        name: '',
        subCategory: '',
        price: '',
        link: ''
      }
    }));
  };

  //// hadnle for new user input
  handleInputNew = e => {
    const newItem = { ...this.state.newItem };
    newItem[e.target.name] = e.target.value;

    this.setState(() => ({
      newItem: newItem
    }));
  };

  //// all inputs hadnle.
  handleInputChange = event => {
    const itemsProp = this.state.selectedRoom.items;

    const itemArrey = itemsProp.filter(x => x._id === event.target.id);
    itemArrey[0][event.target.name] = event.target.value;

    this.setState({
      selectedRoom: { items: itemsProp, room: this.state.selectedRoom.room }
    });
  };

  //// submiting edited item to database
  handleEdit = async item => {
    const { data } = await editItem(item);
    if (data.success) {
      toast.success('Item successfully edited', { autoClose: 2700 });
    } else {
      toast.error('Database error');
    }
  };

  //// delete item. if an error occurs the previous state is set back
  handleDelete = async itemId => {
    const selectedRoomCopy = { ...this.state.selectedRoom };

    let yesNo = window.confirm(`Are you sure you want to delete this item?`);

    if (yesNo === true) {
      const newItemsArrey = selectedRoomCopy.items.filter(
        item => item._id !== itemId
      );
      this.setState({
        selectedRoom: {
          items: newItemsArrey,
          room: this.state.selectedRoom.room
        }
      });
    } else {
      return;
    }

    const { data } = await deleteItem(itemId);
    if (data.error) {
      toast.error('Database error, please try again');
      this.setState({ selectedRoom: selectedRoomCopy });
    }
  };

  // deleteExtraItem = async () => {
  //    console.log("kliknuto");
     

  //   const { data } = await deleteExtraItem();
  //   console.log("test test",data);
    
  // }

  editTest = async () => {
    console.log("kliknuto");
     

    const { data } = await editTest();
    console.log("test test",data);

  }

  //// paginate
  handlePaginate = number => {
    this.setState({
      currentPage: number
    });
  };

  //// handle search

  handleSearch = (query) => {
    this.setState({
      searchQuery : query ,
      currentPage : 1 
    });
  }

  handleOptionsSearch = (e) => {
    this.setState({
      searchOption : e.target.value
    })
  } 


  render() {
    if (this.state.load === false) {
      return (
        <>
          <AdminNavbar pageName='Room Items' />
          <TableName tablename='Loading...' />
          <ToastContainer />
        </>
      );
    }

    const { rooms } = this.state;

    return (
      <>
        <ToastContainer />
        <AdminNavbar pageName='Master List By Rooms' />
        <TableName tablename='Add, Edit And Delete Items From Rooms' />
        <div className='form-container padding-bottom-1rem'>
          <form>
            <div className='form-group row'>
              <span className='col-sm-2 lead'>Select Room :</span>
              <div className='col-sm-10'>
                <select
                  onChange={this.handleChange}
                  className='form-control form-control-sm'
                >
                  <option>select</option>
                  {rooms.map(room => (
                    <option key={room._id}>{room.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </form>
          <ItemsTable
            options={this.state.options}
            searchQuery= {this.state.searchQuery}
            searchOption={this.state.searchOption}
            onSearch={this.handleSearch}
            onOptionChange ={this.handleOptionsSearch}
            itemsTableShow={this.state.itemsTableShow}
            selectedRoom={this.state.selectedRoom}
            submitNew={this.handleNewSubmit}
            onChangeNew={this.handleInputNew}
            onChange={this.handleInputChange}
            deleteItem={this.handleDelete}
            editItem={this.handleEdit}
            renderNewItem={this.state.renderNewItem}
            newItem={this.state.newItem}
            paginate={this.handlePaginate}
            somethingPerPage={this.state.itemsPerPage}
            currentPage={this.state.currentPage}
            test={this.editTest}
          />
        </div>
      </>
    );
  }
}
