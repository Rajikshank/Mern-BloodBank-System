import React,{Fragment,useEffect,useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Loading from '../Loading'
import { Divider } from 'antd'
import SinglePost from './SingleRequest'
import CreateRequest from './CreateRequest'
import { getRequests } from '../../actions/request'
 


const Requests = ({getRequests,request:{requests,loading,request},auth:{user}}) => {
    

    useEffect(()=>{
        getRequests()
  
    },[getRequests,request])

     
  return loading ? <Loading/> :(<Fragment>
      <h1 className='large text-primary'>Requests</h1>
  <CreateRequest/>
  <Divider>Blood Bank Requests</Divider>
     <div className='posts'>
        {
            requests.map(request=>(
                <SinglePost key={request._id} request={request}  />
            ))
        }
     </div>
  </Fragment>)
}

Requests.propTypes = {
    getRequests:PropTypes.func.isRequired,
    request:PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired

}

const mapStateToProps=state=>({
    request:state.request,
    auth:state.auth
})

export default connect (mapStateToProps,{getRequests})(Requests)