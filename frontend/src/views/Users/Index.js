import { Fragment, useEffect, useState, useCallback } from 'react'
import Breadcrumbs from '@components/breadcrumbs'
import { MoreVertical, Edit, Trash } from 'react-feather'
import { Row, Col, Card, Table, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import axios from 'axios'
import {getUserData} from '@utils'
import {toast} from 'react-toastify'
import Toaster from "@components/toaster"

const Tables = () => {
    const [users, setUsers] = useState([])
     const token = getUserData().token

     const fetchUsers = useCallback(async () => {
        const response = await axios({
            url: 'users',
            method: 'GET',
            headers: {Authorization : `Bearer ${token}`} 
        })
        setUsers(response.data.users)
      }, [])

       const onDelete = async (id) => {
            const response = await axios({
                url: `users/${id}`,
                method: 'DELETE',
                headers: {Authorization : `Bearer ${token}`} 
            })
            setUsers(response.data.users)
            toast.success(<Toaster status='success' message={response.data.message}/>)
        }

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])

    return (
        <Fragment>
            <Breadcrumbs breadCrumbTitle='Users List' breadCrumbParent='Users' breadCrumbActive='List' buttonText='Add New User' buttonTo='/users/create' />
            <Row>
                <Col sm='12'>
                    <Card>
                        <Table responsive>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                         {users.map((user) => (
                            <tr key={user.id}>
                                <td>
                                   {user.name}
                                </td>
                                <td>{user.email}</td>
                                <td>
                                    <UncontrolledDropdown>
                                        <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                            <MoreVertical size={15} />
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem className='w-100' onClick={e => e.preventDefault()}>
                                                <Edit className='mr-50' size={15} /> <span className='align-middle'>Edit</span>
                                            </DropdownItem>
                                            
                                            <DropdownItem className='w-100' onClick={() => onDelete(user.id)}>
                                                <Trash className='mr-50' size={15} /> <span className='align-middle'>Delete</span>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </td>
                            </tr>
                         ))}  
                            </tbody>
                        </Table>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    )
}

export default Tables
