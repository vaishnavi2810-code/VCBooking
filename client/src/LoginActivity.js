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
        dataField: "LoginTime",
        text: "Login Time",
        sort: true
    },
    {
        dataField: "IPAddress",
        text: "IP Address",
        sort: true
      },
    {
      dataField: "Device",
      text: "Device",
      sort: true,
      //filter: textFilter()
    },
    {
      dataField: "Response",
      text: "Response",
      sort:true
    },
    {
        dataField: "Country",
        text: "Country",
        sort:true
      }
  ]


const LoginActivity = () =>{
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

      if(res.length === 0){
        Axios.post('http://localhost:3002/getLoginActivity',{
        ICNumber: localStorage.getItem("ICNumber")
        }).then((response)=>{
            var result = JSON.parse(JSON.stringify(response)).data;
            setResult(result);
            if(result.length === 0)
              return
            console.log(result)
        })
        }
        const [query, setQuery] = useState("");

        const filterData = (data, search) => {
          if(search === '')
            return data;
          return data.filter((item) => {
            const loginTime = item.LoginTime;
            
            const ip = item.IPAddress;
            console.log(typeof loginTime, typeof ip)
            const device = item.Device.toLowerCase();
            const response = item.Response.toLowerCase();
            const country = item.Country.toLowerCase();
            var x;
            if(loginTime.includes(search))
              x = loginTime.includes(search)
            else if(ip.includes(search))
              x = ip.includes(search)
            else if(device.includes(search.toLowerCase()))
              x = device.includes(search.toLowerCase())
            else if(response.includes(search.toLowerCase()))
              x = response.includes(search.toLowerCase())
            else if(country.includes(search.toLowerCase()))
              x = country.includes(search.toLowerCase())
            return x
          })
        } 
    return(
        <>
        <div className="mx-4 my-4">
        <input className="form-control" placeholder="Search" onChange={event => setQuery(event.target.value)} />
        <br />
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
export default LoginActivity