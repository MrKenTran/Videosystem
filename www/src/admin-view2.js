import { LitElement, html, css} from 'lit-element';
 
class  AdminView2 extends LitElement {
  static get properties () {
    return {
      user: {
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
      width: 23em;
    }

    ul li span:nth-of-type(2) {
      display: inline-block;
      width: 14em;
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

  constructor () {
    super();
    this.user = [];
    var info = { id: localStorage.getItem('userid') }
    console.log('info: ', info)
    fetch (`${window.MyAppGlobals.serverURL}api/user.php`, {
      method: 'POST',
      headers: { "Content-type": "application/x-www-form-urlencoded" },
      body: this.formEncode(info)
    })
    .then(res=>res.json())
    .then(data=>{
      this.user = data;
    });
  }

  render() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          padding: 10px;
        }
      </style>

      <div class="card">
      ${this.user.map(us => {
        return html`
          <h1>Rediger bruker</h1>
          <p>${us.uname} er ${us.type}</p>
          <form method="POST" onsubmit="javascript: return false">
            <label for="usertype">Sett ny brukertype:</label><br>
            <input type="hidden" name="id" value="${us.id}">
            <select name="type" id="usertype">
              <option value="student">Student</option>
              <option value="teacher">Lærer</option>
              <option value="admin">Admin</option>
            </select><br>
            <button @click="${this.userEdit}">Lagre</button>
          </form>
        `
        })}
      </div>
    `;
  }

  userEdit(e) {
    const data = new FormData(e.target.form) // Wrap the form in a FormData object / Save user input in FormData object
    const values = [...data.values()]
    console.log('values: ', values)
    
    fetch(`${window.MyAppGlobals.serverURL}api/userEdit.php`, {
      method: 'POST',
      credentials: "include",
      body: data
    }
    ).then(res=>res.json()) // When a reply has arrived
    // .then(json => console.log(json)) // When a reply has arrived
    .then(res=>{
      if (res.status=='SUCCESS') {
        alert('Ny brukertype ble satt.')
      }
      else {
        alert('Ny brukertype ble ikke satt.')
      }
    })
  }

}


customElements.define('admin-view2', AdminView2);
