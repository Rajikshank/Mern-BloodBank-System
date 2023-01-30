import { Button, notification,Badge  } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import moment from 'moment';
 

function Notification({auth:{user}}) {
  const notifications=user.notifications;

  const openNotification = () => {

    if(notifications.length>0)
   { notifications.forEach(element => {

      notification.open({
        message: moment(element.date).fromNow(),
        description:element.msg 
                    ,
        onClick: () => {
          console.log('Notification Clicked!');
        },
      });
      
    });
    }
    else  {

      notification.open({
        message: ' No Notifications yet',
        description:""      ,
        onClick: () => {
          console.log('Notification Clicked!');
        },
      });

    }
  };


  return (
  <Badge count={notifications.length}>
   <Button type="primary" onClick={openNotification} style={{background:'red'}}>
  <i class="fa-solid fa-bell"></i>
  </Button>
  </Badge>
  )
}



Notification.propTypes = {
  
    auth:PropTypes.object.isRequired,
    
}


const mapStateToProps=state=>({
    auth:state.auth,
   
})

export default connect(mapStateToProps,{})(Notification)