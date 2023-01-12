import React from "react";
import { useTable, useGlobalFilter,useFilters, usePagination, useSortBy } from 'react-table'
import { Columns } from './Columns';
import Data from "./Data.json"
import { useMemo } from 'react';
import GlobalFilter from './Components/GlobalFilter';
import ColumnFilter from './Components/ColumnFilter';

const RowSelection = () => {

    const columns = useMemo(() => Columns, [])
  const data = useMemo(() => Data, [])

  const defaultColumn = useMemo(() => ({Filter: ColumnFilter}),[])

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
    setGlobalFilter } = useTable({
    columns,
    data,
    defaultColumn
  }, useFilters,
  useGlobalFilter,
  useSortBy,
  usePagination)

  console.log('headerGrops', headerGroups)

  const { globalFilter } = state

  const {pageIndex, pageSize} = state


    return(
        <>

        </>
    )
}

export default RowSelection