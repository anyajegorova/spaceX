import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import 'ag-grid-community/styles/ag-theme-alpine.css';



import axios from 'axios';

import './App.css'


function App() {
  const gridRef = useRef();
  const [data, setData] = useState([]);

  const [rowData, setRowData] = useState([{}]);
  const [colDefs, setColDefs] = useState([
    { headerName: 'Row', valueGetter: 'node.rowIndex + 1', width: 100 },
    { field: 'type', headerName: 'Type', width: 160 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'land_landings', headerName: 'Land Landings', width: 160 },
    { field: 'water_landings', headerName: 'Water Landings', width: 170 },
    { field: 'reuse_count', headerName: 'Reuse Count', width: 160 },
    { field: 'last_update', headerName: 'Last Update', width: 600 }

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

  const popupParent = useMemo(() => {
    return document.body;
  }, []);

  const exportToCSV = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);

  return (
    <>

      <section className='main_section'>

        <h1> SpaceX Capsules</h1>
        <div className="ag-theme-alpine-dark" style={{ height: 500 }}>
          <AgGridReact
            pagination={true}
            paginationAutoPageSize={true}
            ref={gridRef}
            rowData={rowData}
            rowHeight={60}
            rowSelection={'single'}
            rowMultiSelectWithClick={true}

            columnDefs={colDefs}
            suppressRowClickSelection={false}
            suppressExcelExport={true}
            popupParent={popupParent}
          />
        </div>
        <div className='buttons'>
          {data.length > 0 && (
            <button onClick={handleClick}>Reload data</button>
          )}
          {data.length == 0 && (
            <button onClick={handleClick}>Show data</button>
          )}
          <button onClick={exportToCSV} id='csv'>Export to CSV</button>
        </div>


      </section>
    </>
  )
}

export default App
