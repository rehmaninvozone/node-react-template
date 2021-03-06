import { Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import Breadcrumbs from '@components/breadcrumbs'
import { toast } from 'react-toastify'
import Toaster from "@components/toaster"
import { useForm } from 'react-hook-form'
import {getUserData} from '@utils'
import {Card, CardBody, Button, Form, FormGroup, Label, Input, FormFeedback} from 'reactstrap'
import InputPasswordToggle from '@components/input-password-toggle'
import classnames from "classnames"
import axios from 'axios'

const AddUser = () => {
    const { register, errors, handleSubmit } = useForm()
    const token = getUserData().token
    const history = useHistory()
    
    const  onSubmit  = async data => {
            try {
                const response = await axios({
                    url: 'create',
                    method: 'POST',
                    headers: {Authorization : `Bearer ${token}`},
                    data
                })
                history.push('/users')
                toast.success(<Toaster status='success' message={response.data.message}/>)
            } catch (err) {
                toast.error(<Toaster status='error' message={err.response.data.message}/>)
            }
    }
    return (
        <Fragment>
            <Breadcrumbs breadCrumbTitle='Add New User' breadCrumbParent='Users' breadCrumbActive='Add User' />
            <Card>
                <CardBody>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup>
                            <Label for='name'>Name</Label>
                            <Input
                                id='name'
                                // value={name}
                                name='name'
                                innerRef={register({ required: 'Name field is required' })}
                                invalid={errors.name && true}
                                placeholder='John'
                            />
                            {errors && errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
                        </FormGroup>
                        <FormGroup>
                            <Label for='email'>Email</Label>
                            <Input
                                type='email'
                                name='email'
                                // value={email}
                                id='email'
                                innerRef={register({ required: 'Email field is required' })}
                                invalid={errors.email && true}
                                placeholder='john@email.com'
                            />
                            {errors && errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
                        </FormGroup>
                        <FormGroup>
                            <Label for='password'>Password</Label>
                            <InputPasswordToggle
                                id='password'
                                name='password'
                                // value={password}
                                className='input-group-merge'
                                className={classnames({ 'is-invalid': errors['password'] })}
                                innerRef={register({ required: 'Password field is required' })}
                            />
                            {errors && errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
                        </FormGroup>
                        <FormGroup>
                            <Label for='confirmPassword'>Confirm Password</Label>
                            <InputPasswordToggle
                                id='confirmPassword'
                                name='confirmPassword'
                                // value={confirmPassword}
                                className='input-group-merge'
                                className= { classnames({ 'is-invalid': errors['confirmPassword'] })}
                                innerRef={register({ required: 'Confirm Password field is required'})}
                            />
                            {errors && errors.confirmPassword && <FormFeedback>{errors.confirmPassword.message}</FormFeedback>}
                        </FormGroup>
                        <FormGroup className='d-flex mb-0'>
                            <Button.Ripple className='mr-1' color='primary' type='submit'>
                                Submit
                            </Button.Ripple>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
        </Fragment>
    )
}

export default AddUser
