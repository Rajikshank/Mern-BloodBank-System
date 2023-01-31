import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import {Link,useNavigate} from 'react-router-dom'
import Moment from 'react-moment'
import {connect} from 'react-redux'
import { deletepost} from '../../actions/post'
import { addParticipants,removeParticipants,approvepost } from '../../actions/post'
 

const SinglePost = ({auth,post:{_id,user,text,name,avatar,participants,Date,Aprovel},deletepost,addParticipants,approvepost,postview}) => {
  const navigate=useNavigate();
 
  

  return (
    <div class="post bg-timeline p-1 my-1">
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


            { !postview &&
            <>  
            <Link type="button" class="btn btn-light">
            <i class="fa fa-people-group"></i> Participants {': '}
              <span>{participants.length}</span>
            </Link>
            
             
            
            {!auth.user.Hospital && <Link to={`/Post/${_id}`}  class="btn btn-success">
              View Post  
            </Link> }
            </>
            }
            
            

            {participants.length>0 && postview  && participants.filter(participant=>participant.user===auth.user._id).length===0 ||participants.length===0&& postview && <button class="btn btn-success" onClick={e=>addParticipants(_id)} > Participate</button>}
          
              



            {auth.user.email==='Admin@admin.com' && Aprovel===false &&  <button   className="btn btn-success" onClick={e=>approvepost(_id,navigate)}>
              Approve  
            </button>}
            
            
            {!auth.loading && user === auth.user._id  &&(
              
            <button
              onClick={ (e)=>deletepost(_id)}
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
SinglePost.defaultProps={
  postview:false
}

SinglePost.propTypes = {
    post:PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired,
    deletepost:PropTypes.func.isRequired,
    addParticipants:PropTypes.func.isRequired,
    approvepost:PropTypes.func.isRequired
}

const mapStateToProps=state=>({
    auth:state.auth,
   
})
export default connect(mapStateToProps,{deletepost,addParticipants,approvepost})(SinglePost)