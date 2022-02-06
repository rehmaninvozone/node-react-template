import {AlertTriangle, Check} from "react-feather"
import Avatar from '@components/avatar'

const Toaster = props => {
    const { status, message } = props

    return (
        <div className='toastify-header'>
            <div className='title-wrapper'>
                {status === 'error' && <Avatar size='sm' color='danger' icon={<AlertTriangle size={12}/>}/>}
                {status === 'success' && <Avatar size='sm' color='success' icon={<Check size={12}/>}/>}
                <h6 className='toast-title'>{message}</h6>
            </div>
        </div>
    )
}

export default Toaster
