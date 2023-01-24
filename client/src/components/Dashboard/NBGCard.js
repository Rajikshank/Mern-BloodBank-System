import { EditOutlined, EllipsisOutlined, SettingOutlined,DownloadOutlined} from '@ant-design/icons';
import { Avatar, Card, Skeleton, Switch,button, Button,InputNumber, Col,Checkbox } from 'antd';
import { useState } from 'react';
import { update_NBG } from '../../actions/profile';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
const { Meta } = Card;



const NBGCARD = (props) => {
  const [edit,setEdit] =useState(false)
  const [param,setParam] =useState([])
  const plainOptions = ['A+', 'A-', 'B+','B-','AB+','AB-','O+','O-'];

console.log(edit)

const onChange = (checkedValues) => {
  console.log('changed', param);
   
  setParam(checkedValues)
 
};


 const onClick=()=>{
  setEdit(!edit)
  if(edit===true){
    console.log('changed', param);
    props.update_NBG(param)
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
      {edit && <Checkbox.Group options={plainOptions} defaultValue={['A+']} onChange={onChange}  style={{
          width: 450,
          marginTop: 16,background: '#f5f5f5'
        }}/> }
    
    </Col>
    </>
  );
};



NBGCARD.propTypes = {
  update_NBG:PropTypes.func.isRequired
}
export default connect (null,{update_NBG})(NBGCARD);