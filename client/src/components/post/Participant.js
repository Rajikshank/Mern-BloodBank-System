import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


const Participant = ({auth,postId,Participant:{name,avatar}}) => {
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
          </div>
  )
}

Participant.propTypes = {
    postId:PropTypes.string.isRequired,
    Participant:PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired
}


const mapStateToProps=state=>(
    {
        auth:state.auth
    }
)

export default connect (mapStateToProps,{}) (Participant)