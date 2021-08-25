import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {getAlbumsData, setCategories,filterAlbums,setisFilterActive,setSelectedCategory, setDateFilter, likeAlbum} from '../reducers/albumSlice';

import AlbumComponent from './AlbumComponent'

let store;
let searchData = [];
const AlbumView = ({...props}) => {

    let [toggleDropDown, setToggleDropdown] = useState(false);
    //let [togggleDetailsWindow, setTogggleDetailsWindow] = useState(false);
    // let [selectedAlbum, setSelectedAlbum] = useState(undefined);
    // let [selectedCategory, setSelectedCategory] = useState("all");
   
    
    store = useSelector(state => {
        return {
            allAlbumData:state.albumReducer.dataDump,
            categories:state.albumReducer.categories,
            filterData:state.albumReducer.filteredData,
            selectedCategory:state.albumReducer.selectedCategory,
            dateFilter : state.albumReducer.isDateFilter
        }
    }, shallowEqual)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAlbumsData()).then(() => {
            dispatch(setCategories());
        })
    },[]);

    const populateCategories = () =>{
        let categoryOptions = '';
        store.categories.forEach(element => {
            categoryOptions += <li><button class="dropdown-item" href="#" id={element.id}>{element.label}</button></li>
        });
        return categoryOptions;
    }

    const showFilteredAlbums = (e) => {
        let id = e.target.id;
        let category = store.categories.find(dataItem => dataItem.id === id) || "all";
        if(category === "all"){
            dispatch(setisFilterActive(false));
        }else{
            dispatch(setisFilterActive(true));
        }
        dispatch(setSelectedCategory(category));
        setToggleDropdown(curState => !curState);
    } 

    useEffect(() => {
        if(store.selectedCategory!== "all"){
            dispatch(filterAlbums(store.selectedCategory.id))
        }else{
            dispatch(filterAlbums(store.selectedCategory))
        }
    },[store.selectedCategory,store.allAlbumData,store.dateFilter])

    const toggleCategory = () => {
        setToggleDropdown(curState => !curState);
    }
    
    const dateChange = (e) => {
        if(e.target.value === ""){
            dispatch(setDateFilter({
                active:false,
                value:""
            }))
        }else{
            dispatch(setDateFilter({
                active:true,
                value:e.target.value
            }))
        }
        
    }

    useEffect(() => {
        props.hideMenu();  
    },[])
    
    let displayData = store.filterData;

    return(
        <React.Fragment>
            
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Home</h1>
              <div className="btn-toolbar mb-2 mb-md-0 position-relative justify-content-end">

                <div className="category-label" >Released Month</div>
                <input type="month" className="btn btn-sm btn-outline-secondary me-0 me-sm-3" onChange={dateChange} value={store.dateFilter.value}/>

                <div className="category-label mt-3 mt-sm-0">Categories</div>
                <button onClick={toggleCategory} type="button" className={toggleDropDown ? "btn btn-sm btn-outline-secondary dropdown-toggle mt-3 mt-sm-0 show" : "btn btn-sm btn-outline-secondary mt-3 mt-sm-0 dropdown-toggle"}>
                  {store.selectedCategory === "all" ? "All" : store.selectedCategory.label}
                </button>
                <ul className={toggleDropDown ? "dropdown-menu dropdown-btns show" : "dropdown-menu dropdown-btns"} >
                    <li><button onClick={showFilteredAlbums} class="dropdown-item" href="#" id="all">All</button></li>
                    {
                        store.categories.map(element => (<li><button onClick={showFilteredAlbums} class="dropdown-item" href="#" id={element.id}>{element.label}</button></li>))
                    }
                </ul>

                
              </div>
            </div>

            <div className="album-container row">

                {   
                    (displayData && displayData.length > 0) ? displayData.map(dataItem => {
                        return (
                            <AlbumComponent dataItem={dataItem} />
                        )
                    })
                    :
                    <h4>No results found!!!</h4>
                }
              
            </div>
          </main>
          {/* {togggleDetailsWindow && <ModalView album={selectedAlbum} togggleDetailsWindow={setTogggleDetailsWindow}/>} */}
        </React.Fragment>
    )
}

export default AlbumView;