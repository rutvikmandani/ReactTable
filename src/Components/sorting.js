import React from "react";
import { Columns, GroupColumns } from '../Components/Columns';
import { useTable,
    useSortBy, 
   } from 'react-table'

const Sorting = () => {

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
          columns: Columns,
          data: GroupColumns,
        }, 
          useSortBy,
  )

    return  <Table
        columns={Columns}
        data={GroupColumns}
      />
}
export default Sorting