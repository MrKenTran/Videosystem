import { LitElement, html, css } from 'lit-element'
import '@polymer/iron-icon/iron-icon.js';

class PlaylistContent extends LitElement {
  static get properties() {
    return {
      playlist: {
        type: Number
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

      ul {
        list-style-type: none;
      }

      ul li span:first-of-type {
        display: inline-block;
        width: 27em;
      }

      ul li span:nth-of-type(2) {
        display: inline-block;
        width: 20em;
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
      
      /* style from shared-styles */
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
    `;
  }

  constructor() {
    super();
    this.videosInfo = []
    
    var info = { id: localStorage.getItem('id') } // Receive id for chosen playlist in playlist-list-view
    fetch(`${window.MyAppGlobals.serverURL}api/contentList.php`, {
      method: 'POST',
      headers: { "Content-type": "application/x-www-form-urlencoded" },
      body: this.formEncode(info) // send info to php file
    })
      .then(res => res.json()) // When a reply has arrived
      // .then(text => console.log(text)) // When a reply has arrived
      .then(data => {
        // Update class's properties to php data
        this.videosInfo = data
      })

  } // constructor

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
      <p>Refresh siden hvis du nylig har lagt til en video</p>
      <ul>
        ${this.videosInfo.map(vidInfo => {
          /* The videosInfo array consists of one array, this one containing the information
          we can print out, we need to iterate this sub-array in order to get access to the
          values */ 
          return html`
            ${vidInfo.map(vInf => {
              return html`
                <button type="button" name="video" @click="${() => {
                  // save id value in localStorage so it doesn't reset when we arrive at video-page 
                  localStorage.setItem('id', vInf['id'])
                  location.href = 'video' // head user to video page
                }}">
                  <li>
                    <span class="black">${vInf['title']}</span><br>
                    <span class="gray">${vInf['course']}, ${vInf['topic']}</span>
                  </li>
                </button>
              `
            })}
          `
        })}
      </ul>

    `;
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

customElements.define('playlist-content', PlaylistContent);