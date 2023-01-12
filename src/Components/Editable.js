import React, { useEffect, useMemo, useState } from 'react'
import '../App.css';
import { useTable,
    useGlobalFilter, 
    useFilters, 
    usePagination, 
    useSortBy, 
    useExpanded 
   } from 'react-table'

import Data from "./Nestded.json"
import GlobalFilter from './GlobalFilter';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, 
}) => {
  const [value, setValue] = useState(initialValue)

  const onChange = e => {
    setValue(e.target.value)
  }
  // console.log('onChangeVal', value)

  const onBlur = () => {
    updateMyData(index, id, value)
  }

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return <input className='tableInput' value={value} onChange={onChange} onBlur={onBlur} />
}

const defaultColumn = {
  Cell: EditableCell,
}

function Table({ columns, data, updateMyData, skipPageReset }) {

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
       
        setGlobalFilter, } = useTable({
          columns,
          data,
          defaultColumn,
          // autoResetPage: !skipPageReset,
          updateMyData,
        }, useFilters,
          useGlobalFilter,
          useSortBy,
          useExpanded,
          usePagination,
  )

      
  console.log('headerGrops', headerGroups)
    console.log('setPageSize', setPageSize)
  const { expanded } =  state

  const { globalFilter } = state
  const { pageIndex, pageSize } = state
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
                    {console.log("column",column)}
                    <span>{column.isSorted ? (column.isSortedDesc ? "🔽" : "🔼") : null}</span>

                  </th>
                )))}
              </tr>
            )}
          </thead>
          <tbody {...getTableBodyProps()}>

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
              [5, 10, 20].map(pageSize => (
                <option key={pageSize} value={pageSize}> Show {pageSize}</option>
              ))
            }
          </select>
          <button onClick={() => nextPage()} disabled={!canNextPage}> <ArrowForwardIosIcon /> </button>
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}> <SkipNextIcon /> </button>
        </span>
      </div>
    </>
  )
}

function App() {
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

  const [data, setData] = useState(() => Data)
  const [skipPageReset, setSkipPageReset] = useState(false)

  const updateMyData = (rowIndex, columnId, value) => {
    console.log('rowIndex', rowIndex)
    console.log('columnId', columnId)
    console.log('value', value)
    setSkipPageReset(true)
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          }
        }
        return row
      })
    )
  }

  useEffect(() => {
    setSkipPageReset(false)
  }, [data])

//   const resetData = () => setData(originalData)

  return (
      <>
      {/* <button onClick={resetData}>Reset Data</button> */}
      <Table
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
      </>
  )
}

export default App
