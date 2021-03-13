import React, { useState, useEffect, useContext } from 'react'
import { FirebaseContext } from '../Firebase'
import {InputSwitch} from 'primereact/inputswitch';

const Logout = () => {

    const firebase = useContext(FirebaseContext);

    const [checked, setChecked] = useState(true);

    useEffect(() => {
        if (!checked) {
            //console.log("Déconnexion");
            firebase.signoutUser();
        }

    }, [checked, firebase]);

    const handleChange = event => {
        setChecked(event.value);
    }

    return (
        <div className="logoutContainer">
                <InputSwitch 
                onChange={handleChange}
                value={checked}
                checked={checked}
                />
        </div>
    )
}

export default Logout
