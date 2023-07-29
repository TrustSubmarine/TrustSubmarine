import {Link} from 'react-router-dom';

import './Header.css'

function Header() {
    return <div className='horizontalflow-small-flex align-start align-items-end' id='header'>
        <Link to="../about">About</Link>
    </div>
}

export default Header;
