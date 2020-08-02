import React,{useState} from 'react';
import Search from './components/Search.js';
import axios from 'axios';
import Results from './components/Results';
import Popup from './components/Popup.js';
function App(){
  const [state,setState]=useState({
    s:"",
    p:"",
    results:[],
    selected:{}
  });  
  const apiurl="https://www.omdbapi.com/?apikey=83b255de";
  const search=(e)=>{
    if(e.key==="Enter"){
      axios(apiurl+"&s="+state.s).then(({data})=>{
        let results =data.Search;
        setState(prevState=>{
          return {...prevState,results:results}
        })
        setState(prevState=>{
          let s=state.s
          return {...prevState,p:s}
        })
      });
    }
  }
  const handleInput=(e)=>{
    let s=e.target.value;
    setState(prevState=>{
      return {...prevState,s: s}
    })
  }
  const openPopup=id=>{
    axios(apiurl+"&i="+id).then(({data})=>{
      let result=data;
      console.log(result);
      setState(prevState=>{
        return {...prevState,selected:result}
      });
    });
  }
  const closePopup=()=>{
    setState(prevState=>{
      return {...prevState,selected:{}}
    });
  }
  return (
    <div className="App">
      <header>
        <h1>Movie Portal</h1>
      </header>
      <main>
         <Search handleInput={handleInput} search={search}/>
         {state.results?<Results results={state.results} openPopup={openPopup}/>:
         <div>
         <h1 className="fex">No results found for {state.p}</h1>
         <h2 className="dex">Note: Press Enter everytime you want to search </h2>
         </div>
       }
         {(typeof state.selected.Title!="undefined") ? <Popup selected={state.selected} closePopup=
          {closePopup}/> : false}
      </main>
    </div>
  );
}

export default App;
