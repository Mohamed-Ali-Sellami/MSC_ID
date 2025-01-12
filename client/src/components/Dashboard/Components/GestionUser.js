import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { deleteuser, updateuser } from '../../../JS/userSlice/userSlice';
// import { useSelector } from 'react-redux';

const GestionUser = () => {
    
    const dispatch = useDispatch();
    const [showthird, setshowthird] = useState(false);

    const allusers = useSelector((store) => store.client?.client);
    console.log("allusers",allusers)

    const [upuser, setupuser] = useState({
        name:"" ,
        email:"",

            })
    return (
        <div>
            <Sidebar />
        <div className="box-gestionuserdash">
            
            <h1>Gestion des Clients</h1>
            <div className='bodygestionuserdash'>
                <table>
                    <thead className='tetetable'>
                        <tr>
                            <th>Users</th>
                            <th>Mail</th>
                            <th>Téléphone Mobile</th>
                            <th>Settings</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allusers?.map((data) => (
                            <tr >
                                <td data-label="Utilisateur">{data?.name}</td>
                                <td data-label="email">{data?.email}</td>
                                <td data-label="Téléphone Mobile">{data?.mobile}</td>
                                <td data-label="settings">

                    <div className='settingsadmin'>
                    <button className='deletebtn' onClick={() => (dispatch(deleteuser(data?._id)))}> Delete</button>


                    <button className='updatebtn' onClick={()=> setshowthird(!showthird)}> Update</button>
                    </div>

                    {showthird? 
                    (<> 
                    <div className='updatecarsettings'>
                     <p>name</p><input type="text" placeholder={data.name} onChange={(e)=>setupuser({name:e.target.value})}/> 
                     <p>email</p><input type="text" placeholder={data.email} onChange={(e)=>setupuser({email:e.target.value})}/> 
                     <p>Telephone Mobile</p><input type="text" placeholder={data.mobile} onChange={(e)=>setupuser({mobile:e.target.value})}/> 
                     <p>Company</p><input type="text" placeholder={data.company} onChange={(e)=>setupuser({company:e.target.value})}/> 
                     </div> 
                     <button className="btn-up-ok" onClick={()=>dispatch(updateuser({id:data._id,upuser:upuser}))}>ok</button>
                     </>):null}
                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    );
};

export default GestionUser;
