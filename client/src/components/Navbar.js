import React, {useContext} from 'react'
import { Link } from 'react-router-dom';
import {userContext} from '../App';
const NavBar = ()=>{
      const {state, dispatch} = useContext(userContext);
      const renderList = ()=>{
        if(state){
          return [
           
           <li key="1"><Link to="/create">Create Post</Link></li>,
           <li  key="2">
            <button className="btn #c62828 red darken-3"
           onClick={()=>{
             localStorage.clear()
             dispatch({type:"CLEAR"})
             history.push('/signin')
           }}
           >
               Logout
           </button>
           </li>
        
           
          ]
      }else{
          return[
            <li><Link to="/SignIn">Login</Link></li>,
            <li><Link to="/SignUp">SignUp</Link></li>
         
          ]
        }
      }
    return(
      <nav>
      <div className="nav-wrapper white">
        <Link to={state?'/':'/SignIn'} className="brand-logo left">Interstellus</Link>
        <ul id="nav-mobile" className="right">
         
          {renderList()}
        </ul>
      </div>
    </nav>
          
    )


}
export default NavBar;