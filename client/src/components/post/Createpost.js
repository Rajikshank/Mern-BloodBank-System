import React,{useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { addpost } from '../../actions/post'


const Createpost = ({addpost}) => {
    const [text,setText]=useState('')

  return   <><div class="bg-primary p">
      <h3>Say Something...</h3>
  </div><form class="form my-1" onSubmit={e=>{
    e.preventDefault();
    addpost({text});
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
    addpost:PropTypes.func.isRequired
}

export default connect (null,{addpost})(Createpost)