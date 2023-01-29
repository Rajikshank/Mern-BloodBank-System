import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
 
import {   Navigate, useMatch, useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'
import { Input,DatePicker } from 'antd';
import { update_History } from '../../actions/profile';

export const DonationEntry= ({ auth:{user},profile:{profile,loading},update_History})  => {

 


  const [formData,setFormdata]=useState({
    ID:'', 
    location:'',
    Date:''
  });
 
 
 
 const {ID,location,Date}=formData;

 

 
const onChange=e=>setFormdata({...formData,[e.target.name]:e.target.value} )

const onSubmit=e=>{
  e.preventDefault()
  update_History(formData)
  console.log('formdata',formData)
 
}

  return (
    <div> 
    <section className="container">
    <h3 className=' text-primary'><i className="fas fa-user"></i> Add Blood Donotion Record</h3>
      <form className="form"  onSubmit={e=>onSubmit(e)}>

        
        <div className="form-group">
          <Input type="text" placeholder="ID" name="ID" required value={ID} onChange={e=>onChange(e)}/>
        </div>
         
    
        <div className="form-group">
        <DatePicker onChange={ (date, dateString) => {console.log(date.$d.toLocaleDateString()); setFormdata({...formData,Date:date.$d.toLocaleDateString(),Time:date.$d.toLocaleTimeString()} )}} />
        </div>

        <div className="form-group">
          <Input type="text" placeholder="location" name="location" value={location}  onChange={e=>onChange(e)}/>
           
        </div>

        <input type="submit" className="button-9" value="Add Entry" />
     
         
      </form>
       
    </section>
    </div>
  )
}

DonationEntry.prototype={
 auth:PropTypes.object.isRequired,
  profile:PropTypes.object.isRequired,
  update_History:PropTypes.func.isRequired
  
}

const mapStateToProps=state=>({
  auth:state.auth,
  profile:state.profile
})
 
export default connect (mapStateToProps,{update_History})( DonationEntry)