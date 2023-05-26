import './Search.css';
import {useState} from 'react';

const SearchType = {
    KEYWORDS: 'KW',
    URL: 'URL'
};

function Search() {
    return <div class='verticalflow-medium-flex fullxy'>
        <LargeLogo/>
        <SearchForm/>
    </div>
}

function LargeLogo() {
    return <img src='./TrustSubmarine Full Icon.png' class='medium-image'/>
}

function SearchForm() {
    var [searchType, setSearchType] = useState(SearchType.URL);

    return <div class='verticalflow-small-flex'>
        <SearchBar searchType={searchType}/>
        <SearchToggle searchState={[searchType, setSearchType]}/>
    </div>
}


/**
 * React functional component that renders the search bar, including the search button.
 * Also handles form submission behaviour.
 * @param props accepts searchType with type SearchType
 */
function SearchBar(props) {
    var [searchText, setSearchText] = useState("");

    const redirectionHandler = (event) => {
        event.preventDefault();
        if (searchText == "") return;
        redirectToSubpage((props.searchType == SearchType.URL? "product?url=":"results?query=") + encodeURIComponent(searchText));
    }

    return <form onSubmit={redirectionHandler}>
        <div id="searchbar">
            <div id="searchinput-container">
                <label for="searchinput" class="invisible">Paste URL here</label>
                <input type="text" name="query" id="searchinput" 
                    value = {searchText}
                    placeholder={props.searchType==SearchType.KEYWORDS? "Write keywords here":"Paste URL here"}
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

/**
 * Redirects to the relative address "domain/string". 
 * Triggers a full-page refresh.
 * @param string the subaddress, without the leading "/"
 */
function redirectToSubpage(string) {
    window.location.href = '/' + string;
}

/**
 * React functional component that renders the search type toggle buttons.
 * Triggers state change on user interaction.
 * @param props accepts searchState with [searchType, setSearchType]
 */
function SearchToggle(props) {
    var [searchType, setSearchType] = props.searchState;

    return <div id='searchtype-container'>
        <button id='searchtype-left' 
            class={'searchtype-button'+(searchType==SearchType.KEYWORDS? ' searchtype-button-active':' searchtype-button-passive')}
            onClick={(ignored) => setSearchType(SearchType.KEYWORDS)}
        >
            Keywords
        </button>
        <button id='searchtype-right' 
            class={'searchtype-button'+(searchType==SearchType.URL? ' searchtype-button-active':' searchtype-button-passive')}
            onClick={(ignored) => setSearchType(SearchType.URL)}
        >
            URL
        </button>
    </div>
}

export default Search;