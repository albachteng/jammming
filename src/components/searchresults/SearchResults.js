import React from 'react';
import './SearchResults.css';
//@ts-ignore
import { TrackList } from '../tracklist/TrackList.js';

export class SearchResults extends React.Component {
    render() {
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                <TrackList 
                    tracks={[...this.props.searchResults]}
                    onAdd={this.props.onAdd}
                    isRemoval={false}
                />
            </div>
        )
    }
}