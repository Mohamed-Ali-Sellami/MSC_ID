import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';

const GestionUser = () => {
    const [allusers, setAllUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const [upuser, setupuser] = useState({
        name: "",
        email: "",
        mobile: "",
    });

    // Récupérer les utilisateurs depuis la base de données
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5900/user/all'); // Endpoint correct
                setAllUsers(response.data);
            } catch (error) {
                console.error("Erreur lors du chargement des utilisateurs :", error);
            }
        };

        fetchUsers();
    }, []);

    const handleUpdateChange = (field, value) => {
        setupuser((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleUpdateSubmit = async (userId) => {
        if (!upuser.name || !upuser.email || !upuser.mobile) {
            alert("Tous les champs doivent être remplis !");
            return;
        }

        try {
            const response = await axios.put(`http://localhost:5900/user/${userId}`, upuser); // Endpoint correct
            if (response.status === 200) {
                setAllUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user._id === userId ? { ...user, ...upuser } : user
                    )
                );
                setEditingUserId(null);
                setupuser({ name: "", email: "", mobile: "" });
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            const response = await axios.delete(`http://localhost:5900/user/${userId}`); // Endpoint correct
            if (response.status === 200) {
                setAllUsers((prevUsers) =>
                    prevUsers.filter((user) => user._id !== userId)
                );
            }
        } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur :", error);
        }
    };

    return (
        <div className="box-gestionuserdash">
            <Sidebar />
            <h1>Gestion des Clients</h1>
            <div className="bodygestionuserdash">
                <table>
                    <thead className="tetetabledash">
                        <tr>
                            <th>Utilisateur</th>
                            <th>Email</th>
                            <th>Téléphone Mobile</th>
                            <th>Paramètres</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allusers.map((data) => (
                            <tr key={data._id}>
                                <td data-label="Utilisateur">{data.name}</td>
                                <td data-label="Email">{data.email}</td>
                                <td data-label="Téléphone Mobile">{data.mobile}</td>
                                <td data-label="Paramètres">
                                    <div className="settingsadmindash">
                                        <button
                                            className="deletebtndash"
                                            onClick={() => handleDeleteUser(data._id)}
                                        >
                                            Supprimer
                                        </button>
                                        <button
                                            className="updatebtndash"
                                            onClick={() => {
                                                setEditingUserId(data._id);
                                                setupuser({
                                                    name: data.name || "",
                                                    email: data.email || "",
                                                    mobile: data.mobile || "",
                                                });
                                            }}
                                        >
                                            Modifier
                                        </button>
                                    </div>
                                    {editingUserId === data._id && (
                                        <div className="updatecarsettingsdash">
                                            <p>Nom</p>
                                            <input
                                                type="text"
                                                value={upuser.name}
                                                placeholder="Nom"
                                                onChange={(e) =>
                                                    handleUpdateChange("name", e.target.value)
                                                }
                                            />
                                            <p>Email</p>
                                            <input
                                                type="text"
                                                value={upuser.email}
                                                placeholder="Email"
                                                onChange={(e) =>
                                                    handleUpdateChange("email", e.target.value)
                                                }
                                            />
                                            <p>Téléphone Mobile</p>
                                            <input
                                                type="text"
                                                value={upuser.mobile}
                                                placeholder="Téléphone Mobile"
                                                onChange={(e) =>
                                                    handleUpdateChange("mobile", e.target.value)
                                                }
                                            />
                                            <button
                                                className="btn-up-okdash"
                                                onClick={() => handleUpdateSubmit(data._id)}
                                            >
                                                OK
                                            </button>
                                        </div>
                                    )}
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
