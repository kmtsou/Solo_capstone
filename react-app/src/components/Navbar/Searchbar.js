import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { getSearchCommunitiesThunk } from '../../store/search';
import { isEmptyObject } from '../../utils'
import './Searchbar.css'

function Searchbar() {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        let isSubscribed = true;
        const fetchData = async (search) => {
            const data = await fetch('/api/search/', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ search })
            })
            const dataJson = await data.json()
            if (isSubscribed) {
                setSearchResults(dataJson.communities)
            }
        };

        fetchData(search)
        return () => isSubscribed = false;
    }, [search])

    const submitSearch = async (e) => {
        e.preventDefault();
        if (search === '') return;
        if (isEmptyObject(searchResults)) return;
        const searchButton = await dispatch(getSearchCommunitiesThunk(search))
        if (searchButton) {
            history.push(`/search/?searchbar=${search}`)
        }
        setSearch('')
    }

    return (
        <>
            <form className='search-form'>
                <div className='search-div'>
                    <input className='search-input'
                        name='searchbar'
                        placeholder='Find a community'
                        type='search'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        autoComplete='off'
                    ></input>
                    <button className='search-button' onClick={submitSearch}><i className='fas fa-search'></i></button>
                </div>
            </form>
            {search && searchResults && searchResults.length > 0 && (
                <ul className='search-results-container'>
                    {searchResults.map(result => (
                        <li className='search-results-line' key={result.id}>
                            <NavLink to={`/${result.id}/${result.name}`} className='result-link' onClick={() => setSearch('')}><p className='result-p'>{result.name}</p></NavLink>
                        </li>
                    ))}
                </ul>
            )}
            {search && isEmptyObject(searchResults) && search.length > 0 && (
                <ul className='search-results-container'>
                    <li className='search-results-line-none'>No results found</li>
                </ul>
            )}
        </>
    )
}

export default Searchbar;
