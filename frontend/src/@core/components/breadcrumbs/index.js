// ** React Imports
import { Link } from 'react-router-dom'

// ** Third Party Components
import Proptypes from 'prop-types'
import {
  Button,
  Breadcrumb,
  BreadcrumbItem
} from 'reactstrap'

const BreadCrumbs = props => {
  // ** Props
  const { breadCrumbTitle, breadCrumbParent, breadCrumbParent2, breadCrumbParent3, breadCrumbActive, buttonText, buttonTo } = props

  return (
    <div className='content-header row'>
      <div className='content-header-left col-md-9 col-12 mb-2'>
        <div className='row breadcrumbs-top'>
          <div className='col-12'>
            {breadCrumbTitle ? <h2 className='content-header-title float-left mb-0'>{breadCrumbTitle}</h2> : ''}
            <div className='breadcrumb-wrapper vs-breadcrumbs d-sm-block d-none col-12'>
              <Breadcrumb>
                <BreadcrumbItem tag='li'>
                  <Link to='/'>Dashboard</Link>
                </BreadcrumbItem>
                <BreadcrumbItem tag='li' className='text-primary'>
                  {breadCrumbParent}
                </BreadcrumbItem>
                {breadCrumbParent2 ? (
                  <BreadcrumbItem tag='li' className='text-primary'>
                    {breadCrumbParent2}
                  </BreadcrumbItem>
                ) : (
                  ''
                )}
                {breadCrumbParent3 ? (
                  <BreadcrumbItem tag='li' className='text-primary'>
                    {breadCrumbParent3}
                  </BreadcrumbItem>
                ) : (
                  ''
                )}
                <BreadcrumbItem tag='li' active>
                  {breadCrumbActive}
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
          </div>
        </div>
      </div>
      <div className='content-header-right text-md-right col-md-3 col-12 d-md-block'>
        {buttonText && <Button.Ripple color='primary' tag={Link} to={buttonTo}>
          {buttonText}
        </Button.Ripple>
        }
      </div>
    </div>
  )
}
export default BreadCrumbs

// ** PropTypes
BreadCrumbs.propTypes = {
  breadCrumbTitle: Proptypes.string.isRequired,
  breadCrumbActive: Proptypes.string.isRequired
}
