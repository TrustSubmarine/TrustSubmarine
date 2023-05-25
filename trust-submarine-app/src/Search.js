import './Search.css';

function Search() {
    return <div>
        <LargeLogo/>
        <Searchbar/>
        <RedirectButton/>
    </div>
}

function LargeLogo() {
    return <p>Placeholder Large Logo</p>
}

function Searchbar() {
    return <p>Placeholder Search Bar</p>
}

function RedirectButton() {
    const handleRedirect = () => {
        window.location.href = '/subpage';
    };

    return (
        <button onClick={handleRedirect}>Redirect to Subpage</button>
    );
}

export default Search;