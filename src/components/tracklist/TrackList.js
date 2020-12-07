import React from 'react';
//@ts-ignore
import {Track} from '../track/Track.js';
import './TrackList.css';

export class TrackList extends React.Component {
    render() {
        return (
            <div className="TrackList">
                {
                this.props.tracks.map(track => {
                    console.log(typeof this.props.tracks);
                    return <Track 
                        track={track} 
                        key={track.id} 
                        onAdd={this.props.onAdd}
                        onRemove={this.props.onRemove}
                        isRemoval={this.props.isRemoval}/>
                })}
            </div>
        )
    }
}