import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Form from './Form';
import Table from './Table';

export default function Dashboard(){
    const [loading,setLoading] = useState(0);
    const [members,setMembers] = useState([]);
    const [update,setUpdate] = useState(0);
    const [elementForUpdate,setElementForUpdate] = useState(null);
    useEffect(async() =>{
        setLoading(1);
       const url="https://task-paripoorna-back.herokuapp.com/api/showList";
       let resp = await axios.get(url);
       if(resp.status==200){
        setMembers(()=>[...resp.data.result]);   
       }          
       setLoading(0); 
    }, [])
    return(
        <div className="container  ">
          {
          loading?
              <div className="d-flex mt-3 justify-content-center">
                  <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                <span class="sr-only">Loading...</span>
              </div>
              :
              <>
              <Form members={members}
                    setMembers = {setMembers}
                    update= {update}
                    setUpdate = {setUpdate}
                    elementForUpdate= {elementForUpdate}
              />
              <Table members={members}
                     setMembers = {setMembers}
                     setUpdate = {setUpdate}
                     setElementForUpdate = {setElementForUpdate}
              />
              </>
          }   
            
        </div>
    )
}