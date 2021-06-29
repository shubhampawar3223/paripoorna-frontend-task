import React,{useState} from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default function Table(props) {
    const {
        buttonLabel,
        className
      } = props;
      const [imageIndex,setImageIndex] = useState(null);  
      const [modal, setModal] = useState(false);
    
      const toggle = () =>{
        setModal(!modal);
      } 
    
    const deleteMember=async(e,i)=>{
      let inp =window.confirm("Do you want to delete user of userId "+e.userId);
      if(inp===true){
      let newMembers = props.members;   
        newMembers.splice(i,1);
       props.setMembers(()=>[...newMembers])
      const url= "https://task-paripoorna-back.herokuapp.com/api/deleteMember/" + e.userId;
      let resp= await axios.delete(url);
      if(resp.status== 200)
          alert("user"+e.userId+" is deleted successfully.");        
      }
      
    }
    
    return(
        <div className="d-flex justify-content-center mt-3">
           <div className="form-element col-10  border border-dark">
           {
           props.members.length ===0 ?
            <h3 className="text-center ">No Data Yet...Please add users</h3>
           :  
           <table className="table">
        <thead className="thead-dark">
         <tr>
        <th scope="col" className="text-center">User Id</th>
        <th scope="col" className="text-center">Name</th>
        <th scope="col" className="text-center">Email</th>
        <th scope="col" className="text-center">Mobile</th>
        <th scope="col" className="text-center">DOB</th>
        <th scope="col" className="text-center">Job Type</th>
        <th scope="col" className="text-center">Actions</th>
        </tr>
       </thead>
       <tbody>

        {
            props.members.map((e,i)=>{
             return(
                <tr>
                <th scope="row" className="text-center">{e.userId}</th>
                <td className="text-center">{e.fullName}</td>
                <td className="text-center">{e.email}</td>
                <td className="text-center">{e.mobileNo}</td>
                <td className="text-center">{e.dob}</td>
                <td className="text-center">{e.jobType}</td>
                <td>
                <button className="btn btn-primary btn-sm m-1" onClick={()=>{toggle();setImageIndex(()=>props.members[i].picUrl);}}>pic </button>
                    
                <button className="btn btn-success btn-sm m-1" onClick={()=>{props.setUpdate(()=>1); props.setElementForUpdate(()=>i)}} >edit </button>
                
                <button className="btn btn-danger btn-sm m-1" onClick={()=>deleteMember(e,i)}>delete </button>
                </td>
                </tr>                  
             )                
            }) 
        }   
        
    
       </tbody>
       </table>    
      }
           </div>
           <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>User Pic</ModalHeader>
        <ModalBody className="d-flex justify-content-center">

            <img src={imageIndex} height="200px" width="230px"/>              
        </ModalBody>
        <ModalFooter>
          
        </ModalFooter>
      </Modal>
        </div>          
    )
}
