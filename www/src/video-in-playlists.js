import { LitElement, html, css } from 'lit-element';

/**
 * Wrapper around the video tag.
 * Takes the video file, type and vtt file as parameters.
 * When a new vtt file has been loaded it fires a "cuesUpdated" event containing
 * an array with the text, id and startTime of all cues loaded.
 * When a video is plaing it fires "cuechange" events when cues becomes active
 * or cues becomes inactive. The event object contains a list of active
 * cues when the event is fired.
 *
 * The video is scaled to fill the width of the container tag.
 *
 * @extends LitElement
 */
class VideoInPlaylists extends LitElement {
  static get properties() {
    return {
      playlistsInfo: {
        type: Array
      },
      video: {
        type: Number
      }
    };
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
        }

        ul {
          list-style-type: none;
        }

        li {
          padding: 14px 4%;
          margin: 7px 0;
          border: 1px solid rgb(212, 212, 212);
          box-shadow: 0 3px 2px 0 rgba(0, 0, 0, 0.10), 0 1px 5px 0 rgba(0, 0, 0, 0.10), 0 3px 1px -2px rgba(0, 0, 0, 0.0);
        }

        button {
          text-align: inherit;
          font-size: inherit;
          width: 100%;
          text-decoration: none;
          background: none;
          border: none;
        }

        button:link, button:visited {
          font-weight: normal;
        }

        button:hover, button:active {
          font-weight: bold;
        }

        span.black {
          color: #000;
        }

        span.gray {
          color: rgb(165, 165, 165);
        }
    `];
  }

  constructor() {
    super()
    this.playlistsInfo = []

    // Fetch id from the chosen video in
    var info = { id: localStorage.getItem('id') } // Receive id for chosen video in video-list-view
    // var info = { id: this.video } // Receive id for current video
    fetch(`${window.MyAppGlobals.serverURL}api/residesInPlaylists.php`, {
      method: 'POST',
      headers: { "Content-type": "application/x-www-form-urlencoded" },
      body: this.formEncode(info) // send info to php file
    })
      .then(res => res.json()) // When a reply has arrived
      // .then(json => console.log(json)) // When a reply has arrived
      .then(data => {
        this.playlistsInfo = data;
      })
  }

  /**
   * formEncode() and certain parts
   * from constructor() are made by
   * Anders_bondehagen on
   * https://forums.fusetools.com/t/how-do-i-receive-post-data-in-php-sent-from-fuse-javascript-by-fetch/5357/3
   * This code is used to send values to PHP
   */
  formEncode(obj) {
    var str = []
    for (var p in obj) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]))
    }
    return str.join("&")
  }

  render() {
    return html`
      <h2>I spillelister</h2>
      <ul>
        ${this.playlistsInfo.map(playInfo => {
          return html`
            ${playInfo.map(pInf => {
              return html`
                <button type="button" name="playlist" @click="${() => {
                  // save id value in localStorage so it doesn't reset when we arrive at playlist-page
                  localStorage.setItem('id', pInf['id'])
                  location.href = 'playlist' // head user to playlist page
                }}">
                  <li>${pInf['title']}</li>
                </button>
              `
            })}
          `;
        })}
      </ul>
    `;
  }
} // class VideoInPlaylists

customElements.define('video-in-playlists', VideoInPlaylists);
