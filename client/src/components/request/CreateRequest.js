import React,{useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { addrequest } from '../../actions/request'
import { Input } from 'antd';



const CreateRequest = ({addrequest,auth}) => {
    const [text,setText]=useState('')
    const { TextArea } = Input;

  return   <><div class="bg-primary p">
      <h3>Create a Request to other Hospitals...</h3>
  </div><form class="form my-1" onSubmit={e=>{
    e.preventDefault();
    addrequest({'text':text});
    setText('')
  }}>
          <TextArea
              name="text"
              cols="30"
              rows="5"
              value={text}
              placeholder="Create a request"
              required
              onChange={e=>setText(e.target.value)}
          ></TextArea>
          <input type="submit" class="btn btn-dark my-1" value="Submit" />
      </form></>
 
}

CreateRequest.propTypes = {
    addrequest:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
}


const mapStateToProps=state=>({
    auth:state.auth,
     
})
export default connect (mapStateToProps,{addrequest})(CreateRequest)