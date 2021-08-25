import { createSlice } from '@reduxjs/toolkit'
import services from '../services/services'

export const counterSlice = createSlice({
  name: 'albumReducer',
  initialState: {
    dataDump: {},
    categories:[],
    filteredData:[],
    isLoading:false,
    isFilterActive:false,
    isDateFilter:{
        active:false,
        value:""
    },
    selectedCategory:"all",
    playlists:[],

  },
  reducers: {
    setDataDump: (state, action) => {
      state.dataDump = action.payload
    },
    setLoader: (state,action) => {
      state.isLoading = action.payload
    },
    setisFilterActive: (state,action) => {
        state.isFilterActive = action.payload
    },
    setSelectedCategory: (state, action) => {
        state.selectedCategory = action.payload;
    },
    setDateFilter: (state, action) => {
        state.isDateFilter = {
            active: action.payload.active,
            value: action.payload.value
        }
    },
    setCategories: (state, action) => {
        //generate data for category filter
        state.dataDump.entry.forEach(dataItem => {
            
            if(!state.categories.some((innerItem) => dataItem.category.attributes["im:id"] === innerItem.id)){
                state.categories = [...state.categories, 
                    {id:dataItem.category.attributes["im:id"],
                    label:dataItem.category.attributes.label
                }]
            }
           
        });
    },
    filterAlbums: (state,action) => {
        //filter albums based on selected category filter
        let id = action.payload;
        let categoryFilteredData = id !== "all" ? state.dataDump.entry ? state.dataDump.entry.filter(dataItem => dataItem.category.attributes["im:id"] === id) : [] : state.dataDump.entry ;
        if(state.isDateFilter.active){
            let filterDate = new Date(state.isDateFilter.value);
            let dateFilteredData = categoryFilteredData.filter(dataItem => {
                let releaseDate = new Date(dataItem["im:releaseDate"].label.substr(0,dataItem["im:releaseDate"].label.length - 6));
                return releaseDate.getMonth()+1 === filterDate.getMonth() + 1 && releaseDate.getFullYear() ===filterDate.getFullYear()
            })
            state.filteredData = dateFilteredData;
        }else{
            state.filteredData = categoryFilteredData
        }
        
    },
    filterAlbumBySearch:(state, action) => {
        //search Albums based on conditions i.e without any filter, with date filter, with category filter, with both filters combined.
        if(!state.isFilterActive && !state.isDateFilter.active){
            state.filteredData = state.dataDump.entry ? state.dataDump.entry.filter(dataItem => {
                let dataItemLable = dataItem.title.label.toLowerCase();
                return dataItemLable.includes(action.payload.searchText.toLowerCase())
            }) : []
        }else if(!state.isFilterActive && state.isDateFilter.active){
            let filterDate = new Date(state.isDateFilter.value);
            state.filteredData = state.dataDump.entry ? state.dataDump.entry.filter(dataItem => {
                let releaseDate = new Date(dataItem["im:releaseDate"].label.substr(0,dataItem["im:releaseDate"].label.length - 6));
                let dataItemLable = dataItem.title.label.toLowerCase();
                return ((releaseDate.getMonth()+1 === filterDate.getMonth() + 1 && releaseDate.getFullYear() ===filterDate.getFullYear()) && dataItemLable.includes(action.payload.searchText.toLowerCase()))
            }) : []
        }else if(state.isFilterActive && !state.isDateFilter.active){
            let data = state.dataDump.entry.filter(dataItem => dataItem.category.attributes["im:id"] === state.selectedCategory.id)
            
            state.filteredData = data.filter(dataItem => {
                let dataItemLable = dataItem.title.label.toLowerCase();
                return dataItemLable.includes(action.payload.searchText.toLowerCase());
            })
        }
        else{
            let data = state.dataDump.entry.filter(dataItem => dataItem.category.attributes["im:id"] === state.selectedCategory.id)
            let filterDate = new Date(state.isDateFilter.value);
            let dateFilteredData = data.filter(dataItem => {
                let releaseDate = new Date(dataItem["im:releaseDate"].label.substr(0,dataItem["im:releaseDate"].label.length - 6));
                return releaseDate.getMonth()+1 === filterDate.getMonth() + 1 && releaseDate.getFullYear() ===filterDate.getFullYear()
            })
            
            state.filteredData = dateFilteredData.filter(dataItem => {
                let dataItemLable = dataItem.title.label.toLowerCase();
                return dataItemLable.includes(action.payload.searchText.toLowerCase());
            })
        }
    },
    likeAlbum:(state,action) => {
        let data = state.dataDump.entry.map(dataItem => {
            if(dataItem.id.attributes["im:id"] === action.payload){
                dataItem.isLiked = !dataItem.isLiked 
            }
            return dataItem;
        })
        state.filteredData = data;
    },
    addPlaylist:(state,action) => {
        state.playlists = [...state.playlists, action.payload];
    },
    addToPlaylist:(state,action) => {
        let data = state.dataDump.entry.map(dataItem => {
            if(dataItem.id.attributes["im:id"] === action.payload.id){
                dataItem.playlist = [...dataItem.playlist, action.payload.playlist]
            }
            return dataItem;
        })
        state.filteredData = data;
    }
  },
})


export const { setDataDump, setLoader, setCategories,filterAlbums,filterAlbumBySearch,setisFilterActive ,setSelectedCategory, setDateFilter,likeAlbum, addPlaylist,addToPlaylist} = counterSlice.actions

export function getAlbumsData(){
    return dispatch => {
        dispatch(setLoader(true));
        return services.getTopAlbums().then(response => {
            if(!response.ok){
                throw response;
            }
            return response.json()
        }).then(json => {
            json.feed.entry.map(dataItem => {
                dataItem.isLiked = false;
                dataItem.playlist = [];
            })
            dispatch(setDataDump(json.feed));
            dispatch(setLoader(false));
        }).catch(e => {
            alert("An Exception Occured!! Please check Console for more info.");
            console.error("An exception occured",e.json());
        })
    }
}

export default counterSlice.reducer