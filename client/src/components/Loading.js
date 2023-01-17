import React,{Fragment} from 'react';
 

 

const Loading= ()=>{
   
    <Fragment>
        <img src={require('./Loading.gif')}
        style ={{Width :'200px' , margin:'auto',display:'block'}}
        alt='Loading...'/>
         {console.log('loading run ')}
    </Fragment>
}


export default Loading