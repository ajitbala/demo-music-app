import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {filterAlbumBySearch} from '../reducers/albumSlice'

//Header view to display on all components.

const HeaderView = ({...props}) => {

    let filterActive = useSelector(state => state.albumReducer.isFilterActive);
    let dateFilterActive = useSelector(state => state.albumReducer.isDateFilter.value);
    

    
    let [searchText, setSearchText] = useState("");

    const dispatch = useDispatch();

    const applySearch = (e) => {
        setSearchText(e.target.value.trim());
    }

    useEffect(() => {
        dispatch(filterAlbumBySearch({searchText}))
    },[searchText])

    useEffect(() => {
        setSearchText("");
    },[filterActive,dateFilterActive])

    return (
        <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Raagam</a>
        <button onClick={props.showMenu} className="navbar-toggler position-absolute d-md-none collapsed" type="button">
          <span className="navbar-toggler-icon"></span>
        </button>
        <input onChange={applySearch} className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" value={searchText}/>
        {/* <div className="navbar-nav">
          <div className="nav-item text-nowrap">
            <a className="nav-link px-3" href="#">Sign out</a>
          </div>
        </div> */}
      </header>
    )
}

export default HeaderView