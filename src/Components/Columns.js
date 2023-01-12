import ColumnFilter from "./ColumnFilter"

export const Columns = [
    {
      Header: 'Id',
      Footer: 'Id',
      accessor: 'id',
      disableFilters: true,
      sticky: 'left',
      // filter: ColumnFilter
    },
    {
      Header: 'First Name',
      Footer: 'First Name',
      accessor: 'first_name',
      sticky: 'left',
      // filter: ColumnFilter
    },
    {
      Header: 'Last Name',
      Footer: 'Last Name',
      accessor: 'last_name',
      sticky: 'left',
      // filter: ColumnFilter
    },
    {
      Header: 'Date of Birth',
      Footer: 'Date of Birth',
      accessor: 'date_of_birth',
    //   Cell: ({ value }) => {
    //     return format(new Date(value), 'dd/MM/yyyy')
    //   },
      // filter: ColumnFilter
  },
    {
      Header: 'Country',
      Footer: 'Country',
      accessor: 'country',
      // filter: ColumnFilter
    },
    {
      Header: 'Phone',
      Footer: 'Phone',
      accessor: 'phone',
      // filter: ColumnFilter
    },
    {
      Header: 'Email',
      Footer: 'Email',
      accessor: 'email',
      // filter: ColumnFilter
    },
    {
      Header: 'Age',
      Footer: 'Age',
      accessor: 'age',
      // filter: ColumnFilter
    },
  ]



  export const GroupColumns = [
    {
      Header: 'Id',
      Footer: 'Id',
      accessor: 'id'
    },
    {
      Header: 'Name',
      Footer: 'Name',
      columns: [
        {
          Header: 'First Name',
          Footer: 'First Name',
          accessor: 'first_name'
        },
        {
          Header: 'Last Name',
          Footer: 'Last Name',
          accessor: 'last_name'
        }
      ]
    },
    {
      Header: 'Info',
      Footer: 'Info',
      columns: [
        {
          Header: 'Date of Birth',
          Footer: 'Date of Birth',
          accessor: 'date_of_birth'
        },
        {
          Header: 'Country',
          Footer: 'Country',
          accessor: 'country'
        },
        {
          Header: 'Phone',
          Footer: 'Phone',
          accessor: 'phone'
        }
      ]
    }
  ]