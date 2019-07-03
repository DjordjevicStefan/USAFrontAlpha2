import React from "react";

export default function Pagination({ somethingPerPage, total , paginate }) {
  const pageNumber = [];
  for (let index = 1; index <= Math.ceil(total / somethingPerPage); index++) {
    
    pageNumber.push(index);
    
  }
  
  // console.log(total);
  // console.log(pageNumber);
  // console.log(somethingPerPage);
  
  return (
    
        <nav className="float-right">
          <ul className="pagination pagination-custom">
            {pageNumber.map(number => (
              <li key={number} className="page-item">
                <a onClick={() => paginate(number)}  className="page-link clicableA">
                  {number}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      
  );
}
