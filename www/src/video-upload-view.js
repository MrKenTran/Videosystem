import { LitElement, html, css } from 'lit-element'

import store from './redux/store/index';

class VideoUploadView extends LitElement {
  static get properties() {
    return {

    }
  }

  static get styles() {
    return css`
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

      /* Specify the tag's width so that the other tags
      on the same line starts at the same x-axis */
      label {
        display: inline-block;
        width: 6em;
      }

      input {
        width: 15em;
      }

      /* Since the submit button doesn't have
      a 6em width label, add a margin-left instead */
      button {
        margin-left: 7em;
      }
    `;
  }

  constructor() {
    super();
    /* Get user logged in status from server.
    Sometimes the session expires without you
    noticing, so it's nice to provide feedback to
    user when this happens */
    fetch(`${window.MyAppGlobals.serverURL}api/loginStatus.php`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(res => {
        if (!res.loggedIn) { // User is not logged in
          alert('Du må være logget inn som lærer eller admin for å laste opp videoer')
        }
        if (res.utype == 'student') { // User doesn't have the privileges to use this function
          alert('Du å være lærer eller admin for å bruke denne funksjonen')
        }
      })
  } // constructor

  render() {
    return html`
      <div class="card">
        <h1>Last opp video</h1>
        <form class="upload-video" method="post" enctype="multipart/form-data" onsubmit="javascript: return false">
          <!-- The owner id will be added in php -->  

          <label for="title">Tittel</label>
          <input type="text" id="title" name="title" required> (må fylles ut)<br>

          <label for="course">Emne</label>
          <input type="text" id="course" name="course"><br>

          <label for="topic">Tema</label>
          <input type="text" id="topic" name="topic"><br>

          <label for="desc">Beskrivelse</label>
          <textarea id="desc" name="desc"></textarea><br>

          <input type="hidden" id="likes" name="likes" value="0">
          <input type="hidden" id="thumbnail" name="thumbnail" value="1">

          <label for="videoFile" accept="video/*">Video</label>
          <input type="file" name="videoFile" id="videoFile"> (må velges)<br>

          <label for="transFile">Transkript</label>
          <input type="file" name="transcriptFile" id="transFile"><br>
          
          <button @click="${this.uploadVideo}">Last opp video</button>
        </form>
      </div>
    `;
  }

  uploadVideo(e) {
    const data = new FormData(e.target.form) // Wrap the form in a FormData object / Save user input in FormData object
    const values = [...data.values()]

    fetch(`${window.MyAppGlobals.serverURL}api/videoUpload.php`, {
      method: 'POST',
      credentials: "include",
      body: data
    }
    ).then(res=>res.json()) // When a reply has arrived
      // .then(json => console.log(json)) // When a reply has arrived
    .then(res=>{
      if (res.status == 'SUCCESS') { // Succesfully video uploaded
        alert('Video er lastet opp')
      }
      else if (res.status == 'DB-FAIL') {
        alert('Video ble ikke lastet opp')
      }
      else if (res.status == 'FORM-FAIL') {
        alert('Badbadbad: Ingen fil fra form submission ble registrert')
      }
    })
  } // uploadVideo


} // class VideoUploadView

customElements.define('video-upload-view', VideoUploadView);