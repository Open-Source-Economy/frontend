import React, { useEffect } from "react";
import { SelectFilter } from "../../../../../components";
import * as model from "../../../../../model/FinancialIssue";

interface IssueFilterProps {
  financialIssues: model.FinancialIssue[];
  setFilteredFinancialIssues: (financialIssues: model.FinancialIssue[]) => void;
}

export function IssueFilter(props: IssueFilterProps) {
  const all = "All";
  function toSelectOptions(stringArray: string[]): string[] {
    const temp = Array.from(
      new Set(
        stringArray.filter(name => name), // Remove any undefined, null, or empty string values
      ),
    ).sort(); // Sort the resulting array of names alphabetically
    temp.unshift(all);
    return temp;
  }

  const owners = toSelectOptions(props.financialIssues.map(financialIssue => financialIssue.owner?.name));
  const repositories = toSelectOptions(props.financialIssues.map(financialIssue => financialIssue.repository?.name));

  const [selectedOwner, setSelectedOwner] = React.useState(all);
  const [selectedRepository, setSelectedRepository] = React.useState(all);
  const [selectedStatus, setSelectedStatus] = React.useState(all);
  const [searchTerm, setSearchTerm] = React.useState("");

  useEffect(() => {
    handleChangeOnFilter();
  }, [selectedOwner, selectedRepository, selectedStatus, searchTerm]);

  const handleChangeOnFilter = () => {
    const filtered = props.financialIssues.filter(financialIssue => {
      return (
        (financialIssue.owner?.name === selectedOwner || selectedOwner === all) &&
        (financialIssue.repository?.name === selectedRepository || selectedRepository === all) &&
        // (financialIssue.status === selectedStatus || selectedStatus === all) &&
        (searchTerm === "" ||
          financialIssue.owner?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          financialIssue.repository?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          financialIssue.issue?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          financialIssue.issue?.id?.number.toString().includes(searchTerm))
      );
    });

    props.setFilteredFinancialIssues(filtered);
  };

  return (
    <form action="#" className="filter-form">
      <div className="row justify-content-center align-items-center gy-4">
        <div className="col-lg-3">
          <SelectFilter
            ariaLabel="Onwer"
            labelValues={owners.map(ownerName => ({
              value: ownerName,
              label: ownerName,
            }))}
            onFilterChange={value => {
              setSelectedOwner(value);
            }}
          />
        </div>

        <div className="col-lg-3">
          <SelectFilter
            ariaLabel="Repository"
            labelValues={repositories.map(ownerName => ({
              value: ownerName,
              label: ownerName,
            }))}
            onFilterChange={value => {
              setSelectedRepository(value);
              handleChangeOnFilter();
            }}
          />
        </div>

        <div className="col-lg-3">
          <SelectFilter
            ariaLabel="Status"
            labelValues={[
              { value: "all", label: "All Categories" },
              { value: "accountability", label: "Accountability" },
              { value: "data", label: "Data" },
            ]}
            onFilterChange={() => {}}
          />
        </div>

        <div className="col-lg-3">
          <div className="input-group search-c">
            <input
              className="form-control border-end-0 border-0 focus-ring helvetica  color-70"
              type="search"
              placeholder="Search"
              id="example-search-input"
              onChange={e => {
                setSearchTerm(e.target.value);
              }}
            />
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
