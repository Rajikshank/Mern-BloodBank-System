 
import React,{Fragment, useEffect} from 'react';
import './App.css';
import  Navbar  from './components/Navbar';
 import Register from './components/Register';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
 
import Login from './components/Login'
import DonorSignup from './components/DonorSignup'
import HospitalSignup from './components/HospitalSignup';
import {Provider} from 'react-redux';
import store from './store'
import Alert from './components/layout/Alert'
import { loadUser } from './actions/authdonor';
import setAuthToken from './utils/setAuthToken';
import Dashboard from './components/Dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import EditProfile from './components/EditProfile';
import Hospitals from './components/Dashboard/Hospitals';

if(localStorage.token){
  setAuthToken(localStorage.token)
}



function App() {

  useEffect(()=>{
 
    store.dispatch(loadUser())
  },[]);

  return (
    <Provider store={store}>
    <Router>
    <Fragment>
       <Navbar/> 
       <Routes> 
      <Route  path='/' element={<Register/>}/>
      </Routes>
      <section className='container'>
        <Alert/>
    <Routes>
    <Route path='/Donorsignup' element={<DonorSignup/>}/>
    <Route path='/Hospitalsignup' element={<HospitalSignup/>}/>
    
    <Route path='/login' element={<Login/>}/>
    <Route path="/Dashboard" element={<PrivateRoute component={Dashboard} />} />
    <Route path="/Hospitals" element={<PrivateRoute component={Hospitals} />} />
    <Route path="/edit-profile" element={<PrivateRoute component={EditProfile} />} />
    </Routes>

      </section>
    </Fragment>
  </Router>
  </Provider>
  );
}

export default App;
