import {Link, useHistory} from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import {Button, Card, CardBody, CardText, CustomInput, Form, FormFeedback, FormGroup, Input, Label} from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import {useForm} from 'react-hook-form'
import classnames from "classnames"
import {toast} from 'react-toastify'
import Toaster from "@components/toaster"
import Logo from "@components/logo"
import { reset } from '@store/reducers/auth'
import { login as userLogin } from '@store/actions/auth'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

const Login = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const {register, errors, handleSubmit} = useForm()

    const { user, isError, isSuccess, message } = useSelector(
      (state) => state.auth
    )
      useEffect(() => {
    if (isError) {
      toast.error(<Toaster status='error' message={message}/>)
    }

    // Redirect when logged in
    if (isSuccess || user) {
      history.push('/dashboard')
    }

    dispatch(reset())
  }, [isError, isSuccess, user, message, dispatch])

    const onSubmit = async data => {
        dispatch(userLogin(data))
    }

    return (
        <div className='auth-wrapper auth-v1 px-2'>
            <div className='auth-inner py-2'>
                <Card className='mb-0'>
                    <CardBody>
                        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
                       <Logo/>
                            <h2 className='brand-text text-primary ml-1'>Login</h2>
                        </Link>
                        <CardText className='mb-2'>Please sign-in to your account</CardText>
                        <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
                            <FormGroup>
                                <Label className='email' for='email'>
                                    Email
                                </Label>
                                <Input
                                    type='email'
                                    name='email'
                                    id='email'
                                    innerRef={register({required: 'Email field is required'})}
                                    invalid={errors.email && true}
                                    placeholder='john@example.com'
                                />
                                {errors && errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
                            </FormGroup>
                            <FormGroup>
                                <div className='d-flex justify-content-between'>
                                    <Label className='form-label' for='login-password'>
                                        Password
                                    </Label>
                                    <Link to='/forgot-password'>
                                        <small>Forgot Password?</small>
                                    </Link>
                                </div>
                                <InputPasswordToggle
                                    id='password'
                                    name='password'
                                    className='input-group-merge'
                                    className={classnames({'is-invalid': errors['password']})}
                                    innerRef={register({required: 'Password field is required'})}
                                />
                                {errors && errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
                            </FormGroup>
                            <FormGroup>
                                <CustomInput type='checkbox' className='custom-control-Primary' id='remember-me'
                                             label='Remember Me'/>
                            </FormGroup>
                            <Button.Ripple type='submit' color='primary' block>
                                Sign in
                            </Button.Ripple>
                        </Form>
                        <p className='text-center mt-2'>
                            <span className='mr-25'>New on our platform?</span>
                            <Link to='/register'>
                                <span>Create an account</span>
                            </Link>
                        </p>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default Login
