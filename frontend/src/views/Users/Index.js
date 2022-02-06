import { Fragment } from 'react'
import Breadcrumbs from '@components/breadcrumbs'
import { MoreVertical, Edit, Trash } from 'react-feather'
import { Row, Col, Card, Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'

const Tables = () => {

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
                            <tr>
                                <td>
                                    Ali
                                </td>
                                <td>Peter Charles</td>
                                <td>
                                    <UncontrolledDropdown>
                                        <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                                            <MoreVertical size={15} />
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                <Edit className='mr-50' size={15} /> <span className='align-middle'>Edit</span>
                                            </DropdownItem>
                                            <DropdownItem href='/' onClick={e => e.preventDefault()}>
                                                <Trash className='mr-50' size={15} /> <span className='align-middle'>Delete</span>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    )
}

export default Tables
