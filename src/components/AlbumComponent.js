import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {getAlbumsData, setCategories,filterAlbums,setisFilterActive,setSelectedCategory, setDateFilter, likeAlbum} from '../reducers/albumSlice';
import ModalView from './ModalView';

//Common Album component as this component is used in multiple view

const AlbumComponent = ({ ...props }) => {


    let [selectedAlbum, setSelectedAlbum] = useState(undefined);
    let [togggleDetailsWindow, setTogggleDetailsWindow] = useState(false);
    let [playListView, setPlayListView] = useState(false);

    const dispatch = useDispatch();

    const likeSongs = (e,id) => {
        e.stopPropagation();
        e.preventDefault();
        
        dispatch(likeAlbum(id));
    }   

    const showMoreDetails = (e,dataItem) => {
        e.stopPropagation();
        e.preventDefault();
        setPlayListView(false);
        setSelectedAlbum(dataItem);
        setTogggleDetailsWindow(true);
    }

    const addToPlaylist = (e,dataItem) =>{
        e.stopPropagation();
        e.preventDefault();
        setPlayListView(true);
        setSelectedAlbum(dataItem);
        setTogggleDetailsWindow(true);
    }

    // useEffect(() => {
        
    // },[selectedAlbum])

    return (
        <React.Fragment>
            <div className="col col-sm-4 col-lg-3 mb-4">
                <a className="album-link" href={props.dataItem.link.attributes.href} title={props.dataItem.title.label}>
                    <div class="card album">
                        <div class="card-body">
                            <div className="album-img position-relative">
                                <img src={props.dataItem["im:image"][2]["label"]} class="card-img-top" alt="..."></img>
                                <div className="btn-array">
                                    <div className="d-flex justify-content-between" >
                                        <button className="support-btns" onClick={(e) => likeSongs(e, props.dataItem.id.attributes["im:id"])} title="Like">
                                            {props.dataItem.isLiked ?
                                                <svg style={{ color: "red" }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-suit-heart-fill" viewBox="0 0 16 16">
                                                    <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
                                                </svg>

                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-suit-heart" viewBox="0 0 16 16">
                                                    <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z" />
                                                </svg>
                                            }

                                        </button>
                                        <button className="support-btns" onClick={(e) => addToPlaylist(e, props.dataItem)} title="Add to playlist">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                                <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
                                            </svg>
                                        </button>
                                        <button className="support-btns" onClick={(e) => showMoreDetails(e, props.dataItem)} title="more details">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                                                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                            </div>

                            <h5 class="card-title">{props.dataItem.title.label}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">{props.dataItem.category.attributes.label}</h6>
                            <div className="d-flex justify-content-between">
                                <p class="card-text mb-0">{props.dataItem["im:itemCount"].label} Songs</p>
                                <p className="amount mb-0">{props.dataItem["im:price"].label}</p>
                            </div>

                        </div>
                    </div>
                </a>
            </div>
            {togggleDetailsWindow && <ModalView album={selectedAlbum} togggleDetailsWindow={setTogggleDetailsWindow} playlist={playListView}/>}
        </React.Fragment>
    )
}

export default AlbumComponent;