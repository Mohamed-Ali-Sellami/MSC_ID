import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import { deleteclient, getclient } from '../../../JS/clientSlice';
import { updateuser } from '../../../JS/userSlice/userSlice';
import Navbardash from './Navbardash';

const GestionUser = () => {
    const dispatch = useDispatch();
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchLetter, setSearchLetter] = useState("");
    const allUsers = useSelector((store) => store.client?.client);

    useEffect(() => {
        dispatch(getclient());
    }, [dispatch]);

    const [updatedUser, setUpdatedUser] = useState({
        name: "",
        email: "",
        mobile: "",
        company: "",
    });

    const handleUpdateClick = (user) => {
        setShowUpdateForm(true);
        setSelectedUser(user);
        setUpdatedUser({
            name: user?.name || "",
            email: user?.email || "",
            mobile: user?.mobile || "",
            company: user?.company || "",
        });
    };

    const handleDelete = (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
            dispatch(deleteclient(id)).then(() => {
                dispatch(getclient());
            });
        }
    };

    const handleUpdateSubmit = () => {
        if (selectedUser) {
            dispatch(updateuser({ id: selectedUser._id, updatedData: updatedUser })).then(() => {
                setShowUpdateForm(false);
                dispatch(getclient());
            });
        }
    };

    const filteredUsers = allUsers?.filter(user => 
        searchLetter === "" || user?.name?.toLowerCase().startsWith(searchLetter.toLowerCase())
    );

    return (
        <div>
            <Navbardash />
            <div className="box-gestionuserdash">
                <h1>Gestion des Clients</h1>
                
                <input 
                    type="text" 
                    placeholder="Rechercher par première lettre..." 
                    value={searchLetter} 
                    onChange={(e) => setSearchLetter(e.target.value)}
                />

                {showUpdateForm && selectedUser && (
                    <div className="updatecarsettings">
                        <h2>Modifier l'utilisateur</h2>
                        <label>Nom :</label>
                        <input
                            type="text"
                            value={updatedUser.name}
                            onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
                        />

                        <label>Email :</label>
                        <input
                            type="email"
                            value={updatedUser.email}
                            onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
                        />

                        <label>Téléphone Mobile :</label>
                        <input
                            type="text"
                            value={updatedUser.mobile}
                            onChange={(e) => setUpdatedUser({ ...updatedUser, mobile: e.target.value })}
                        />

                        <label>Entreprise :</label>
                        <input
                            type="text"
                            value={updatedUser.company}
                            onChange={(e) => setUpdatedUser({ ...updatedUser, company: e.target.value })}
                        />

                        <button className="btn-up-ok" onClick={handleUpdateSubmit}>Valider</button>
                        <button className="btn-cancel" onClick={() => setShowUpdateForm(false)}>Annuler</button>
                    </div>
                )}
            </div>
            <div className="bodygestionuserdash">
                <table>
                    <thead className="tetetable">
                        <tr>
                            <th>Utilisateur</th>
                            <th>Email</th>
                            <th>Téléphone Mobile</th>
                            <th>Entreprise</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers?.map((user) => (
                            <tr key={user?._id}>
                                <td data-label="Utilisateur">{user?.name} {user?.lastname}</td>
                                <td data-label="Email">{user?.email}</td>
                                <td data-label="Téléphone Mobile">{user?.mobile}</td>
                                <td data-label="Entreprise">{user?.company}</td>
                                <td data-label="Actions">
                                    <div className="settingsadmin">
                                        <button className="deletebtn" onClick={() => handleDelete(user?._id)}>Delete</button>
                                        <button className="updatebtn" onClick={() => handleUpdateClick(user)}>Modifier</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GestionUser;
