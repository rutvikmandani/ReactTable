import React, { useMemo } from "react";
import { useTable, useGlobalFilter, useFilters, usePagination, useSortBy, useRowSelect, useExpanded } from 'react-table'
// import Data from "./Components/Data.json"
import Data from "./Nestded.json"


    function Table({ columns: userColumns, data }) {
        const {
          getTableProps,
          getTableBodyProps,
          headerGroups,
          rows,
          prepareRow,
          state: { expanded },
        } = useTable(
          {
            columns: userColumns,
            data,
          },
          useExpanded 
        )

        console.log('expanded', expanded)
        console.log('useExpanded', useExpanded)
        return (
            <>
              <table {...getTableProps()}>
                <thead>
                  {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                          return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        })}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <br />
              <div>Showing the first 20 results of {rows.length} rows</div>
              <pre>
                <code>{JSON.stringify({ expanded: expanded }, null, 2)}</code>
              </pre>
            </>
          )
        }


const Expanded = () => {
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
            //   row.canExpand ? (
                <span
                  {...row.getToggleRowExpandedProps({
                    style: {
                      paddingLeft: `${row.depth * 2}rem`,
                    },
                  })}
                >
                  {row.isExpanded ? '👇' : '👉'}
                </span>
            //   ) : null,
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
      const data = [
        {
            "id":1,
            "first_name":"Torie",
            "last_name":"Rustman",
            "email":"trustman0@amazon.co.uk",
            "date_of_birth":"1979-11-16T23:04:32Z",
            "age":45,
            "country":"Argentina",
            "phone":"6844103517",
            "subRows": [
                    {
            "id":1,
            "first_name":"Torie",
            "last_name":"Rustman",
            "email":"trustman0@amazon.co.uk",
            "date_of_birth":"1979-11-16T23:04:32Z",
            "age":45,
            "country":"Argentina",
            "phone":"6844103517"
        },
        {
            "id":2,
            "first_name":"Kordula",
            "last_name":"Gecks",
            "email":"kgecks1@deviantart.com",
            "date_of_birth":"1997-08-06T21:07:34Z",
            "age":30,
            "country":"Greece",
            "phone":"8429683893"
        },
        {
            "id":3,
            "first_name":"Vikki",
            "last_name":"Simoens",
            "email":"vsimoens2@ted.com",
            "date_of_birth":"2016-04-28T16:59:19Z",
            "age":48,
            "country":"Czech Republic",
            "phone":"8672773997"
        }
            ]
        },
        {
            "id":2,
            "first_name":"Kordula",
            "last_name":"Gecks",
            "email":"kgecks1@deviantart.com",
            "date_of_birth":"1997-08-06T21:07:34Z",
            "age":30,
            "country":"Greece",
            "phone":"8429683893",
            "subRows": [
                    {
            "id":1,
            "first_name":"Torie",
            "last_name":"Rustman",
            "email":"trustman0@amazon.co.uk",
            "date_of_birth":"1979-11-16T23:04:32Z",
            "age":45,
            "country":"Argentina",
            "phone":"6844103517"
        },
        {
            "id":2,
            "first_name":"Kordula",
            "last_name":"Gecks",
            "email":"kgecks1@deviantart.com",
            "date_of_birth":"1997-08-06T21:07:34Z",
            "age":30,
            "country":"Greece",
            "phone":"8429683893"
        },
        {
            "id":3,
            "first_name":"Vikki",
            "last_name":"Simoens",
            "email":"vsimoens2@ted.com",
            "date_of_birth":"2016-04-28T16:59:19Z",
            "age":48,
            "country":"Czech Republic",
            "phone":"8672773997"
        }
            ]
        },
        {
            "id":3,
            "first_name":"Vikki",
            "last_name":"Simoens",
            "email":"vsimoens2@ted.com",
            "date_of_birth":"2016-04-28T16:59:19Z",
            "age":48,
            "country":"Czech Republic",
            "phone":"8672773997",
            "subRows": [
                    {
            "id":1,
            "first_name":"Torie",
            "last_name":"Rustman",
            "email":"trustman0@amazon.co.uk",
            "date_of_birth":"1979-11-16T23:04:32Z",
            "age":45,
            "country":"Argentina",
            "phone":"6844103517"
        },
        {
            "id":2,
            "first_name":"Kordula",
            "last_name":"Gecks",
            "email":"kgecks1@deviantart.com",
            "date_of_birth":"1997-08-06T21:07:34Z",
            "age":30,
            "country":"Greece",
            "phone":"8429683893"
        },
        {
            "id":3,
            "first_name":"Vikki",
            "last_name":"Simoens",
            "email":"vsimoens2@ted.com",
            "date_of_birth":"2016-04-28T16:59:19Z",
            "age":48,
            "country":"Czech Republic",
            "phone":"8672773997"
        }
            ]
        },
        {
            "id":2,
            "first_name":"Kordula",
            "last_name":"Gecks",
            "email":"kgecks1@deviantart.com",
            "date_of_birth":"1997-08-06T21:07:34Z",
            "age":30,
            "country":"Greece",
            "phone":"8429683893",
            "subRows": [
                    {
            "id":1,
            "first_name":"Torie",
            "last_name":"Rustman",
            "email":"trustman0@amazon.co.uk",
            "date_of_birth":"1979-11-16T23:04:32Z",
            "age":45,
            "country":"Argentina",
            "phone":"6844103517"
        },
        {
            "id":2,
            "first_name":"Kordula",
            "last_name":"Gecks",
            "email":"kgecks1@deviantart.com",
            "date_of_birth":"1997-08-06T21:07:34Z",
            "age":30,
            "country":"Greece",
            "phone":"8429683893"
        },
        {
            "id":3,
            "first_name":"Vikki",
            "last_name":"Simoens",
            "email":"vsimoens2@ted.com",
            "date_of_birth":"2016-04-28T16:59:19Z",
            "age":48,
            "country":"Czech Republic",
            "phone":"8672773997"
        }
            ]
        },
        {
            "id":3,
            "first_name":"Vikki",
            "last_name":"Simoens",
            "email":"vsimoens2@ted.com",
            "date_of_birth":"2016-04-28T16:59:19Z",
            "age":48,
            "country":"Czech Republic",
            "phone":"8672773997",
            "subRows": [
                    {
            "id":1,
            "first_name":"Torie",
            "last_name":"Rustman",
            "email":"trustman0@amazon.co.uk",
            "date_of_birth":"1979-11-16T23:04:32Z",
            "age":45,
            "country":"Argentina",
            "phone":"6844103517"
        },
        {
            "id":2,
            "first_name":"Kordula",
            "last_name":"Gecks",
            "email":"kgecks1@deviantart.com",
            "date_of_birth":"1997-08-06T21:07:34Z",
            "age":30,
            "country":"Greece",
            "phone":"8429683893"
        },
        {
            "id":3,
            "first_name":"Vikki",
            "last_name":"Simoens",
            "email":"vsimoens2@ted.com",
            "date_of_birth":"2016-04-28T16:59:19Z",
            "age":48,
            "country":"Czech Republic",
            "phone":"8672773997"
        }
            ]
        }
    ]  
    return(
        <>
            <Table columns={columns} data={data} />
        </>
    )
}

export default Expanded;