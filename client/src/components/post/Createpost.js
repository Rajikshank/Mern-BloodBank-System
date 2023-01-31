import React,{useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { addpost } from '../../actions/post'
import { Input } from 'antd';

const Createpost = ({addpost,auth}) => {
    const [text,setText]=useState('')
    const { TextArea } = Input;

  return   <><div class="bg-primary p">
      <h3>Create a Post  Regarding Blood Donation Campaign...</h3>
  </div><form class="form my-1" onSubmit={e=>{
    e.preventDefault();
    addpost({'text':text,'Aprovel':auth.user.Hospital});
    setText('')
  }}>
          <TextArea
              name="text"
              cols="30"
              rows="5"
              value={text}
              placeholder="Create a post"
              required
              onChange={e=>setText(e.target.value)}
          ></TextArea>
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