import { LitElement, html, css } from 'lit-element'
import '@polymer/iron-icon/iron-icon.js';

// import the sub-components
import './video-player.js'
import './video-transcript.js'
import './video-comments.js'
import './video-in-playlists.js'

class VideoView extends LitElement {
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
      course: {
        type: String
      },
      topic: {
        type: String
      },
      desc: {
        type: String
      },
      likes: {
        type: Number
      }
    }
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      .grid-wrapper {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        grid-template-areas:
          "video"
          "cues"
          "comments";
      }

      .player {
        grid-area: video;
      }
      
      .transcript {
        grid-area: cues;
        overflow: hidden;
      }

      .comments {
        grid-area: comments;
      }

      video-transcript ul {
        width: 100%;
        background-color: #000;
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
        /* font-size: 22px; activating this will make h1 smaller than h2, which is just wrong */
      }
      
      @media only screen and (min-width : 1000px) {
        .grid-wrapper {
          display: grid;
          grid-template-columns: 50% 40%;
          grid-template-rows: auto auto;
          grid-template-areas:
            "video cues"
            "comments 1fr";
        }
      }

    `;
  }

  constructor() {
    super();
    this.displayVideo()
  } // constructor

  render() {
    return html`
      <div class="grid-wrapper">
        <div class="card player">
          <video-player videofile="../fileUploads/owner${this.owner}/video${this.id}/video"
                        videotype="video/mp4"
                        vttfile="../fileUploads/owner${this.owner}/video${this.id}/transcript"></video-player>
          <h1>${this.title}</h1>
          <p>
            Tema: <b>${this.topic}</b><br>
            Emne: <b>${this.course}</b>
          </p>
          <p>${this.desc}</p>
        </div>
        <div class="card transcript">
          <video-transcript></video-transcript>
        </div>
        <div class="card comments">
          <video-comments video="${this.id}"></video-comments>
        </div>
        <div class="card playlists">
          <video-in-playlists video="${this.id}"></video-in-playlists>
        </div>
      </div>
    `;
  }

  firstUpdated() {
    const video = this.shadowRoot.querySelector('video-player')
    video.addEventListener('cuesUpdated', e => {
      this.shadowRoot.querySelector('video-transcript').setAttribute('cues', JSON.stringify(e.detail.cues));
    });
    
  }

/**
 * formEncode() and certain parts
 * from displayVideo() are made by
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

  displayVideo(e) {
    var info = { id: localStorage.getItem('id') } // Receive id for chosen video in video-list-view
    fetch(`${window.MyAppGlobals.serverURL}api/video.php`, {
      method: 'POST',
      headers: { "Content-type": "application/x-www-form-urlencoded" },
      body: this.formEncode(info)
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
          this.course = res.course
          this.topic = res.topic
          this.desc = res.desc
        }
        else if (res.status == 'FAIL') {
        }
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

customElements.define('video-view', VideoView);