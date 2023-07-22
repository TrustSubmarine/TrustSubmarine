import {useState} from 'react';
import Header from '../Components/Header.js';
import './SearchPage.css';
import {useNavigate} from 'react-router-dom';

const SearchType = {
    KEYWORDS: 'KW',
    URL: 'URL'
};

function SearchPage() {
    return <div className='verticalflow-justify-flex flexfill'>
        <Header/>
        <Search/>
    </div>
}

function Search() {
    return <div id='search-component' className='verticalflow-medium-flex align-center auto-margin'>
        <LargeLogo/>
        <SearchForm/>
    </div>
}

function LargeLogo() {
    return <img src='./TrustSubmarine Full Icon.png' className='medium-image' alt='TrustSubmarine Large Logo'/>
}

function SearchForm() {
    var [searchType, setSearchType] = useState(SearchType.URL);

    return <div className='verticalflow-small-flex'>
        <SearchBar searchType={searchType}/>
        <SearchToggle searchState={[searchType, setSearchType]}/>
    </div>
}

function processProductURL(url) {
    const obj = new URL(url);
    let host = obj.host
    if (host.startsWith("www.")) host = host.substring(4);
    host = host.replace(/\./g, '/');
    const path = obj.pathname;
    return `${host}${path}`.replace(/[&?/]?[\w-+%]+=[\w-+%]+/g, '');
}

/**
 * React functional component that renders the search bar, including the search button.
 * Also handles form submission behaviour.
 * @param props accepts searchType with type SearchType
 */
function SearchBar(props) {
    var [searchText, setSearchText] = useState("");
    const nav = useNavigate();

    const redirectionHandler = (event) => {
        event.preventDefault();
        if (searchText === "") return;
        nav((props.searchType === SearchType.URL? "product?url=":"results?query=") + processProductURL(searchText));
    }

    return <form onSubmit={redirectionHandler}>
        <div id="searchbar">
            <div id="searchinput-container">
                <label htmlFor="searchinput" className="invisible">Paste URL here</label>
                <input type="text" name="query" id="searchinput" autoComplete='off'
                    value = {searchText}
                    placeholder={props.searchType === SearchType.KEYWORDS? "Write keywords here":"Paste URL here"}
                    onChange={(event) => setSearchText(event.target.value)}/>

            </div>
            <button id="searchbutton" onClick={redirectionHandler}>
                <div id="searchicon-container">
                    <img src="./FlatIcons Magnifying Glass C2E3FF.png" id="searchicon-magglass" alt='Keyword Search Icon'/>
                </div>
            </button>
        </div>
    </form>
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
            className={'searchtype-button'+(searchType === SearchType.KEYWORDS? ' searchtype-button-active':' searchtype-button-passive')}
            onClick={(ignored) => setSearchType(SearchType.KEYWORDS)}
        >
            Keywords
        </button>
        <button id='searchtype-right' 
            className={'searchtype-button'+(searchType === SearchType.URL? ' searchtype-button-active':' searchtype-button-passive')}
            onClick={(ignored) => setSearchType(SearchType.URL)}
        >
            URL
        </button>
    </div>
}

export default SearchPage;