import React,{Fragment,useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { getPosts } from '../../actions/post'
import Loading from '../Loading'
import { Divider } from 'antd'
import SinglePost from './SinglePost'
import Createpost from './Createpost'
 


const Posts = ({getPosts,post:{posts,loading,post},auth:{user}}) => {
  

    useEffect(()=>{
        getPosts(user.Hospital)
    },[getPosts,post])
    
    
  return loading ? <Loading/> :(<Fragment><Divider>Posts</Divider>
  <Createpost/>
     <div className='posts'>
        {
            posts.map(post=>(
                <SinglePost key={post._id} post={post}/>
            ))
        }
     </div>
  </Fragment>)
}

Posts.propTypes = {
    getPosts:PropTypes.func.isRequired,
    post:PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired

}

const mapStateToProps=state=>({
    post:state.post,
    auth:state.auth
})

export default connect (mapStateToProps,{getPosts})(Posts)