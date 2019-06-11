import React, { Component } from 'react';
import Spotify from "spotify-web-api-js";
import { saveSearch, scrapeWhoSampled } from '../src/utils/API';
import SpotifyPlayer from 'react-spotify-player';
import "../src/style.css"


const spotifyWebApi = new Spotify();

const size = {
  width: '100%',
  height: 80,
};
const view = 'list'; // or 'coverart'
const theme = 'black'; // or 'white'



class App extends Component {

  constructor() {
    super();
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
      nowPlaying: {
        name: "",
        image: ""
      },
      recentlyPlayed: [],
      search: "",
      searchResults: [],
      sampleResults: [],
    };

    if (params.access_token) {
      console.log('hit access token')
      spotifyWebApi.setAccessToken(params.access_token)
    }
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while (e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    this.handleSaveSearch({
      search: this.state.search
    })



    spotifyWebApi.search(this.state.search || "Badbadnotgood", ["track", "artist", "album"])
      .then((response) => {
        console.log(response);

        let songArray = []

        const searchTracks = response.tracks.items.map(track => {
          let songObject = {
            name: track.artists[0].name,
            song: track.name,
            image: track.album.images[0].url
          }
          songArray.push(songObject)
        })

        this.setState({ searchResults: songArray })
      })
  };

  handleSaveSearch = searchQuery => {
    saveSearch(searchQuery)
      .then(() => console.log("Search has been saved!"))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getNowPlaying();
    this.getRecentlyPlayed();
  }

  getNowPlaying = () => {
    spotifyWebApi.getMyCurrentPlaybackState()
      .then((response) => {
        console.log(response)
        this.setState({
          nowPlaying: {
            name: response.item.name,
            image: response.item.album.images[0].url
          }
        })
      })
  };

  getRecentlyPlayed = () => {
    spotifyWebApi.getMyRecentlyPlayedTracks()
      .then((response) => {
        console.log(response)

        // create array of recently played
        const recentlyPlayed = response.items.map(song => {
          return {
            artist: song.track.artists[0].name,
            trackName: song.track.name,
            albumImage: song.track.album.images[0].url
          }
        })

        this.setState({ recentlyPlayed })
      });
  };

  //get samples
  getSamples = (query) => {
     console.log("hi")
     console.log(query);
     scrapeWhoSampled(query)
       .then(({data: sampleData}) => {
         console.log(sampleData);
       })
       .catch(err => console.log(err));
   }

  render() {
    console.log(this.state)
    return (
      <div className="login">
        <nav className="navbar">
          <img src="https://cdn-images.threadless.com/threadless-media/artist_shops/shops/teeshirtfashions/products/678523/shirt-1532408991-980cad7c9e74a858ad2a425a09ac80c1.png?v=3&d=eyJvbmx5X21ldGEiOiBmYWxzZSwgImZvcmNlIjogZmFsc2UsICJvcHMiOiBbWyJ0cmltIiwgW2ZhbHNlLCBmYWxzZV0sIHt9XSwgWyJyZXNpemUiLCBbXSwgeyJ3aWR0aCI6IDk5Ni4wLCAiYWxsb3dfdXAiOiBmYWxzZSwgImhlaWdodCI6IDk5Ni4wfV0sIFsiY2FudmFzX2NlbnRlcmVkIiwgWzEyMDAsIDEyMDBdLCB7ImJhY2tncm91bmQiOiAiZmZmZmZmIn1dLCBbInJlc2l6ZSIsIFs4MDBdLCB7fV0sIFsiY2FudmFzX2NlbnRlcmVkIiwgWzgwMCwgODAwLCAiI2ZmZmZmZiJdLCB7fV0sIFsiZW5jb2RlIiwgWyJqcGciLCA4NV0sIHt9XV19" className="crate-logo" alt="iFam" />
          <a className="navbar-brand logo-text">DIGGIN' IN THE CRATES</a>
          <a href="http://localhost:8888">
            <button type="button" className="btn btn-outline-light login-button"> Login With Spotify</button>
          </a>
        </nav>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <div className="container now-playing-search">
              <h1 className="display-4"></h1>

              <div className="current-song-name">Currently Playing:<br></br>
                {this.state.nowPlaying.name}</div>
              <div className="current-song-image">
                <img src={this.state.nowPlaying.image} style={{ width: 250 }} />
              </div>

              <div className="row align-items-center">
                <form onSubmit={this.handleFormSubmit}>
                  <input
                    type="text"
                    className="form-control search-bar"
                    placeholder="Search for a song to discover its samples and connections"
                    onChange={this.handleInputChange}
                    value={this.state.search}
                    name="search"
                  />
                  <button type="submit" className="btn btn-block btn-dark search-button">
                    Search For Music
                  </button>
                </form>
                {/* <button onClick={() => this.getNowPlaying()}>
                Check Now Playing
        </button>
              <button onClick={() => this.getRecentlyPlayed()}>
                Get My Library
        </button> */}
              </div>
            </div>
          </div>
        </div>


        <div className="row align-items-center search-results">

          {this.state.searchResults.map(song => {
            return (
              <div className="col-12 col-sm-6 col-md-3" onClick={() => this.getSamples(song.song)}>
                <div className="card">
                  <img
                    src={song.image}
                    alt={song.name}
                    className="card-img-top"
                  />
                  <div className="card-body search-body">
                    <h5 className="card-title">{song.name}</h5>
                    <h5 className="card-text">{song.song}</h5>
                    <i className="fas fa-play"></i>
                    <i className="fas fa-plus-circle add-song-button"></i>
                    <button type="button" className="btn btn-sm btn-outline-light sample-button">Samples</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="row align-items-center recent-song-list">

          {this.state.recentlyPlayed.map(song => {
            return (
              <div className="col-12 col-sm-6 col-md-3" onClick={() => this.getSamples(song.trackName)}>
                <div className="card">
                  <img
                    src={song.albumImage}
                    alt={song.trackName}
                    className="card-img-top"
                  />
                  <div className="card-body recent-body">
                    <h5 className="card-title">{song.trackName}</h5>
                    <i className="fas fa-play"></i>
                    <button type="button" className="btn btn-sm btn-outline-light sample-button">Samples</button>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <SpotifyPlayer
          uri="spotify:track:2CPturRUlpvirYr7VpkXCV"
          size={size}
          view={view}
          theme={theme}
        />

        <footer className="sticky-footer py-4 bg-dark text-white-50">
          <div className="container text-center">
            <small>Copyright &copy; DIGGIN' IN THE CRATES</small>
          </div>
        </footer>
      </div>
    );
  }
}


export default App;
