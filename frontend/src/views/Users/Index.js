import { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '@components/breadcrumbs'
import { ChevronDown, Edit, Trash, MoreVertical } from 'react-feather'
import { getData } from '@store/actions/dataTable'
import { useSelector, useDispatch } from 'react-redux'
import DataTable from 'react-data-table-component'
import ReactPaginate from 'react-paginate'
import { Input, Label, Row, Col, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, CardHeader, CardTitle  } from 'reactstrap'
import axios from 'axios'
import {toast} from 'react-toastify'
import Toaster from "@components/toaster"
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { getUserData } from '@utils'

const Users = () => {
    // ** States
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(7)
    const [searchValue, setSearchValue] = useState('')
   
    // ** Store Vars
    const dispatch = useDispatch()
    const store = useSelector(state => state.dataTable)
    const token = getUserData().token
    const onDelete = async (id) => {
      try {
       const response = await axios({
           url: `users/${id}`,
           method: 'DELETE',
           headers: {Authorization : `Bearer ${token}`} 
       })
        dispatch(
        getData({
            url: 'users',
            page: currentPage,
            perPage: rowsPerPage,
            q: searchValue
        })
        )
       toast.success(<Toaster status='success' message={response.data.message}/>)
      } catch (err) {
       toast.error(<Toaster status='error' message={err.response.data.message}/>)
      }
   }
    const columns = [
        {
          name: 'ID',
          selector: 'id',
          sortable: true,
          maxWidth: '225px'
        },
        {
            name: 'Name',
            selector: 'name',
            sortable: true,
            minWidth: '225px'
        },
        {
            name: 'Email',
            selector: 'email',
            sortable: true,
            minWidth: '250px'
        },
        {
          name: 'Actions',
          allowOverflow: true,
          cell: row => {
            return (
              <div className='d-flex'>
                  <UncontrolledDropdown>
                    <DropdownToggle className='pr-1' tag='span'>
                      <MoreVertical size={15} />
                    </DropdownToggle>
                    <DropdownMenu right>
                     <Link to={`users/edit/${row.id}`}>
                        <DropdownItem  className='w-100'>
                          <Edit size={15} />
                          <span className='align-middle ml-50'>Edit</span>
                        </DropdownItem>
                      </Link>
                      <DropdownItem className='w-100' onClick={() => onDelete(row.id)}>
                        <Trash size={15} />
                        <span className='align-middle ml-50'>Delete</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
              </div>
            )
          }
        }
      ]
    // ** Get data on mount
    useEffect(() => {
        dispatch(
        getData({
            url: 'users',
            page: currentPage,
            perPage: rowsPerPage,
            q: searchValue
        })
        )
    }, [dispatch])
   
        // ** Function to handle filter
    const handleFilter = e => {
        setSearchValue(e.target.value)
        dispatch(
        getData({
            url: 'users',
            page: currentPage,
            perPage: rowsPerPage,
            q: e.target.value
        })
        )
    }

    // ** Function to handle Pagination and get data
    const handlePagination = page => {
        dispatch(
        getData({
            url: 'users',
            page: page.selected + 1,
            perPage: rowsPerPage,
            q: searchValue
        })
        )
        setCurrentPage(page.selected + 1)
    }

    // ** Function to handle per page
    const handlePerPage = e => {
      dispatch(
        getData({
          url: 'users',
          page: currentPage,
          perPage: parseInt(e.target.value),
          q: searchValue
        })
      )
      setRowsPerPage(parseInt(e.target.value))
    }
      
    const CustomPagination = () => {
    const count = Number((store.total / rowsPerPage).toFixed(0))

    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        breakLabel='...'
        pageCount={count || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        activeClassName='active'
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        breakClassName='page-item'
        breakLinkClassName='page-link'
        containerClassName={
          'pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1'
        }
      />
    )
  }

    
  // ** Table data to render
  const dataToRender = () => {   
      return store.allData.slice(0, rowsPerPage)
  }

    return (
        <Fragment>
             <Breadcrumbs breadCrumbTitle='Users List' breadCrumbParent='Users' breadCrumbActive='List' buttonText='Add New User' buttonTo='/users/create' />
           <Row>
              <Col sm='12'>
                <Card>
            <CardHeader className='border-bottom'>
              <CardTitle tag='h4'>Server Side</CardTitle>
            </CardHeader>
            <Row className='mx-0 mt-1 mb-50'>
              <Col sm='6'>
                <div className='d-flex align-items-center'>
                  <Label for='sort-select'>show</Label>
                  <Input
                    className='dataTable-select'
                    type='select'
                    id='sort-select'
                    value={rowsPerPage}
                    onChange={e => handlePerPage(e)}
                  >
                    <option value={7}>7</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={75}>75</option>
                    <option value={100}>100</option>
                  </Input>
                  <Label for='sort-select'>entries</Label>
                </div>
              </Col>
              <Col className='d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1' sm='6'>
                <Label className='mr-1' for='search-input'>
                  Search
                </Label>
                <Input
                  className='dataTable-filter'
                  type='text'
                  bsSize='sm'
                  id='search-input'
                  value={searchValue}
                  onChange={handleFilter}
                />
              </Col>
            </Row>
            <DataTable
              noHeader
              pagination
              paginationServer
              className='react-dataTable'
              columns={columns}
              sortIcon={<ChevronDown size={10} />}
              paginationComponent={CustomPagination}
              data={dataToRender()}
            />
        </Card>
              </Col>
            </Row>
        </Fragment>
    )
}

export default Users