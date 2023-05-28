import {Link} from 'react-router-dom';

function Header() {
    return <div class='horizontalflow-small-flex align-start align-items-end'>
        <Link to="../about">About</Link>
        <Link to='../recents'>Recents</Link>
    </div>
}

export default Header;