import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { prettyPrintJson } from "pretty-print-json";
import { setInput } from "./timeSlice";

import logo from "/gears-solid.svg";
import serverIconPath from "./assets/server-solid.svg";

import "./App.css";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { callServer } from "./timeSlice";

function App() {
    const dispatch = useDispatch();
    const [val, setVal] = useState(1);
    const [res, setRes] = useState("");
    const button = useRef(null);
    const state = useSelector((state) => state["time"]);
    function onChange(event) {
        const text = event.target.value;
        dispatch(setInput(text));
    }
    /* it seems <li> elements do not handle onClick properly */
    function onLiClick(event) {
        /* from testing event.currentTarget *is* li */
        const target = event.target;
        const currentTarget = event.currentTarget;
        // console.log({ target, currentTarget});
        const children = currentTarget.children;
        // return;
        const code = children[0];
        const text = code.textContent;
        dispatch(setInput(text));
    }
    function onKeyDown(event) {
        if (event.key.toLowerCase() === "enter") {
            button.current.click();
        }
    }
    /* submit button */
    function submitButtonOnClick(event) {
        dispatch(callServer(state.input));
    }

    return (
        <>
            <header id="header" className="global-text-center">
                <img id="header-img" src={logo} />
                <h1 id="header-h1">Timestamp (micro)service</h1>
            </header>
            <h1 id="debug">{res}</h1>
            <section id="time">
                {/* send request */}
                <article id="time-send">
                    <h3
                        id="time-send-header"
                        className="time-header global-text-center"
                    >
                        Request
                    </h3>
                    {/* <code id="time-send-val">{state.input}</code> */}
                    <input
                        id="time-send-input"
                        value={state.input}
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                    />
                    {/* usage */}
                    <h4 id="time-send-example">Click example usage</h4>
                    <ul id="time-send-list">
                        <li className="time-send-list-item" onClick={onLiClick}>
                            <code>/api/1690402538837</code>
                        </li>
                        <li className="time-send-list-item" onClick={onLiClick}>
                            <code>/api/Wed, 26 Jul 2023 20:15:38 GMT</code>
                        </li>
                    </ul>

                    <button
                        id="time-send-submit"
                        onClick={submitButtonOnClick}
                        ref={button}
                    >
                        Send Request
                    </button>
                </article>

                {/* hr1 */}
                <hr id="time-hr1" className="time-hr" />
                {/* server imaage */}
                <article id="time-server">
                    <h4 id="time-server-header">Server</h4>
                    <img id="time-server-img" src={serverIconPath} />
                </article>

                {/* hr2 */}
                <hr id="time-hr2" className="time-hr" />

                {/* receive response */}
                <article id="time-response">
                    <h3
                        id="time-response-header"
                        className="time-header global-text-center"
                    >
                        Response (JSON)
                    </h3>
                    <pre
                        id="time-response-val"
                        className="json-container"
                        dangerouslySetInnerHTML={{
                            __html: prettyPrintJson.toHtml(state.json),
                        }}
                    ></pre>
                </article>
            </section>

            <footer id="footer" className="global-text-center">
                <small id="footer-small">
                    <span id="footer-small-by">by</span>
                    <a id="footer-small-link" href="https://github.com/new-AF">
                        Abdullah Fatota
                    </a>
                </small>
            </footer>
        </>
    );
}

export default App;
