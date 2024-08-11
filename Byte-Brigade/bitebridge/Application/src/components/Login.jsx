import React from "react";
import "./Login.css";

export default function Login() {
  return (
    <div>
      <div className="mainFormDiv">
        <form>
          <table>
            <tr>
              <td>
                <label htmlFor="id">Enter User-ID:</label>
              </td>
              <td>
                <input type="text" name="id" placeholder="240340120001" />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="pwd">Enter Password</label>
              </td>
              <td>
                <input type="password" name="pwd" />
              </td>
            </tr>
          </table>
          <br />
        </form>
      </div>
    </div>
  );
}
