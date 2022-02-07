import {Link, useHistory} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import InputPasswordToggle from '@components/input-password-toggle'
import '@styles/base/pages/page-auth.scss'
import {Button, Card, CardBody, Form, FormFeedback, FormGroup, Input, Label} from 'reactstrap'
import classnames from "classnames"
import {toast} from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import Logo from "@components/logo"
import { register as userRegister, reset } from '@store/reducers/auth'   
import { useEffect } from 'react'

const Register = () => {

 const dispatch = useDispatch()
 const history = useHistory()
 
 const {register, errors, handleSubmit} = useForm()
 const { user, isError, isSuccess, message } = useSelector((state) => state.auth)
    useEffect(() => {
        if (isError) {
          toast.error(message)
        }
    
        if (isSuccess || user) {
            history.push('/dashboard')
        }
    
        dispatch(reset())
      }, [isError, isSuccess, user, message, dispatch])

    const onSubmit = data => {
         dispatch(userRegister(data))
    }

    return (
        <div className='auth-wrapper auth-v1 px-2'>
            <div className='auth-inner py-2'>
                <Card className='mb-0'>
                    <CardBody>
                        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
                            <Logo/>
                            <h2 className='brand-text text-primary ml-1'>Register</h2>
                        </Link>
                        <Form className='auth-register-form mt-2' onSubmit={handleSubmit(onSubmit)}>
                            <FormGroup>
                                <Label for='name'>Name</Label>
                                <Input
                                    id='name'
                                    // value={name}
                                    name='name'
                                    innerRef={register({required: 'Name field is required'})}
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
                                    innerRef={register({required: 'Email field is required'})}
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
                                    className={classnames({'is-invalid': errors['password']})}
                                    innerRef={register({required: 'Password field is required'})}
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
                                    className={classnames({'is-invalid': errors['confirmPassword']})}
                                    innerRef={register({required: 'Confirm Password field is required'})}
                                />
                                {errors && errors.confirmPassword &&
                                    <FormFeedback>{errors.confirmPassword.message}</FormFeedback>}
                            </FormGroup>
                            <Button.Ripple type="submit" color='primary' block>
                                Sign up
                            </Button.Ripple>
                        </Form>
                        <p className='text-center mt-2'>
                            <span className='mr-25'>Already have an account?</span>
                            <Link to='/login'>
                                <span>Sign in instead</span>
                            </Link>
                        </p>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default Register
