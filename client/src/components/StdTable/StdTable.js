import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { Checkbox } from "@material-ui/core";
import Header from "../Header/index";
import { CsvBuilder } from "filefy";
import SaveAltIcon from "@material-ui/icons/SaveAlt";

const StdTable = () => {
  const url = "http://localhost:8080/student/getAll";
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = () => {
    fetch(url)
      .then((resp) => resp.json())
      .then((resp) => setData(resp));
  };
  const handleChange = () => {
    setFilter(!filter);
  };

  const exportAllSelectedRows = () => {
    new CsvBuilder("tableData.csv")
      .setColumns(columns.map((col) => col.title))
      .addRows(
        selectedRows.map((rowData) => columns.map((col) => rowData[col.field]))
      )
      .exportFile();
  };

  const columns = [
    {
      title: "Name",
      field: "stdName",
      validate: (rowData) =>
        rowData.stdName === undefined || rowData.stdName === ""
          ? "Required"
          : true,
    },
    {
      title: "Age",
      field: "stdAge",
      validate: (rowData) =>
        rowData.stdAge === undefined || rowData.stdAge === ""
          ? "Required"
          : true,
    },
    {
      title: "Class",
      field: "stdClass",
      validate: (rowData) =>
        rowData.stdClass === undefined || rowData.stdClass === ""
          ? "Required"
          : true,
    },
    {
      title: "School",
      field: "stdSchool",
      validate: (rowData) =>
        rowData.stdSchool === undefined || rowData.stdSchool === ""
          ? "Required"
          : true,
    },
    {
      title: "Division",
      field: "stdDivision",
      validate: (rowData) =>
        rowData.stdDivision === undefined || rowData.stdDivision === ""
          ? "Required"
          : true,
    },
    {
      title: "Status",
      field: "stdStatus",
      validate: (rowData) =>
        rowData.stdStatus === undefined || rowData.stdStatus === ""
          ? "Required"
          : true,
    },
  ];
  return (
    <div className="App">
      <Header />
      <h2 align="center">Students Information</h2>
      <MaterialTable
        title="Student Details"
        data={data}
        columns={columns}
        onSelectionChange={(rows) => setSelectedRows(rows)}
        options={{
          filtering: filter,
          actionsColumnIndex: -1,
          addRowPosition: "first",
          selection: true,
          exportButton: true,
          exportAllData: true,
        }}
        actions={[
          {
            icon: () => (
              <Checkbox
                checked={filter}
                onChange={handleChange}
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            ),
            tooltip: "Hide/Show Filter option",
            isFreeAction: true,
          },
          {
            icon: () => <SaveAltIcon />,
            tooltip: "Export all selected rows",
            onClick: () => exportAllSelectedRows(),
          },
        ]}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              //Backend call
              fetch("http://localhost:8080/student/add", {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify(newData),
              })
                .then((resp) => resp.json())
                .then((resp) => {
                  getStudents();
                  resolve();
                });
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              //Backend call
              fetch("http://localhost:8080/student/" + oldData._id, {
                method: "PUT",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify(newData),
              })
                .then((resp) => resp.json())
                .then((resp) => {
                  getStudents();
                  resolve();
                });
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              //Backend call
              fetch("http://localhost:8080/student/" + oldData._id, {
                method: "DELETE",
                headers: {
                  "Content-type": "application/json",
                },
              })
                .then((resp) => resp.json())
                .then((resp) => {
                  getStudents();
                  resolve();
                });
            }),
        }}
      />
    </div>
  );
};

export default StdTable;
