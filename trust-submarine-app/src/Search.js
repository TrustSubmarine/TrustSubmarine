import './Search.css';

function Search() {
    return <div class='vertical-flow-flex'>
        <LargeLogo/>
        <SearchForm/>
        <RedirectButton/>
    </div>
}

function LargeLogo() {
    return <img src='./TrustSubmarine Full Icon.png' class='medium-image'/>
}

function SearchForm() {
    return <form>
        <SearchBar/>
        <SearchToggle/>
    </form>
}

function SearchBar() {
    return <div id="searchbar">
        <div id="searchinput-container">
            <label for="searchinput" class="invisible">Paste URL here</label>
            <input type="text" name="query" id="searchinput" placeholder="Paste URL here"/>
        </div>
        <div id="searchicon-container">
            <img src="./FlatIcons Magnifying Glass C2E3FF.png" id="searchicon-magglass"/>
        </div>
    </div>
}

function SearchToggle() {

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