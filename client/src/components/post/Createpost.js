import React,{useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { addpost } from '../../actions/post'


const Createpost = ({addpost,auth}) => {
    const [text,setText]=useState('')

  return   <><div class="bg-primary p">
      <h3>Say Something...</h3>
  </div><form class="form my-1" onSubmit={e=>{
    e.preventDefault();
    addpost({'text':text,'Aprovel':auth.user.Hospital});
    setText('')
  }}>
          <textarea
              name="text"
              cols="30"
              rows="5"
              value={text}
              placeholder="Create a post"
              required
              onChange={e=>setText(e.target.value)}
          ></textarea>
          <input type="submit" class="btn btn-dark my-1" value="Submit" />
      </form></>
 
}

Createpost.propTypes = {
    addpost:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
}


const mapStateToProps=state=>({
    auth:state.auth,
     
})
export default connect (mapStateToProps,{addpost})(Createpost)