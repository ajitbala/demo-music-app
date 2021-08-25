import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {likeAlbum} from '../reducers/albumSlice';
import AlbumComponent from './AlbumComponent';
import ModalView from './ModalView';

//Playlist view to display Albums added to Playlist

const PlayListView = ({...props}) => {

    let filterData = useSelector(state => state.albumReducer.filteredData);
    let playLists = useSelector(state => state.albumReducer.playlists);
    let [toggelWindow, setToggleWindow] = useState(false);
    let [selectedPlaylist, setSelectedPlaylist] = useState("0");

    const selectPlaylist = (e) => {
        setSelectedPlaylist(e.target.value);
    }

    useEffect(() => {
        props.hideMenu();  
    },[])

    let displayData = filterData.filter(dataItem => dataItem.playlist.some(item => item === selectedPlaylist));

    return (
        <React.Fragment>
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Your Playlist</h1>
              
                        <div class="col-12 col-sm-auto ms-0 ms-sm-2">
                            <select onChange={selectPlaylist} class="form-select" aria-label="Default select example">
                                    <option selected value="0">Select Playlist</option>
                                    {
                                        playLists.map(dataItem => <option value={dataItem}>{dataItem}</option>)
                                    }
                                </select>
                        </div>

              <div className="btn-toolbar mb-2 mb-md-0 position-relative ms-sm-auto mt-2 mt-sm-0">
                 <button onClick={setToggleWindow} className="btn btn-primary ">Create Playlist</button>
              </div>
            </div>

            <div className="album-container row">

                {  selectedPlaylist == "0"
                    ?   <h4>You haven't selected any playlist!</h4>
                    :
                    (displayData && displayData.length > 0) ? displayData.map(dataItem => {
                        return (
                            <AlbumComponent dataItem={dataItem} />
                        )
                    })
                    :
                    <h4>No songs added to playlist!</h4>
                }
              
            </div>
          </main>
          {toggelWindow && <ModalView togggleDetailsWindow={setToggleWindow} playlist={true} newPlayList={true}/>}
        </React.Fragment>
    )
}


export default PlayListView;