import { EditOutlined, EllipsisOutlined, SettingOutlined,DownloadOutlined} from '@ant-design/icons';
import { Avatar, Card, Skeleton, Switch,button, Button,InputNumber, Col  } from 'antd';
import { useState } from 'react';
const { Meta } = Card;


const Cardview = (props) => {
  const [edit,setEdit] =useState(false)
console.log(edit)

const onChange = (value) => {
  console.log('changed', value);
};

  return (
    <>

<Col>
      <Card 
        style={{
          width: 300,
          marginTop: 16,background: '#f5f5f5'
        }}
        actions={[
          <Button type="primary" shape="round" size='large' onClick={()=>setEdit(!edit)} > {edit ? "Update" :"Edit"} </Button>,
          
        ]}
      >
        <Skeleton loading={false} avatar active>
          <Meta
            avatar={<i className={props.classname}></i>}
            title={props.name}
            description="This is the description"
          />
        </Skeleton>
      </Card>
      {edit && <InputNumber style={{
          width: 300,
          marginTop: 16,background: '#f5f5f5'
        }} min={1} max={10} defaultValue={3}  onChange={onChange} />}
    
    </Col>
    </>
  );
};
export default Cardview;