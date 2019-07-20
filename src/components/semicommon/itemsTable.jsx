import React, { Component } from "react";
import Pagination from "../common/pagination" ;
import _ from "lodash" ;
import SearchBox from "../common/search";

class ItemsTable extends Component {

  render() {
    const {
      selectedRoom,
      itemsTableShow,
      submitNew,
      onChangeNew,
      onChange,
      editItem,
      deleteItem,
      newItem,
      paginate,
      somethingPerPage,
      currentPage,
      onOptionChange,
      onSearch,
      searchOption,
      searchQuery,
      options,
      test
    } = this.props;
    const room = selectedRoom.room.name;

    // console.log("room test",selectedRoom.items);
    let sorted = _.orderBy(selectedRoom.items, [item => item.name.toLowerCase()],['asc']) ;
    // console.log("sorted",sorted);

    let searchedArrey = null ; 
    let itemsPaginated =null ;
  
    //// first check if the search is active and then paginate searched Arrey !!!! 
    if (searchQuery !== "") {
      searchedArrey = sorted.filter(items => items[searchOption].toLowerCase().includes(searchQuery.toLowerCase()))
      
    const indexOfLast = currentPage * somethingPerPage ;
    const indexOfFirst = indexOfLast - somethingPerPage ;
    itemsPaginated = searchedArrey.slice(indexOfFirst, indexOfLast)
    
    
    //// if not , just paginate the initial arrey !!!!
    } else {
      const indexOfLast = currentPage * somethingPerPage ;
      const indexOfFirst = indexOfLast - somethingPerPage ;
      itemsPaginated = sorted.slice(indexOfFirst, indexOfLast)
    }




    return (
      <>
        <table
          className={`table table-bordered table-sm table-hover ${
            itemsTableShow === false ? "item-table-show" : null
          }`}
        >
          <thead>
            <tr>
              <th scope="col">
                
           <span>Item name,subcategory and price</span>     
              
               <div>
               <SearchBox 
                 resetPadding={true}
                 options ={options}
                 onOptionChange ={onOptionChange}
                 value = {searchQuery}
                 onChange ={onSearch}
                 />     
                </div>
                
                 </th>
              <th className="dsp-block border-bottom-reset" scope="col"><span>Action</span></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="padding-b">
                <form >
                  <div className="form-group row">
                    <label className="col col-form-label form-control-sm">
                      Name:
                    </label>
                    <div className="col-sm-2">
                      <input
                        onChange={onChangeNew}
                        name="name"
                        type="text"
                        className="form-control form-control-sm"
                        value={newItem.name}
                      />
                    </div>
                    <label className="col col-form-label form-control-sm">
                      Subcategory:
                    </label>
                    <div className="col-sm-2">
                      <input
                        onChange={onChangeNew}
                        name="subCategory"
                        type="text"
                        className="form-control form-control-sm"
                        value={newItem.subCategory}
                      />
                    </div>
                    <label className="col col-form-label form-control-sm">
                      Price:
                    </label>
                    <div className="col-sm-2">
                      <input
                        onChange={onChangeNew}
                        name="price"
                        step=".01"
                        type="number"
                        className="form-control form-control-sm"
                        value={newItem.price}
                      />
                    </div>
                    <label className="col col-form-label form-control-sm">
                      Link:
                    </label>
                    <div className="col-sm-2">
                      <input
                        onChange={onChangeNew}
                        name="link"
                        type="text"
                        className="form-control form-control-sm"
                        value={newItem.link}
                      />
                    </div>
                  </div>
                </form>
              </td>
              <td className="padding-b">
                <button
                  onClick={() => submitNew(room)}
                  className="btn-table-end btn-line-hight"

                >
                  Add
                </button>
              </td>
            </tr>
            {itemsPaginated.length === 0 ? (
              <tr>
                <td>There is no items in this room</td>
              </tr>
            ) : (
              itemsPaginated.map(item => (
                <tr key={item._id}>
                  <td className="padding-b">
                    <form className="form-items">
                      <div className="form-group row">
                        <label className="col col-form-label form-control-sm">
                          Name:
                        </label>
                        <div className="col-sm-2">
                          <textarea rows="3" cols="50"
                            value={item.name}
                            onChange={onChange}
                            name="name"
                            type="text"
                            className="form-control form-control-sm"
                            id={item._id}
                            />
                        </div>
                        <label className="col col-form-label form-control-sm">
                          Subcategory:
                        </label>
                        <div className="col-sm-2">
                          <input
                            value={item.subCategory}
                            onChange={onChange}
                            name="subCategory"
                            type="text"
                            className="form-control form-control-sm"
                            id={item._id}
                          />
                        </div>
                        <label className="col col-form-label form-control-sm">
                          Price:
                        </label>
                        <div className="col-sm-2">

                          <input
                             
                            value={item.price}
                            onChange={onChange}
                            id={item._id}
                            name="price"
                            // step=".01"
                            // type="number"
                            type ="text"
                            className="form-control form-control-sm"
                          />
                        </div>
                        <label className="col col-form-label form-control-sm">
                      Link:
                    </label>
                    <div className="col-sm-2">
                      <input
                        onChange={onChange}
                        name="link"
                        type="text"
                        className="form-control form-control-sm"
                        value={item.link}
                        id={item._id}
                      />
                    </div>
                      </div>
                    </form>
                  </td>
                  <td className="adj-padding-items-btn">
                    <button
                      onClick={() => editItem(item)}
                      className="btn btn-sm mdc-button mb-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteItem(item._id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
             <div>
              <button onClick={test} className="btn btn-sm btn-danger"> 
                 TEST
              </button>            
            </div> 
        </table>
        <div className="row">
          <div className="col float-right">
          <Pagination 
              currentPage={currentPage}
              total={(searchQuery !== "") ? searchedArrey.length : sorted.length} 
              somethingPerPage={somethingPerPage}
              paginate ={paginate}
           /> 
          </div>
        </div>
      </>
    );
  }
}

export default ItemsTable;
