import React, {useEffect, createContext, useReducer, useContext} from 'react';
import NavBar from './components/Navbar' ;
import './App.css';
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom';
import Home from './components/screens/Home';
import SignIn from './components/screens/Signin';
import SignUp from './components/screens/SignUp';
import CreatePost from './components/screens/CreatePost';
import {reducer, initialState} from './reducers/userReducer'
export const userContext = createContext();
  
const Routing = ()=>{
  const history = useHistory();
  const {state, dispatch} = useContext(userContext) 

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    if(user){
      dispatch({type:"USER", payload: user})
      history.push('/')
    }
    else{
      history.push('/signin')
    }
      }, [])
  return(
    <Switch>
    <Route exact path="/">
        <Home/>
        </Route>
        <Route path="/SignIn">

        <SignIn/>
        </Route>
        <Route path="/SignUp">
        <SignUp/>
        </Route>
        <Route path="/Create">
        <CreatePost/>
        </Route>
    </Switch>
    
  )
}




function App() {
  const [state, dispatch]  = useReducer(reducer, initialState)
  return (
    <userContext.Provider value = {{state, dispatch}}>
     <BrowserRouter>
        <NavBar />
        <Routing/>
    </BrowserRouter>
    </userContext.Provider>
   
   
  );
}

export default App;
