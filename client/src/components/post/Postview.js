import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Loading from '../Loading'
import { getPost } from '../../actions/post'
import { Link, useParams } from 'react-router-dom'
import SinglePost from './SinglePost'
import Participant from './Participant'

const Postview = ({getPost,auth,post:{post,loading}}) => {
    const { id } = useParams();

useEffect(()=>{
    getPost(id);
},[getPost]);

 
 
  return loading || post===null ? <Loading/> :
  <Fragment>
    <Link to={'/dashboard'} class="btn btn-light" >Back</Link>
<SinglePost postview={true} post={post} />

{post.participants.length>0 &&
<div className='comments'>
    {<Participant  Participant={post.participants} />
    
    }
</div>}
  </Fragment>
    
  
}

Postview.propTypes = {
    getPost:PropTypes.func.isRequired,
    post:PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired
}

const mapStateToProps=state=>({
    post :state.post,
    auth:state.auth
})

export default connect (mapStateToProps,{getPost})(Postview)