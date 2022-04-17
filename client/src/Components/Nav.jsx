import React, { Component } from 'react'
import { Link } from 'react-router-dom';

// CUIDADOOOO. SI O SI CLASS COMPONENT! SE ROMPEN LOS TEST EN CASO CONTRARIO!!
class Nav extends Component {

    render() {
        return (
            <div >
                {/* Debería renderizar dos <Link to="" />. El primero que vaya a "/", y el segundo a "/house/create" */}
                
                {/* Debería tener un Link con el texto "Home" que cambie la ruta hacia "/" */}
                <Link to="/">Home</Link>
                
                {/* Debería tener un segundo Link, con texto "Create House" y que cambie la ruta hacia */}
                <Link to="/videogames/create">Create Videogame</Link>
            </div>
        );
    };
};

export default Nav;