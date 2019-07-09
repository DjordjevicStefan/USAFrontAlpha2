import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavbar = props => {
  const kurac = function handleLogOut() {
    localStorage.removeItem('admin');
    this.props.history.replace(`./login`);
  };
  return (
    <div>
      <nav className='my-nav navbar navbar-expand-lg '>
        <Link to='/admin' className='logo-color'>
          Homepage
        </Link>

        <ul className='navbar-nav ml-auto'>
          <li className='ml-2 nav-item'>
            <Link className='nav-link my-nav-link' to='/admin/users'>
              Users{' '}
            </Link>
          </li>
          <li className='ml-2 nav-item'>
            <Link className='nav-link my-nav-link' to='/admin/vendors'>
              Vendors
            </Link>
          </li>
          <li className='ml-2 nav-item'>
            <Link className='nav-link my-nav-link' to='/admin/items'>
              Items
            </Link>
          </li>
          <li className='ml-2 nav-item'>
            <Link className='nav-link my-nav-link' to='/admin/jobs'>
              Jobs
            </Link>
          </li>
          <li className='ml-2 nav-item'>
            <Link className='nav-link my-nav-link' to='/admin'>
              Work Orders
            </Link>
          </li>
          <li className='ml-2 nav-item'>
            <Link onClick={kurac} className='nav-link my-nav-link' to='/'>
              Log Out
            </Link>
          </li>
        </ul>
      </nav>

      <div className='jumbotron jumbotron-fluid'>
        <div className='container'>
          <h1 className='display-4'>{props.pageName}</h1>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
