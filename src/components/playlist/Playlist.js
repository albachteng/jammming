import React from 'react';
//@ts-ignore
import { TrackList } from '../tracklist/TrackList.js';
import './Playlist.css';

export class Playlist extends React.Component {

    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(e) {
        this.props.onNameChange(e.target.value);
    }

    render() {
        return (
            <div className="Playlist">
                <input 
                defaultValue={"New Playlist"}
                onChange={this.handleNameChange}/>
                <TrackList 
                    tracks={this.props.playlistTracks}
                    isRemoval={true}
                    onRemove={this.props.onRemove}
                    />
                <button 
                    className="Playlist-save"
                    onClick={this.props.onSave}>
                        SAVE TO SPOTIFY
                </button>
            </div>
        )
    }
}