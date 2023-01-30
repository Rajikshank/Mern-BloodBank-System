import React,{Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Link,useNavigate} from 'react-router-dom'
import Moment from 'react-moment'
import {connect} from 'react-redux'
import { deletepost} from '../../actions/post'
import { addParticipants,removeParticipants,approvepost } from '../../actions/post'
import { addAccept, deleterequest, removeAccept } from '../../actions/request'
 

const SingleRequest = ({auth,request:{_id,user,text,name,avatar,Accept,Date},deleterequest,addAccept,removeAccept}) => {
  const [Aname,setAname]=useState('');
 
   
  

  console.log()
  return (
    <div class="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${user}`}>
              <img
                class="round-img"
                src={avatar}
                alt=""
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p class="my-1">
              {text}
            </p>
           
             <p class="post-date">
                Posted on {<Moment format='YYYY/MM/DD'>{Date}</Moment>}
            </p>

            {  Accept.length>0 && <p class="post-date">Accepted by : {Accept[0].name}</p>}
 
            
            

            {user!==auth.user._id&&Accept.length<=0  && <button class="btn btn-success" onClick={e=>{addAccept(_id)}} > Accept Request </button>}

            { Accept.length>0 && Accept.filter(accept=>accept.user===auth.user._id).length>0 && <button class="btn btn-danger" onClick={e=>{removeAccept(_id) }} > Reject Request </button>}
            


             
            
            {console.log('loading',auth.loading)}
            {!auth.loading && user === auth.user._id  &&(
              
            <button
              onClick={ (e)=>deleterequest(_id)}
              type="button"
              className="btn btn-danger"
            >
              delete {' '}
              <i className="fas fa-times" />
            </button>)}
            
          </div>
          </div>
  )
}
SingleRequest.defaultProps={
  requestview:false
}

SingleRequest.propTypes = {
    auth:PropTypes.object.isRequired,
    deleterequest:PropTypes.func.isRequired,
    addAccept:PropTypes.func.isRequired,
    removeAccept:PropTypes.func.isRequired
}

const mapStateToProps=state=>({
    auth:state.auth,
   
})
export default connect(mapStateToProps,{deleterequest,addAccept,removeAccept})(SingleRequest)