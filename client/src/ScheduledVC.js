import React
,{useState} 
from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import  Axios  from "axios";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import FilterData from './FilterData'
const columns =
[
      {
        dataField: 'S.no',
        text: 'S. No.',
        formatter: (cell, row, rowIndex, formatExtraData) => {
          return rowIndex + 1;
        },
        sort: true,
    },
    {
        dataField: "MeetingDate",
        text: "Date",
        sort: true
    },
    {
        dataField: "Timings",
        text: "Meeting Time",
        sort: true
      },
    {
      dataField: "MeetingName",
      text: "Meeting Name",
      sort: true,
    },
    {
      dataField: "Description",
      text: "Meeting Description",
      sort: true,
    },
    {
      dataField: "Venue",
      text: "Venue",
      sort:true
    },
    {
        dataField: "username",
        text: "Username",
        sort: true
    },
    {
      dataField:"status",
      text:"Status",
      sort: true
    }
  ]

const ScheduledVC = () =>{
  const [res, setResult] = useState([]);
  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Showing { from } to { to } of { size } Results
    </span>
  );

  const options = {
    paginationSize: 4,
    pageStartIndex: 1,
    firstPageText: 'First',
    prePageText: 'Back',
    nextPageText: 'Next',
    lastPageText: 'Last',
    nextPageTitle: 'First page',
    prePageTitle: 'Pre page',
    firstPageTitle: 'Next page',
    lastPageTitle: 'Last page',
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [{
      text: '5', value: 5
    }, {
      text: '10', value: 10
    }, {
      text: '25', value: 25
    },{
      text: '50', value: 50
    },  {
      text: 'All', value: res.length
    }] 
  };
  const today = new Date();
  var time = String(today).substring(16, 24)
  const [query, setQuery] = useState("");
//   console.log(time)
    if(res.length === 0){
    Axios.post('http://localhost:3002/getScheduledMeetings', {
        date: String(today).substring(4, 15),
        time:time
    }).then((response)=>{
        var result = JSON.parse(JSON.stringify(response)).data;
        for(let i=0; i<result.length; i++){
          result[i].status="Scheduled";
        }
        setResult(result);
        if(result.length === 0)
          return
        console.log(result)
    })
    }
    setInterval(function () {
      window.location.reload();
    }, 300000);
  return(
    <>
    <div className="mx-4 my-4">
    <input className="form-control" placeholder="Search" onChange={event => setQuery(event.target.value)} />
    <br/>
    <BootstrapTable
        bootstrap4
        keyField="S.no"
        data=
        {FilterData(res, query)}
        columns={columns}
        pagination={paginationFactory(options)}
        noDataIndication="No data available in table"
      />
      </div>
    </>
)
}

export default ScheduledVC;