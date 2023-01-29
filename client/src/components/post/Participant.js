import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Avatar, List } from 'antd';

const Participant = (props) => {
  return (
    <>
  



<List
itemLayout="horizontal"
dataSource={props.Participant}
renderItem={(item) => (
  <List.Item>
    <List.Item.Meta
      avatar={<Avatar src={item.avatar} />}
      title={item.name}
      description="Ant Design, a design language for background applications, is refined by Ant UED Team"
    />
  </List.Item>
)}
/>
         </> 
  )
}

Participant.propTypes = {
  
    Participant:PropTypes.array.isRequired,
     
}


const mapStateToProps=state=>(
    {
        auth:state.auth
    }
)

export default connect (mapStateToProps,{}) (Participant)