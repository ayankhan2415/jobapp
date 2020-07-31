import React, {useState, useEffect, useContext} from 'react';
import {userContext} from '../../App';
const Home = () => {

      const [data, setData] = useState([]);
      const {state,dispatch} = useContext(userContext)

      useEffect(()=>{
        fetch('/allpost', {
          headers:{
            'Authorization': 'Bearer '+localStorage.getItem('jwt')
          }
        }).then(res=>res.json())
        .then(result=>{
          setData(result.posts)
        })


}, [])

const deletePost = (postid)=>{
  fetch(`/deletepost/${postid}`,{
      method:"delete",
      headers:{
          Authorization:"Bearer "+localStorage.getItem("jwt")
      }
  }).then(res=>res.json())
  .then(result=>{
      console.log(result)
      
  })
}

  return (
    
 
    
    <div className='home'>

              {
                data.map((item) => {
                  return(
                    <div className="card home-card" key={item._id}>
                    <h5 style={{padding:"5px"}}>
                   <i className="material-icons" style={{
                        float:"right"
                    }} 
                    onClick={()=>deletePost(item._id)}
                    >delete</i>

                    </h5>
                    <div className="card-image">
                        <img src={item.photo}/>
                    </div>
                    <div className="card-content">
                    
                        <h6>{item.title}</h6>
                        <p>{item.body}</p>
                        
                        
                        
                    </div>
                </div> 
                  )
                })
              }
    
    </div>
        
        
     



  );
};

export default Home;




                          