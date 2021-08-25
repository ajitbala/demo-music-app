import React, { useEffect, useState ,useRef} from 'react';
import {addPlaylist,addToPlaylist} from '../reducers/albumSlice';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

//Modal to show more details and add Playlists

const ModalView = ({...props}) => {

    const inputEl = useRef(null);

    const dispatch = useDispatch();

    let playLists = useSelector(state => state.albumReducer.playlists);
    let [selectedPlayList, setSelectedPlayList] = useState("0");

    const save = () => {
        if(props.newPlayList){
            if(playLists.some(item => item === inputEl.current.value)){
                alert(inputEl.current.value + " playlist already exists!")
            }else{
                dispatch(addPlaylist(inputEl.current.value));
            }
            
            props.togggleDetailsWindow(false);
        }else{
            if(selectedPlayList === "0"){
                alert("Please select a playlist");
            }else{
                dispatch(addToPlaylist({id:props.album.id.attributes["im:id"],playlist:selectedPlayList}))
                props.togggleDetailsWindow(false);
            }
        }
    }

    const selectPlayList = (e) => {
        if(e.target.value !== "0"){
            setSelectedPlayList(e.target.value);
        }
        
    }

    return(
        <React.Fragment>
        <div class="modal fade show" tabindex="-1" style={{display:"block"}}>
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{props.newPlayList ? "Create Playlist" : props.playlist ? "Add to Playlist" : "More Details"}</h5>
                    <button onClick={() => props.togggleDetailsWindow(false)} type="button" class="btn-close" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div className="row">
                        
                        { props.newPlayList ? 
                            <React.Fragment>
                        
                            <div class="col-sm-10">
                                <input ref={inputEl} type="text" class="form-control" />
                            </div>
                        </React.Fragment>
                        :
                        props.playlist ?
                          <React.Fragment>
                            <label for="inputEmail3" class="col-sm-2 col-form-label">Your Playlist</label>
                            <div class="col-sm-10">
                                <select onChange={selectPlayList} class="form-select" aria-label="Default select example">
                                    <option selected value="0">Select Playlist</option>
                                    {
                                        playLists.map(dataItem => <option value={dataItem}>{dataItem}</option>)
                                    }
                                </select>
                            </div>
                          </React.Fragment>
                           
                            :
                        <React.Fragment>
                            <div className="col-3">
                                <img className="img-thumbnail" src={props.album["im:image"][2]["label"]}></img>
                            </div>
                            <div className="col-9">
                                <h4 class="card-title">{props.album.title.label}</h4>
                                <h6 class="card-subtitle mb-2 text-muted">{props.album.category.attributes.label}</h6>
                                <h6 className="mb-2">Artist: {props.album["im:artist"].label}</h6>
                                <h6 className="mb-2">Released : {props.album["im:releaseDate"].attributes.label}</h6>
                                <h6 className="mb-2">Songs: {props.album["im:itemCount"].label}</h6>
                            </div>
                        </React.Fragment>
                        
                        }
                        
                    </div>
                </div>
                <div class="modal-footer">
                    <button onClick={() => props.togggleDetailsWindow(false)} type="button" className="btn btn-secondary">Close</button>
                    {(props.playlist || props.newPlayList) ? 
                    <button type="button" className="btn btn-primary" onClick={save}>Save</button>
                    : null }
                </div>
                </div>
            </div>
        </div>
        <div class="modal-backdrop fade show"></div>
        </React.Fragment>
    )
}

export default ModalView;