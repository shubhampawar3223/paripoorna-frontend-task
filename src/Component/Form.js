import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './Form.css';

export default function Form(props){
    const [loading,setLoading] = useState(0);
    const [image,setImage] = useState(null);
    const [name,setName] = useState(null);
    const [_url,setUrl] = useState(null);
    const [code,setCode] =  useState("+91");
    const [mobile,setMobile] = useState(null);
    const [email,setEmail] = useState(null);
    const [jobType,setType] = useState(null);
    const [dob,setDob] = useState(null);
    const [location,setLocation] = useState(null);     
    
    console.log("Hie")   
    useEffect(()=>{
        
       if(props.update === 1){ 
         let i = props.elementForUpdate;
           
            setName(()=>props.members[i].fullName);
            setUrl(()=>props.members[i].picUrl);
            setCode(()=>props.members[i].countryCode);
            setMobile(()=>props.members[i].mobileNo);
            setEmail(()=>props.members[i].email);
            setType(()=>props.members[i].jobType);
            setDob(()=>props.members[i].dob);
            setLocation(()=>props.members[i].location);                   
       } 
    },[props.update,props.members])
    
    const getData=()=>{
      return {  
        fullName:name,
        picUrl:_url,
        countryCode:code,
        mobileNo:mobile,
        jobType:jobType,
        email:email,
        dob:dob,
        location:location 
      }
    }
    
    const clearData = ()=>{
        setName(()=>"");
        setImage(()=>"");
        setUrl(()=>"");
        setCode(()=>"");
        setMobile(()=>"");
        setEmail(()=>"");
        setType(()=>"");
        setDob(()=>"");
        setLocation(()=>"");        
    }
    
    //add() is used call the required API and add new user.
    const add= async(e)=>{
         e.preventDefault();
         setLoading(1); 
        let postData =getData();
        const url= "https://task-paripoorna-back.herokuapp.com/api/addMember";
        let resp= await fetch(url,{
            method:"POST",
            mode:"cors",
            headers: {
                'Content-Type': 'application/json'
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(postData)    
        });
        
        if(resp.status===200){
           alert("User successfully added.")
           let resp1= await axios.get("https://task-paripoorna-back.herokuapp.com/api/currentId")      
           postData.userId = resp1.data.cId;        
           clearData();
           props.setMembers((p)=>[...p,postData]);
         
        }
        else if(resp.status===400){
            resp = await resp.json();
             alert(resp.error)  
        }
        setLoading(0);
    } 
    
    //update() is used to call the api to and update the selected user.
    const update=async(e)=>{
        e.preventDefault();
        setLoading(1); 
        let postData =getData();
        const url= "https://task-paripoorna-back.herokuapp.com/api/update/"+ props.members[props.elementForUpdate].userId;
        let resp= await fetch(url,{
            method:"PUT",
            mode:"cors",
            headers: {
                'Content-Type': 'application/json'
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(postData)    
        });

        if(resp.status===200){
           alert("User successfully updated.")
           props.setUpdate(()=>0)
           let newData = props.members;
           let id = props.members[props.elementForUpdate].userId;
           postData.userId = id;
           newData[props.elementForUpdate] = postData;
           clearData();
           props.setMembers(()=>[...newData]);
                        
        }
        else if(resp.status===400){
            resp = await resp.json();
            alert(resp.error)  
        }
        setLoading(0);
    }
    
    //getUrl() function is used for storing image on cloud and getting it's url.
    const getUrl=(e)=>{
        const data = new FormData();
         data.append("file",e.target.files[0]);
        data.append('upload_preset','quick-rental')
        data.append('cloud_name','shubh8991')
        fetch('	https://api.cloudinary.com/v1_1/shubh8991/image/upload',{
            method: 'POST',
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(()=>data.secure_url);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    

    return(
        <div className="d-flex justify-content-center mt-5">
            
            <div className="form-element col-10  border border-dark">
            <span id="registerElement">Registration</span>
               <div className="mt-3 offset-1 col-10 ">
               <div className="row form-group">
                          <div className="row col-6 mt-3"> 
                           <div className="col-3 label-element" >  
                          <label>Fullname</label>
                          </div>
                          <div className="col-9">
                          <input className="form-control" value={name} onChange={(e)=>setName(()=>e.target.value)} type="text" placeholder="Enter Your Name"/>
                          </div>
                          </div>

                          <div className="row col-6 mt-3"> 
                           <div className="col-3 label-element" >  
                          <label>Pic. Url</label>
                          </div>
                          <div className="col-9">
                          <input className="form-control" type="file" accept=".png, .jpg, .gif, .jpeg" required onChange={getUrl}/>
                          
                          </div>
                          </div>
                    </div>  
                      
                      {
                       props.update?   
                      <div className="offset-6 d-flex justify-content-center mt-2">
                              <img src={_url} height="80px" width="100px"/>                              
                      </div>
                      :null
                       }

                    <div className="row form-group">   
                          <div className="row mt-3 col-6"> 
                           <div className="col-3 label-element" >  
                          <label>mobile</label>
                          </div>                          
                           <div className="col-3 label-element">   
                           <select class="custom-select" value={code} onChange={(e)=>setCode(()=>e.target.value)}>
                            <option selected value="+91">+91</option>
                            <option value="+44">+44</option>
                            <option value="+61">+61</option>
                           </select>
                          </div> 
                          <div className="col-6">  
                          <input className="form-control" value={mobile} onChange={(e)=>setMobile(()=>e.target.value)} type="text" placeholder="Mobile Number"/>
                          </div>    
                          </div>

                          <div className="row mt-3 col-6"> 
                           <div className="col-3 label-element" >  
                          <label>Email</label>
                          </div>
                          <div className="col-9">
                          <input className="form-control" type="email" value={email} onChange={(e)=>setEmail(()=>e.target.value)} placeholder="Enter Your Email"/>
                          </div>
                          </div>
                    </div> 

                    
                    <div className="row form-group mb-3">
                          <div className="row col-6 mt-3"> 
                           <div className="col-3 label-element" >  
                          <label>Job Type</label>
                          </div>
                          
                          <div className="col-9">
                          <select class="form-select " value={jobType} onChange={(e)=>setType(()=>e.target.value)}>
                            <option selected >Select Job Type</option>
                            <option value="FT">FT</option>
                            <option value="PT">PT</option>
                            <option value="Consultant">Consultant</option>
                           </select>
                          </div>
                          </div>

                          <div className="row col-6 mt-3"> 
                           <div className="col-3 label-element" >  
                          <label>DOB</label>
                          </div>
                          <div className="col-9">
                          <input className="form-control" value={dob} onChange={(e)=>setDob(()=>e.target.value)} type="date"/>
                          </div>
                          </div>
                    </div> 

                   <div>

                   <div className="row form-group mb-3">    
                   <div className="row col-6 "> 
                           <div className="col-3 label-element" >  
                          <label>Location</label>
                          </div>
                          
                          <div className="col-9">
                          <select class="form-select" value={location} onChange={(e)=>setLocation(e.target.value)}>
                            <option selected >Select Location</option>
                            <option value="Chennai">Chennai</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Banglore">Banglore</option>
                           </select>
                          </div>
                          </div>

                          <div className="row col-6 add-element">
                               <div className="col-5 add-button">
                               {
                               props.update?
                               <button className="btn btn-success btn-md form-control" onClick={update}>Update</button>     
                               :                                 
                               <button className="btn btn-danger btn-md form-control" onClick={add}>Add</button>   
                               }
                               </div>
                          </div>

                          {
              loading?
              <div className="d-flex mt-3 justify-content-center">
                  <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                <span class="sr-only">Loading...</span>
              </div>
              :null
          } 

                      </div>                        
                   </div> 
                    </div>    
               </div>              
        </div>
    )
}