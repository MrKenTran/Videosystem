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
class VideoComments extends LitElement {
  static get properties() {
    return {
      comments: {
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
        }
    `];
  }

  constructor() {
    super()
    this.comments = []

    var info = { id: localStorage.getItem('id') } // Receive id for chosen video in video-list-view
    fetch(`${window.MyAppGlobals.serverURL}api/commentList.php`, {
      method: 'POST',
      headers: { "Content-type": "application/x-www-form-urlencoded" },
      body: this.formEncode(info) // send info to php file
    })
      .then(res => res.json()) // When a reply has arrived
      // .then(json => console.log(json)) // When a reply has arrived
      .then(data => {
        this.comments = data;
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
      <h2>Kommentarer</h2>
      <form method="POST" onsubmit="javascript: return false">
        <!-- The owner id will be added in php -->
        <input type="hidden" name="video" value="${this.video}">
        <textarea name="content" id="content" cols="34" rows="6"></textarea><br>

        <button @click="${this.postComment}">Kommenter</button>
      </form>

      <ul>
        ${this.comments.map(comment => {
          return html`
            <li>${comment.content}</li>
          `;
        })}
      </ul>
    `;
  }

  postComment(e) {
    const data = new FormData(e.target.form) // Wrap the form in a FormData object / Save user input in FormData object
    const values = [...data.values()]
    
    fetch(`${window.MyAppGlobals.serverURL}api/commentPost.php`, {
      method: 'POST',
      credentials: "include",
      body: data
    }
    ).then(res => res.json()) // When a reply has arrived
      // .then(json => console.log(json)) // When a reply has arrived
      .then(res => {
        if (res.status == 'SUCCESS') { // Succesfully comment posted
          alert('Kommentar er lagt til')
        }
        else if (res.status == 'FAIL') {
          alert('Kommentar ble ikke lagt til')
        }
        else if (res.status == 'OFFLINE-USER') {
          alert('Logg inn for å kommentere')
        }
      })
  }

} // class VideoComments

customElements.define('video-comments', VideoComments);
