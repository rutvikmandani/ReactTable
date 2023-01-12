import './App.css';
import { useTable,
   useGlobalFilter, 
   useFilters, 
   usePagination, 
   useSortBy, 
   useRowSelect, 
   useExpanded 
  } from 'react-table'
import { Columns, GroupColumns } from './Components/Columns';
// import Data from "./Components/Data.json"
import Data from "./Components/Nestded.json"
import { useEffect, useMemo, useState } from 'react';
import GlobalFilter from './Components/GlobalFilter';
import ColumnFilter from './Components/ColumnFilter';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CheckBox from './Components/CheckBox';

function App() {

  // const columns = useMemo(() => Columns, [])
  // const columns = useMemo(() => GroupColumns, [])
  const data = useMemo(() => Data, [])
  
  const [selectedTable, setSelectedTable] = useState(false)
  
  // const defaultColumn = useMemo(() => ({ Filter: ColumnFilter }), [])  
  
  
  const columns = useMemo(
    () => [
          {
            id: 'expander', 
            Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
              <span {...getToggleAllRowsExpandedProps()}>
                {isAllRowsExpanded ? '👇' : '👉'}
              </span>
            ),
            Cell: ({ row }) =>
              row.canExpand ? (
                <span
                  {...row.getToggleRowExpandedProps({
                    style: {
                      paddingLeft: `${row.depth * 2}rem`,
                    },
                  })}
                >
                  {row.isExpanded ? '👇' : '👉'}
                </span>
              ) : null,
          },
          {
            Header: 'Id',
            Footer: 'Id',
            accessor: 'id',
            disableFilters: true,
            sticky: 'left',
          },
          {
            Header: 'First Name',
            Footer: 'First Name',
            accessor: 'first_name',
            sticky: 'left',
          },
          {
            Header: 'Last Name',
            Footer: 'Last Name',
            accessor: 'last_name',
            sticky: 'left',
          },
          {
            Header: 'Date of Birth',
            Footer: 'Date of Birth',
            accessor: 'date_of_birth',
        },
          {
            Header: 'Country',
            Footer: 'Country',
            accessor: 'country',
          },
          {
            Header: 'Phone',
            Footer: 'Phone',
            accessor: 'phone',
          },
          {
            Header: 'Email',
            Footer: 'Email',
            accessor: 'email',
          },
          {
            Header: 'Age',
            Footer: 'Age',
            accessor: 'age',
          }
        ],
        []
      )


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    gotoPage,
    pageCount,
    pageOptions,
    setPageSize,
    state,
   
    setGlobalFilter,
    selectedFlatRows } = useTable({
      columns,
      data,
      // defaultColumn,
    }, useFilters,
      useGlobalFilter,
      useSortBy,
      useExpanded,
      usePagination,


      ///////////  Data Selection  ///////////

      useRowSelect,
      hooks => {
        hooks.visibleColumns.push(column => [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <CheckBox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => {
              return (
                <>

                  <CheckBox {...row.getToggleRowSelectedProps()} onClick={() => setSelectedTable(true)} />

                </>
              )
            }
          },
          ...column,
        ])
      }
    )





  console.log('headerGrops', headerGroups)
  
  const { expanded } =  state

  const { globalFilter } = state
  console.log('selectedTable', selectedTable)
  const { pageIndex, pageSize } = state

  // selectedFlatRows.map((row) => console.log('row', row))
  // console.log('selectedFlatRows', selectedFlatRows)

  return (
    <>
      <div className="pageArrow">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>  
      <div className="pageArrow">
        <table {...getTableProps()} >
          <thead>
            {headerGroups.map((headerGroup) =>
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())} >
                    {column.render("Header")}
                    <span>{column.isSorted ? (column.isSortedDesc ? "🔽" : "🔼") : null}</span>

                    {/*  Column Filter  */}
                    {/* <div>{column.canFilter ? column.render("Filter") : null}</div>    */}

                  </th>
                )))}
              </tr>
            )}
          </thead>
          <tbody {...getTableBodyProps()}>

            {/*  Display All Data  */}
            {/* {rows.map(row => { */}

            {page.map(row => {
              prepareRow(row)

              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div>

        <span className="pageArrow">
          <span className="pageNo">
            {pageIndex + 1} of {pageOptions.length}
          </span>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}> <SkipPreviousIcon /> </button>
          <button onClick={() => previousPage()} disabled={!canPreviousPage} > <ArrowBackIosNewIcon /> </button>
          <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))} >
            {
              [10, 20].map(pageSize => (
                <option key={pageSize} value={pageSize}> Show {pageSize}</option>
              ))
            }
          </select>
          <button onClick={() => nextPage()} disabled={!canNextPage}> <ArrowForwardIosIcon /> </button>
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}> <SkipNextIcon /> </button>
        </span>

        {/* <span>
          | Go to page:{' '}
          <input
            type='number'
            defaultValue={pageIndex + 1}
            onChange={e => {
              const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(pageNumber)
            }}
            style={{ width: '50px' }}
          />
        </span> */}
{console.log("selectedFlatRows",selectedFlatRows)}
        {
          selectedTable ?
            <div>
              <h2>Selected Data</h2>
              <div className="pageArrow">
                <table {...getTableProps()}>
                  <thead>
                    {headerGroups.map((headerGroup) =>
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column => (
                          <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                            {column.render('Header')}
                          </th>
                        )))}
                      </tr>
                    )}
                  </thead>
                  <tbody>
                    {/* {console.log("@@",selectedFlatRows)} */}
                    {
                      (selectedFlatRows.length !== 0) ?
                        selectedFlatRows.map((row) => {
                          console.log("ROW", selectedFlatRows)
                          console.log("called")
                          let { id, first_name, last_name, date_of_birth, country, phone, email, age } = row.original

                          if (selectedFlatRows === []) {
                            setSelectedTable(false)
                          }
                          return (
                            <tr>
                              <td></td>
                              <td>{id}</td>
                              <td>{first_name}</td>
                              <td>{last_name}</td>
                              <td>{date_of_birth}</td>
                              <td>{country}</td>
                              <td>{phone}</td>
                              <td>{email}</td>
                              <td>{age}</td>
                            </tr>
                          )
                        })
                        : setSelectedTable(false)
                    }
                  </tbody>
                </table>
              </div>
            </div>
            :
            null
        }
        {/* console.log('row', row.original)) */}
      </div>
    </>
  );
}

export default App;
