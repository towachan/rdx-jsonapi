import React, { Component } from "react"

class requestFields extends Component {
  render() {
    return (
      <div>
        Data<br />
        <textarea
          name="req body"
          id=""
          cols="30"
          rows="10"
          ref={t => {
            this.data = t
          }}
        />
        <br />
        Host<br />
        <input
          type="text"
          ref={h => {
            this.host = h
          }}
        />
        <br />
        Endpoint Path<br />
        <input
          type="text"
          ref={e => {
            this.path = e
          }}
        />
        <br />
        Endpoint (only required for GET)<br />
        <input
          type="text"
          ref={i => {
            this.endpoint = i
          }}
        />
        <br />
        <select
          id=""
          ref={s => {
            this.reqType = s
          }}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PATCH">PATCH</option>
          <option value="DELETE">DELETE</option>
        </select>
        <br />
        <input
          type="button"
          value="Send"
          onClick={() => {
            this.props.sendReq(
              this.host.value,
              this.path.value,
              this.data.value,
              this.endpoint.value,
              this.reqType.value
            )
          }}
        />
        <br />
        <div
          ref={r => {
            this.resp = r
          }}
        >
        </div>
      </div>
    )
  }
}

export default requestFields
