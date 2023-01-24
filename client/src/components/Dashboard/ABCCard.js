import { EditOutlined, EllipsisOutlined, SettingOutlined,DownloadOutlined} from '@ant-design/icons';
import { Avatar, Card, Skeleton, Switch,button, Button,InputNumber, Col  } from 'antd';
import { useState } from 'react';
import { update_ABC } from '../../actions/profile';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
const { Meta } = Card;



const ABCCard = (props) => {
  const [edit,setEdit] =useState(false)
  const [param,setParam] =useState(0)

console.log(edit)

const onChange = (value) => {
  console.log('changed', param);
   
  setParam(value)
//  update_NBG_ABC(value,props.path)
};


 const onClick=()=>{
  setEdit(!edit)
  if(edit===true){
    console.log('changed', param);
    props.update_ABC(param)
    setParam(0)
  }

 }

  return (
    <>

<Col>
      <Card 
        style={{
          width: 300,
          marginTop: 16,background: '#f5f5f5'
        }}
        actions={[
          <Button type="primary" shape="round" style={{background:'red'}}size='small' onClick={()=>onClick()} > {edit ? "Update" :"Edit"} </Button>,
          
        ]}
      >
        <Skeleton loading={false} avatar active>
          <Meta
            avatar={<i className={props.classname}></i>}
            title={<h4 style={{ fontSize: '18px' }}>{props.value}</h4>}
            description={props.name}
          />
        </Skeleton>
      </Card>
      {edit && <InputNumber style={{
          width: 300,
          marginTop: 16,background: '#f5f5f5'
        }}  defaultValue={0}  onChange={onChange} />}
    
    </Col>
    </>
  );
};



ABCCard.propTypes = {
  update_ABC:PropTypes.func.isRequired
}
export default connect (null,{update_ABC})(ABCCard);