# Getting Started with Demo Music App

## Plugins Used

redux, redux-toolkit, react-router, sass, redux-logger, cross-fetch, bootstrap

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


## Features

1) Search Functionality.\
2) Filter by Category.\
3) Filter by Release Month.\
4) Ability to Like/Favourite a Album.\
5) Reponsive in Nature.\
6) Used Hooks for react and redux.\

5) Surprise Feature : Ability to create playlist and add albums to playlist.\


## User Journey

1) Goto the Home Page.\
    a. User can see Left pane (links to other pages) & right side pane (displaying all albums).\
    b. User can search any song based on title or Artist name from search bar at the top.\
    c. User can also apply Filter based on Genre (category) of Album.\
    d. User can also filter albums based on release date, for better UX I have done it based on Release Month which can be easier to naivgate.\
    e. Search works with all the applied filters.\
    f: User can click on the thumbnail of the album to get redirected to the actual site with list of songs.\

2) User can Like/add to favourite a Album.\
    a. User can click on the "Heart" shape to like an album.\
    b. If users wants to see list of all Liked albums, user can click on "Liked Songs" from left plane to redirect to favourites page.\
    c. Search is enabled for this page.\

3) User can add a album to a playlist.\
    a. First navigate to Playlist page by clicking on "Playlist" from left pane.\
    b. Click on Create playlist button to create a new playlist.\
    c. if playlist is not unique, while saving it will display the error.\
    d. Once playlist is created, navigate to Home page by clicking on Home from left pane.\
    e. Now Click on  "+" to get the Modal to show the list of playlist created.\
    f. Select the playlist from the dropdown and click on save.\
    g. Navigate back to Playlist poge.\
    h. Select the required playlist from the dropdown to view Albums added to your playlist.\


