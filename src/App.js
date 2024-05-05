import './App.css';
import React, {useState,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faTrash } from '@fortawesome/free-solid-svg-icons';

function Checkbox(props){
  return(
    <input
        type='checkbox'
        className='checkbox'
        onChange={e=>{
          if (e.target.checked){
            props.completedlist(props.item)
            props.removeincomplete(props.index)
            
          }
        }}
        
        />
  )
}
function ListCompeted(props){
  return(
    <div className='tasks'>

      <span className='taskinst  completed'>
        {props.item}

      </span> 
    </div>
  )
}

function Listtodo(props){
  return(
    <div className='tasks'>
      <Checkbox 
      completedlist={props.completedlist}
      removeincomplete={props.removeincomplete}
      item={props.item}
      index={props.index}
      incomplete={props.incomplete}
      removecomplete={props.removecomplete}
      />
      <span className='taskinst'>
        {props.item}

      </span> 
      <button >
        <FontAwesomeIcon icon={faTrash} className='deleteicon' onClick={e=>{
          props.removeincomplete(props.index)
        }}/>
        </button>
    </div>
    )
}

function App() {
  const [value,setvalue]=useState('');
  const [valueList,setvalueList]=useState([]);
  const [completed,setCompleted]=useState([]);
  useEffect(() => {
    const storedArray = localStorage.getItem('valuelist');
    if (storedArray) {
      setvalueList(JSON.parse(storedArray));
    }
  }, []);


  function addtolist(value){
    if (value ===''){
      return
    }
    setvalueList((prevValueList) => {
      const updatedList = [...prevValueList, value];
      localStorage.setItem('valuelist', JSON.stringify(updatedList));
      return updatedList;
    });
    localStorage.setItem('valuelist', JSON.stringify(valueList));
  }
  function addtocompletedlist(value){
    setCompleted([...completed,value]);
    console.log('added to completed')
  }

  function removefromincompletelist(key){
    setvalueList((prevdata)=>{
      let tempList=[...valueList]
      tempList.splice(key,1)
      localStorage.setItem('valuelist', JSON.stringify(tempList));
      return tempList;
  });
    }

  function SpanCompleted(){
    if (completed.length>0){
    return(
      <div>
      <hr></hr>
      <span className='heading2'>Completed Tasks:</span>
      </div>
    )}
  }
  function SpaninCompleted(){
    if (valueList.length>0){
      return(
      <span className='heading2'>Incompleted Tasks:</span> 
      )
    }
    else{
      return(
        <div className='notask'>
          <span className='heading2'>No Tasks to do</span>
        </div>
        
      )
    }
  }
  return (
    <div className='container'>
      <div className='heading'>
        Todo app
      </div>

      <div className='addtask'>
          <input 
          type='text' 
          placeholder='Task name' 
          className='taskterm' 
          value={value}
          onChange={e=>setvalue(e.target.value)}
          />
          <button className='addbtn' 
          onClick={()=>{
            addtolist(value);
            setvalue('');
          }}>
            Add
            </button>
      </div>
      <SpaninCompleted/>
    {
      valueList.map((valueinst,ind)=>{
        return(
          <Listtodo 
          key={ind} 
          index={ind} 
          item={valueinst} 
          removeincomplete={removefromincompletelist} 
          completedlist={addtocompletedlist} 
          incomplete={addtolist}
          />
        )
      })
    }
    <SpanCompleted/>
    {
      completed.map((valueinst,ind)=>{
        return(
          <ListCompeted 
          item={valueinst} 
          />
        )
      })
    }
    </div>
  );
}

export default App;
