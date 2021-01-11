import { LitElement, html, css } from 'lit-element'
import '@polymer/iron-icon/iron-icon.js';

// import the sub-component
import './playlist-content.js'

class PlaylistView extends LitElement {
  static get properties() {
    return {
      change: {
        type: Boolean,
        value: false
      },
      id: {
        type: Number
      },
      owner: {
        type: Number
      },
      title: {
        type: String
      },
      desc: {
        type: String
      },
      videosInfo: {
        type: Array
      }
    }
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      /* styles from shared-styles */
      .card {
        margin: 24px;
        padding: 16px;
        color: #757575;
        border-radius: 5px;
        background-color: #fff;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
      }

      h1 {
        margin: 16px 0;
        color: #212121;
        font-size: 22px;
      }

      /* Add some margin so it appears right
      below the input. Just for stylistic
      consistency (the other pages works best
      with this layout) */
      button {
        margin-left: 8em;
      }

    `;
  }

  constructor() {
    super();
    this.videosInfo = []
    this.displayPlaylist()
    this.displayVideosForDropdown()
  } // constructor

  render() {
    return html`
      <div class="card">
        <h2>Legg til videoer til «${this.title}»</h2>
        <p>${this.desc}</p>
        <form method="POST" onsubmit="javascript: return false">
          <!-- To tell a php file to video to a playlist, we need
            to pass information about which playlist we're adding
            the video to, and which video we want to add. Also the
            videos should be reorder-able, so info about the video's
            place in the queue also needs to be added (but this will
            be added in php) -->
          <input type="hidden" name="playlist" value="${this.id}">
          <label for="video">Legg til video</label>
          <select name="video" id="video">
            ${this.videosInfo.map(vidInfo => {
              return html`
                <option value="${vidInfo.id}">${vidInfo.title}</option>
              `
            })}
          </select><br>
          <button @click="${this.addVideo}">Legg til video</button>
        </form>
      </div>
      <div class="card">
        <h2>Videoer i «${this.title}»</h2>
        <playlist-content playlist="${this.id}"></playlist-content>
      </div>
    `;
  }

  addVideo(e) {
    const data = new FormData(e.target.form) // Wrap the form in a FormData object / Save user input in FormData object
    const values = [...data.values()]
    // console.log('values: ', values)

    fetch(`${window.MyAppGlobals.serverURL}api/playlistAddVideo.php`, {
      method: 'POST',
      credentials: "include",
      body: data
    }
    ).then(res => res.json()) // When a reply has arrived
      // .then(text => console.log(text)) // When a reply has arrived
      .then(res => {
        if (res.status == 'SUCCESS') { // Succesfully comment posted
          alert('Video er lagt til')
        }
        else if (res.status == 'FAIL') {
          alert('Video ble ikke lagt til')
        }
        else if (res.status == 'OFFLINE-USER') {
          alert('Logg inn for å legge til videoer')
        }
      })
  }

/**
 * formEncode() and certain parts
 * from displayPlaylist() are made by
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

  displayPlaylist(e) {
    var info = { id: localStorage.getItem('id') } // Receive id for chosen playlist in playlist-list-view
    fetch(`${window.MyAppGlobals.serverURL}api/playlist.php`, {
      method: 'POST',
      headers: { "Content-type": "application/x-www-form-urlencoded" },
      body: this.formEncode(info) // send info to php file
    }
    )
      .then(res => res.json()) // When a reply has arrived
      // .then(json => console.log(json)) // When a reply has arrived
      .then(res => {
        if (res.status == 'SUCCESS') { // Succesfully video uploaded
          // Update class's properties to php data
          this.id = res.id
          this.owner = res.owner
          this.title = res.title
          this.desc = res.desc
        }
        else if (res.status == 'FAIL') {
          alert('klarte ikke hente spillelisteinfo')
        }
      })

  }

  displayVideosForDropdown(e) {
    fetch(`${window.MyAppGlobals.serverURL}api/videoList.php`)
      .then(res => res.json()) // When a reply has arrived
      // .then(json => console.log(json)) // When a reply has arrived
      .then(data => {
        this.videosInfo = data;
      })
  }

  /**
   * Create a promise that will resolve after the given time.
   *
   * @param  Number sec how long (in seconds) to wait before resolving the promise
   * @return Promise will be resolved when the desired time has passed
   */
  timer(sec) {
    return new Promise((resolve, reject) => {
      window.setTimeout(resolve, sec * 1000);  // Resolve when time has passed
    });
  }

}

customElements.define('playlist-view', PlaylistView);