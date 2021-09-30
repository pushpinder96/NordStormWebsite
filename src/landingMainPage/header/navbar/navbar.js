import React from 'react';
import '../navbar/navbar.css'
import {Link} from 'react-router-dom';

const navbar =(props)=>{
    
    return(
        <div className='NavbarDiv'  style={props.Styles}>
            
            <ul >
                <li>
                    <Link exact to='/'
                    style={{textDecoration: 'none',color:'inherit'}}>
                        Home
                        </Link>
                        </li>
                <li>
                    <Link to='/casual' onClick={props.register} style={{textDecoration: 'none',color:'inherit'}}>
                        Casual
                        </Link>
                        </li>
                <li>
                    <Link to='/sport'
                    style={{textDecoration: 'none',color:'inherit'}}>
                        Sport
                        </Link>
                        </li>
            
                <li>
                    <Link to='/contact' style={{textDecoration: 'none',color:'inherit'}}>
                  Contact
                    </Link>
                    </li>
                    
             </ul>
        </div>
    );
}
export default navbar;