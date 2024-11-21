import React, { useEffect } from "react";
import { SelectFilter } from "src/components";
import * as model from "src/model/FinancialIssue";
import search from "src/assets/search.png";
import { ManagedIssueState } from "src/model";

enum Status {
  OPEN = "Open",
  CLOSED = "Closed",
}

interface IssueFilterProps {
  financialIssues: model.FinancialIssue[];
  setFilteredFinancialIssues: (financialIssues: model.FinancialIssue[]) => void;
}

export function IssueFilter(props: IssueFilterProps) {
  const allOwner = "Organization";
  const allRepository = "Repository";
  const allStatus = "Status";

  function toSelectOptions(all: string, stringArray: string[]): string[] {
    const temp = Array.from(
      new Set(
        stringArray.filter(name => name), // Remove any undefined, null, or empty string values
      ),
    ).sort(); // Sort the resulting array of names alphabetically
    temp.unshift(all);
    return temp;
  }

  const owners = toSelectOptions(
    allOwner,
    (props.financialIssues || []).map(financialIssue => financialIssue.owner.id.login),
  );
  const repositories = toSelectOptions(
    allRepository,
    (props.financialIssues || []).map(financialIssue => financialIssue.repository.id.name),
  );
  const status = toSelectOptions(allStatus, Object.values(Status) as Status[]);

  const [selectedOwner, setSelectedOwner] = React.useState(allOwner);
  const [selectedRepository, setSelectedRepository] = React.useState(allRepository);
  const [selectedStatus, setSelectedStatus] = React.useState(allStatus);
  const [searchTerm, setSearchTerm] = React.useState("");

  useEffect(() => {
    handleChangeOnFilter();
  }, [selectedOwner, selectedRepository, selectedStatus, searchTerm]);

  const handleChangeOnFilter = () => {
    function statusFiltered(financialIssue: model.FinancialIssue): boolean {
      return (
        selectedStatus === allStatus ||
        (selectedStatus === Status.OPEN && (financialIssue.managedIssue === undefined || financialIssue.managedIssue?.state === ManagedIssueState.OPEN)) ||
        (selectedStatus === Status.CLOSED && financialIssue.managedIssue?.state !== ManagedIssueState.OPEN)
      );
    }

    const filtered = props.financialIssues.filter(financialIssue => {
      return (
        (financialIssue.owner.id.login === selectedOwner || selectedOwner === allOwner) &&
        (financialIssue.repository.id.name === selectedRepository || selectedRepository === allRepository) &&
        statusFiltered(financialIssue) &&
        (searchTerm === "" ||
          financialIssue.owner.id.login.toLowerCase().includes(searchTerm.toLowerCase()) ||
          financialIssue.repository.id.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          financialIssue.issue?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          financialIssue.issue?.id?.number.toString().includes(searchTerm))
      );
    });

    props.setFilteredFinancialIssues(filtered);
  };

  return (
    <>
      <div className="grid sm:grid-cols-1 w-[90%] mx-auto lg:grid-cols-4 grid-cols-1 items-center place-items-center justify-center mt-4 gap-2 bg-[#14233A] rounded-3xl md:py-10 md:px-10 padding">
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

        <SelectFilter
          ariaLabel="Status"
          labelValues={status.map(status => ({ value: status, label: status }))}
          onFilterChange={value => {
            setSelectedStatus(value);
            handleChangeOnFilter();
          }}
        />

        <div className="relative border-1 border-[#8693A4] w-100 rounded-[9px] outline-none bg-transparent p-3 lg:w-[196px]">
          <input
            className="outline-none text-lg bg-transparent lg:w-[140px] w-100"
            placeholder="Search"
            onChange={e => {
              setSearchTerm(e.target.value);
            }}
          />
          <div>
            <img src={search} className="w-[18px] h-[18px] absolute top-5 right-3" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
