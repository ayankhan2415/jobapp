import React, {useState,useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {userContext} from '../../App';
import M from 'materialize-css';

const Signin = () => {
      const {state, dispatch} = useContext(userContext)
      const history = useHistory();
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const postData = ()=>{

        

        fetch('/signin', {
          method: 'post',
          headers:{
            'Content-Type':'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
           
            email,
            password
          })
        }).then(res=>res.json())
          .then(data=>{             

              if(data.error){
                M.toast({html: data.error, classes:"#f44336 red"})


              }else{
                localStorage.setItem('jwt', data.token)
                localStorage.setItem('user',JSON.stringify(data.user))
                dispatch({type:'USER', pauload:data.user})
                M.toast({html:'singned In sucessfully', classes:'green'})
                history.push('/')
              }
          }).catch(err=>{
            console.log(err);
          })


      }
  return (
    <div className='mycard'  >
    <div className="card auth-card">
        <h2 className='interstellus'>
       Interstellus
        </h2>
        <input type='text'placeholder='Email'
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />
        <input type='text'placeholder='Password'  
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />
        <button className="btn waves-effect waves-light"onClick={()=>postData()}>
          Login
        </button>
        <h5>
        <Link to='/SignUp'>Don't have an account?</Link>
      </h5>
        
        
      </div>
      </div>
  );
};

export default Signin;