import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import M from 'materialize-css';

const SignUp = () => {
      const history = useHistory();
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const postData = ()=>{

        

        fetch('/signup', {
          method: 'post',
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify({
            name,
            email,
            password
          })
        }).then(res=>res.json())
          .then(data=>{             

              if(data.error){
                M.toast({html: data.error, classes:"#f44336 red"})


              }else{
                if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
                  M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
                  return
              }
                M.toast({html:data.message, classes:'green'})
                history.push('/signin')
              }
          }).catch((err) => {
            console.log(err)
          });


      }

  return (
    <div className='mycard'  >
    <div className="card auth-card">
        <h2 className='interstellus'>
       Interstellus
        </h2>
        <input type='text'placeholder='Name' 
        value={name}
        onChange={(e)=>setName(e.target.value)}
        />
        <input type='text'placeholder='Email'
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />
        <input type='text'placeholder='Password'  
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />
        <button className="btn waves-effect waves-light" onClick={()=>postData()}>
          SignUp
        </button>
        <h5>
          <Link to='/SignIn'>Already have account?</Link>
        </h5>
        
        
      </div>
      </div>
  );
};

export default SignUp;