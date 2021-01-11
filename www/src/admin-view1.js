import { LitElement, html, css } from 'lit-element';

class AdminView1 extends LitElement {
  static get properties() {
    return {
      users: {
        type: Array
      }
    }
  }



  constructor() {
    super();
    this.users = [];
    fetch(`${window.MyAppGlobals.serverURL}api/userList.php`)
      .then(res => res.json())
      .then(data => {
        this.users = data;
      });
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
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
      
      label {
        display: inline-block;
        width: 5em;
      }
      input {
        width: 15em;
      }
      
      input[type="submit"] {
        width: 15em;
        margin-top: 10px;
        margin-left: 4em;
      }
      
      /* CSS used for formating the table used to present a list of contacts */
      td {
        width: 12em;
      }
      
      table {
        border-collapse: collapse;
      }
      
      thead tr th {
        border-bottom: 1px solid black;
        text-align: left;
      }
      
      tbody tr:nth-child(even) {
        background-color: #EEE;
      }
      
      th, td {
        padding: 5px 10px;
      }
      
      td:first-child {
        width: 20px;
        padding-right: 5px;
      }
      .editIcon {
        height: 20px;
      }
      
      /* Do not show editing icon on search result page */
      .searchresult td:first-child {
        width: 0px;
        padding: 0;
      }
      .searchresult th:first-child {
        padding: 0;
      }
      .searchresult .editIcon {
        display: none;
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
`;
  }

  render() {
    return html`
      <div class="card">
        <h1>Rediger brukere</h1>
        <table>
          <thead>
            <tr>
              <th>
              </th>
              <th>Brukernavn</th>
              <th>passord</th>
              <th>userType</th>
            </tr>
          </thead> 
          <tbody>
            ${this.users.map(user => {
              return html`
                <tr>
                  <td>
                    <button @click="${() => {
                      // save id value in localStorage so it doesn't reset when we arrive at admin2 page
                      localStorage.setItem('userid', user.id)
                      location.href = 'admin2'
                    }}">
                      Rediger
                    </button>
                  </td>
                  <td>${user.uname}</td>
                  <td>${user.pwd}</td>
                  <td>${user.type}</td>
                </tr>
              `;
            })}
          </tbody>
        </table>
      </div>`;
  }
} // class AdminView1


customElements.define('admin-view1', AdminView1);
