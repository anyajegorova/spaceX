import { useState, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-community/styles/ag-grid.css";

import axios from 'axios';

import './App.css'


function App() {
  const [data, setData] = useState([])

  const [rowData, setRowData] = useState([{}]);
  const [colDefs, setColDefs] = useState([
    { field: 'type', headerName: 'Type' },
    { field: 'status', headerName: 'Status' },
    { field: 'land_landings', headerName: 'Land Landings' },
    { field: 'water_landings', headerName: 'Water Landings' },
    { field: 'reuse_count', headerName: 'Reuse Count' },
    { field: 'last_update', headerName: 'Last Update', resizable: true }

  ])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/capsules')
        const data = response.data.map((capsule) => ({
          type: capsule.type,
          status: capsule.status,
          land_landings: capsule.land_landings,
          water_landings: capsule.water_landings,
          reuse_count: capsule.reuse_count,
          last_update: capsule.last_update

        }))

        setData(data);
        setRowData(data)
        console.log(data)
      } catch (error) {
        console.error('Error fetching data', error.message)
      }
    }

    fetchData()
  }, []);

  const handleClick = () => {
    console.log(data)
  }

  return (
    <>
      <section className='main_section'>
        <h1> SpaceX Capsules</h1>
        <div className="ag-theme-quartz" style={{ height: 500 }}>
          <AgGridReact rowData={rowData} columnDefs={colDefs} />
        </div>


        {data.length > 0 && (
          <button onClick={handleClick}>Show data</button>
        )}
      </section>
    </>
  )
}

export default App
