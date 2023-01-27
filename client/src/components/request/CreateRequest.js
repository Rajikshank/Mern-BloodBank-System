import React,{useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { addrequest } from '../../actions/request'


const CreateRequest = ({addrequest,auth}) => {
    const [text,setText]=useState('')

  return   <><div class="bg-primary p">
      <h3>Say Something...</h3>
  </div><form class="form my-1" onSubmit={e=>{
    e.preventDefault();
    addrequest({'text':text});
    console.log(text)
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

CreateRequest.propTypes = {
    addrequest:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
}


const mapStateToProps=state=>({
    auth:state.auth,
     
})
export default connect (mapStateToProps,{addrequest})(CreateRequest)