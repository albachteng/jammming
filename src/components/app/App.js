import './App.css';
import React from 'react';
import { SearchResults } from '../../components/searchresults/SearchResults';
import { SearchBar } from '../../components/searchbar/SearchBar';
import { Playlist } from '../../components/playlist/Playlist';
import Spotify from '../../../src/util/Spotify';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'My Playlist',
      playlistTracks: [],
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) 
      { return;
    } else {
      let playlist = this.state.playlistTracks.concat(track);
      this.setState({
        playlistTracks: playlist,
      });
    }}

  removeTrack(track) {
    let index = this.state.playlistTracks.findIndex(song => {
      if (song.id === track.id) {
        return true;
      } else return false;
    });
    if (index !== -1) {
      let playlist = this.state.playlistTracks;
      playlist.splice(index, 1);
      this.setState({
        playlistTracks: playlist,
      });
    }
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name,
    })
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(
      () => {
        this.setState(
        {
          playlistName: 'New Playlist',
          playlistTracks: [],
        })
      });
    }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({
        searchResults: searchResults})
    });
  }

  render() {
    return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>

      <div className="App">

        <SearchBar onSearch={this.search}/>

        <div className="App-playlist">

          <SearchResults 
            searchResults={this.state.searchResults}
            onAdd={this.addTrack}
          />

          <Playlist 
            onNameChange={this.updatePlaylistName}
            playlistName={this.state.playlistName} 
            playlistTracks={this.state.playlistTracks}
            onRemove={this.removeTrack}
            onSave={this.savePlaylist}
          />

        </div>
      </div>
    </div>
  );
}}

export default App;
