import {Link} from 'react-router-dom';

function Header() {
    return <div className='horizontalflow-small-flex align-start align-items-end' id='header'>
        <Link to="../about">About</Link>
        <Link to='../recents'>Recents</Link>
    </div>
}

export default Header;