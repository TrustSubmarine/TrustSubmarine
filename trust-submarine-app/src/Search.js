import './Search.css';
import {useState} from 'react';

function Search() {
    return <div class='vertical-flow-flex'>
        <LargeLogo/>
        <SearchForm/>
    </div>
}

function LargeLogo() {
    return <img src='./TrustSubmarine Full Icon.png' class='medium-image'/>
}

function SearchForm() {
    return <div>
        <SearchBar/>
        <SearchToggle/>
    </div>
}

function SearchBar() {

    var [searchText, setSearchText] = useState("");

    const redirectionHandler = (event) => {
        event.preventDefault();
        redirectToSubpage("results?query=" + encodeURIComponent(searchText));
    }

    return <form onSubmit={redirectionHandler}>
        <div id="searchbar">
            <div id="searchinput-container">
                <label for="searchinput" class="invisible">Paste URL here</label>
                <input type="text" name="query" id="searchinput" placeholder="Paste URL here" 
                    onChange={(event) => setSearchText(event.target.value)}/>

            </div>
            <button id="searchbutton" onClick={redirectionHandler}>
                <div id="searchicon-container">
                    <img src="./FlatIcons Magnifying Glass C2E3FF.png" id="searchicon-magglass"/>
                </div>
            </button>
        </div>
    </form>
}

function redirectToSubpage(string) {
    window.location.href = '/' + string;
}

function SearchToggle() {

}

export default Search;