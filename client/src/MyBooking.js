import React
,{useState} 
from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import  Axios  from "axios";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";


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
    }
  ]

const MyBooking = () => {
    const [res, setResult] = useState([]);

    //const { SearchBar } = Search;

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
if(res.length === 0){
Axios.post('http://localhost:3002/getMeetings',{
ICNumber: localStorage.getItem("ICNumber")
}).then((response)=>{
    var result = JSON.parse(JSON.stringify(response)).data;
    setResult(result);
    if(result.length === 0)
      return
    console.log(result)
    //console.log(res)
})
}

const [query, setQuery] = useState("");

const filterData = (data, search) => {
  if(search === '')
    return data;
  return data.filter((item) => {
    const meetingName = item.MeetingName.toLowerCase();
    const meetingDate = item.MeetingDate.toLowerCase();
    const venue = item.Venue.toLowerCase();
    const time = item.Timings;
    const description = item.Description.toLowerCase();
    var x;
    if(meetingName.includes(search.toLowerCase()))
      x = meetingName.includes(search.toLowerCase())
    else if(meetingDate.includes(search.toLowerCase()))
      x = meetingDate.includes(search.toLowerCase())
    else if(venue.includes(search.toLowerCase()))
      x = venue.includes(search.toLowerCase())
    else if(time.includes(search))
      x = time.includes(search)
    else if(description.includes(search.toLowerCase()))
      x = description.includes(search.toLowerCase())
    return x
  })
} 

return(
    <>
    <div className="mx-4 my-4">
    <input className="form-control" placeholder="Search" onChange={event => setQuery(event.target.value)} />
    <br/>
    <BootstrapTable
        bootstrap4
        keyField="S.no"
        data={filterData(res, query)}
        columns={columns}
        pagination={paginationFactory(options)}
        noDataIndication="No data available in table"
      />
      </div>
    </>
)
     
}

export default MyBooking;