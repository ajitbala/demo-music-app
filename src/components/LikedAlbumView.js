import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {likeAlbum} from '../reducers/albumSlice';
import AlbumComponent from './AlbumComponent';

//Liked view to display all favourite/liked Albums

const LikedAlbumView = ({...props}) => {

    let filterData = useSelector(state => state.albumReducer.filteredData);

    useEffect(() => {
        props.hideMenu();  
    },[])

    let displayData = filterData.filter(dataItem => dataItem.isLiked === true);

    return (
        <React.Fragment>
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Liked Songs</h1>
            </div>

            <div className="album-container row">

                {   
                    (displayData && displayData.length > 0) ? displayData.map(dataItem => {
                        return (
                            <AlbumComponent dataItem={dataItem} />
                        )
                    })
                    :
                    <h4>You haven't liked any album!</h4>
                }
              
            </div>
          </main>
        </React.Fragment>
    )
}


export default LikedAlbumView;