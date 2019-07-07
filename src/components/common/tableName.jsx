import React, { Component } from "react";
import Clock from "react-live-clock";

const TableName = props => {
  const tz = props.timeZone;

  return (
    <div className="container">
      <div className="table-name clearfix">
        <p
          className={
            tz ? "p-display-inline float-left reset-bottom-margin" : null
          }
        >
          {props.tablename === "Loading..." ? (
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          ) : (
            props.tablename
          )}
        </p>
        {tz ? (
          <div className="float-right">
            <span>
              <Clock
                format="dddd Do, MMMM, HH:mm:ss"
                ticking={true}
                interval={1000}
                timezone={tz}
              />
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TableName;
