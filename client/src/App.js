 
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
import Postview from './components/post/Postview';
import EditProfile2 from './components/EditProfile2';
import Donors from './components/Dashboard/Donors';
import Requests from './components/request/Requests';
import Requestview from './components/request/Requestview';
import DonationEntry from './components/Dashboard/DonationEntry';
import DonHistory from './components/Profile/DonHistory';
import About from './components/About';


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
    <Route path='/About' element={<About/>}/>
    <Route path="/Dashboard" element={<PrivateRoute component={Dashboard} />} />
    <Route path="/Hospitals" element={<PrivateRoute component={Hospitals} />} />
    <Route path="/Requests" element={<PrivateRoute component={Requests} />} />
    <Route path="/Donors" element={<PrivateRoute component={Donors} />} />
    <Route path="/Post/:id" element={<PrivateRoute component={Postview} />} />
    <Route path="/Request/:id" element={<PrivateRoute component={Requestview} />} />
    <Route path="/history/" element={<PrivateRoute component={DonHistory} />} />
    <Route path="/add-history/" element={<PrivateRoute component={DonationEntry} />} />
    <Route path="/edit-hospital" element={<PrivateRoute component={EditProfile} />} />
    <Route path="/edit-donor" element={<PrivateRoute component={EditProfile2} />} />
    </Routes>

      </section>
    </Fragment>
  </Router>
  </Provider>
  );
}

export default App;
