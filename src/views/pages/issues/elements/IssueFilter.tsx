import React from "react";

interface IssueFilterProps {}

export function IssueFilter({}: IssueFilterProps) {
  return (
    <form action="#" className="filter-form">
      <div className="row justify-content-center align-items-center gy-4">
        <div className="col-lg-3">
          <select className="form-select c-select" id="ddlProducts" aria-label="Default select example">
            <option selected>All Categories</option>
            <option value="1">Accountability</option>
            <option value="2">Data</option>
          </select>
        </div>
        <div className="col-lg-3">
          <select className="form-select c-select" aria-label="Default select example">
            <option selected>Sort By</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div className="col-lg-3">
          <select className="form-select c-select" aria-label="Default select example">
            <option selected>Open</option>
            <option value="1" selected>
              One
            </option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div className="col-lg-3">
          <div className="input-group search-c">
            <input className="form-control border-end-0 border-0 focus-ring helvetica  color-70" type="search" placeholder="Search" id="example-search-input" />
            <span className="input-group-append d-flex justify-content-center ">
              <button className="btn btn-outline-secondary border-0 ms-n5" type="button">
                <i className="fa fa-search"></i>
              </button>
            </span>
          </div>
        </div>
      </div>
    </form>
  );
}
