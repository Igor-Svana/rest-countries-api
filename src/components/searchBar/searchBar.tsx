import './searchBar.css';
import { ChangeEventHandler } from "react";

interface ISearchBox {
    bg: string,
    value: string,
    color: string,
    searchInputHandler: ChangeEventHandler<HTMLInputElement>
}

const SearchBar = ({bg, color, searchInputHandler, value}: ISearchBox) => {
    return(
        <div className='search-bar-container' >
            <input style={{background: bg, color: color}} required={true} type="text" onChange={searchInputHandler} id="input" value={value}/>
            <i className="fa-solid fa-magnifying-glass"></i>
            <label htmlFor="input">Search for a country...</label>
        </div>
    )
}

export default SearchBar;