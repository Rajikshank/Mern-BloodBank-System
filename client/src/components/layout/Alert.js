import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import  {Alert as MyAlert } from 'antd';

const Alert = ({alerts}) => alerts!==null  && alerts.length>0 && alerts.map(alert=>
    <div key={alert.id}  >
    <MyAlert message={alert.msg}  type={alert.alertType} showIcon />;</div>
 );
  

Alert.propTypes = {
    alerts:PropTypes.array.isRequired
}

const mapState=state=>({
    alerts:state.alert
})
export default connect(mapState)(Alert);