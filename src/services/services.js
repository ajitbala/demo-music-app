import fetch from 'cross-fetch';

//All service api goes here.

const baseUrl = 'https://itunes.apple.com/';
const fetchHeader = {

}

const services = {
    getTopAlbums : function(){
        let getUrl = baseUrl + 'us/rss/topalbums/limit=100/json'
        return fetch(getUrl);
    }
}

export default services;