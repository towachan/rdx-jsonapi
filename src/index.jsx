import React, { Component } from "react"
import { render } from "react-dom"
import { createStore, applyMiddleware, combineReducers } from "redux"
import thunkMiddleware from "redux-thunk"
import { createLogger } from "redux-logger"
import { connect } from "react-redux"
import {
  reducer as api,
  setEndpointHost,
  setEndpointPath,
  setHeader,
  readEndpoint,
  createEntity,
  updateEntity,
  deleteEntity
} from "redux-json-api"

const loggerMiddleware = createLogger()

const reducer = combineReducers({
  api
})

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
)

const mapStateToProps = state => ({
  api: state.api
})

const mapDispatchToProps = dispatch => ({
  sendReq: (host, path, data, endpoint, reqType) => {
    store.dispatch(setEndpointHost(host))
    store.dispatch(setEndpointPath(path))
    if (reqType === "GET") {
      store.dispatch(readEndpoint(endpoint))
    }
    if (reqType === "POST") {
      store.dispatch(createEntity(JSON.parse(data)))
    }
    if( reqType === "PATCH") {
      store.dispatch(updateEntity(JSON.parse(data)))
    }
    if( reqType === "DELETE") {
      store.dispatch(deleteEntity(JSON.parse(data)))
    }
  }
})

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

const Container = connect(mapStateToProps, mapDispatchToProps)(requestFields)

render(<Container store={store} />, document.getElementById("root"))
