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
class VideoPlayer extends LitElement {
  static get properties() {
    return {
      videofile: { type: String },
      videotype: { type: String },
      vttfile: { type: String },
      cues: { type: Array }
    };
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
        }

        video, p {
          width: 100%;
        }
    `];
  }

  constructor() {
    super();
    this.cues = [];
  }

  render() {
    return html`
      <video src="${this.videofile}" type="${this.videotype}" controls>
        <!-- The attributes src and type has to be in the video-tag,
        and not in a source tag within the video, a la this: -->
        <!-- <source src="$ {this.videofile}" type="$ {this.videotype}"> -->

        <!-- using source tag with attributes will only work if
        videofile in video-view.js is a string composed of plain text,
        without variables, like this: -->
        <!-- <video-player videofile="../videos/3/33" […]></video-player> -->
        <track kind="subtitles" label="English subtitles" src="${this.vttfile}" srclang="en" default></track>
      </video>
    `;
  }

  /**
   * Set the current time of the video to the given time.
   *
   * @param {[Number]} time the time to set as the current time.
   */
  setTime(time) {
    this.shadowRoot.querySelector('video').currentTime = time;
  }

  /**
   * When the video has been added to the DOM an event listener listening for
   * load events is added to the track element (containing the vtt source).
   * This is used to get the cues as soon as a vtt file is loaded, this is then
   * made available to container tags through dispatching a "cuesUpdated" event.
   *
   * The subtitle track is hidden from the video and then an eventListener is
   * added to the subtitle track so that we can dispatch a cuechange event
   * when cues are activated/deactivated.
   */

  firstUpdated(e) {
    const track = this.shadowRoot.querySelector('video track');
    track.addEventListener('load',e=>{                       // vtt file is loaded
      this.cues = [];
      const trackCues = e.path[0].track.cues;
      for (let i=0; i<trackCues.length; i++) {               // Go through the cue list
        this.cues.push({text: trackCues[i].text, id: trackCues[i].id, startTime: trackCues[i].startTime});
      };
      // console.log (this.cues);
      this.dispatchEvent(new CustomEvent("cuesUpdated", {
        bubbles: true,
        composed: true,
        detail:{
          cues:this.cues
        }
      }));
    });
    this.shadowRoot.querySelector('video').textTracks[0].mode='hidden';
    this.shadowRoot.querySelector('video').textTracks[0].addEventListener('cuechange', e=>{   // When a cue change event occurs
      // console.log(e);
      const startTimes = [];
      for (let i=0; i<e.target.activeCues.length; i++) {
        startTimes.push(e.target.activeCues[i].startTime);
      }
      this.dispatchEvent(new CustomEvent('cuechange', {
        bubbles: true,
        composed: true,
        detail: {
          activeCues: startTimes
        }
      }));
    });
  }
}

customElements.define('video-player', VideoPlayer);
