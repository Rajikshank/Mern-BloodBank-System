import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Loading from '../Loading'
import { Link, useParams } from 'react-router-dom'
import SingleRequest from './SingleRequest'
import { getRequest } from '../../actions/request'

const Requestview = ({getRequest,request:{request,loading}}) => {
    const { id } = useParams();

useEffect(()=>{
    getRequest(id);
},[getRequest]);
 
 
  return loading || request===null ? <Loading/> :
  <Fragment>
    <Link to={'/dashboard'} class="btn btn-light" >Back</Link>
<SingleRequest requestview={true} request={request}/>

 
  </Fragment>
    
  
}

Requestview.propTypes = {
    getRequest:PropTypes.func.isRequired,
    request:PropTypes.object.isRequired
}

const mapStateToProps=state=>({
    request :state.request
})

export default connect (mapStateToProps,{getRequest})(Requestview)