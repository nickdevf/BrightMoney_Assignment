import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

function Navbar()
{
    return (
        <nav className='navbar'>
            <ul>
                <li><img src="/images/bright.png" alt="" className="logo" /></li>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/billing_cycles'>Billing Cycle(s)</Link></li>
                <li><Link to='/current_bill'>Current Outstanding Bills</Link></li>
            </ul> 
        </nav>
    );
}

export default Navbar;