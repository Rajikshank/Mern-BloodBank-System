import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Moment from 'react-moment'
import {connect} from 'react-redux'
 


const SinglePost = ({auth,post:{_id,user,text,name,avatar,participants,Date,Aprovel}}) => {
  return (
    <div class="post bg-white p-1 my-1">
          <div>
            <a href="profile.html">
              <img
                class="round-img"
                src={avatar}
                alt=""
              />
              <h4>{name}</h4>
            </a>
          </div>
          <div>
            <p class="my-1">
              {text}
            </p>
           
             <p class="post-date">
                Posted on {<Moment format='YYYY/MM/DD'>{Date}</Moment>}
            </p>
            <button type="button" class="btn btn-light">
            <i class="fa fa-people-group"></i> Participants {': '}
              <span>{participants.length}</span>
            </button>

            
            {!auth.user.Hospital && <Link class="btn btn-primary">
              Participate  
            </Link> }
            

            {auth.user.Hospital && Aprovel===false &&  <Link href="post.html" class="btn btn-success" onClick={console.log('clicked')}>
              Approve <span class='comment-count'>2</span>
            </Link>}
            
            {!auth.loading && user=== auth.user._id && <button      
            type="button"
            class="btn btn-danger">
            <i class="fas fa-times"></i>
          </button>}
            
          </div>
          </div>
  )
}

SinglePost.propTypes = {
    post:PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired
}

const mapStateToProps=state=>({
    auth:state.auth
})
export default connect(mapStateToProps,{})(SinglePost)