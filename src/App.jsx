import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { prettyPrintJson } from "pretty-print-json";

import logo from "/gears-solid.svg";
import serverIconPath from "./assets/server-solid.svg";

import "./App.css";

import store from "./store";

function App() {
    const dispatch = useDispatch();
    const [val, setVal] = useState(1);
    const [res, setRes] = useState("");
    const state = useSelector((state) => state["time"]);
    useEffect(() => {
        async function call() {
            const val = await fetch("http://localhost:3000/api/open");
            // setRes(JSON.stringify(val));
            const val2 = await val.json();
            // console.log(val, val2);
            setRes(JSON.stringify(val2));
        }

        call();
    }, []);
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
                    {/* <code id="time-send-val">{state.request}</code> */}
                    <input id="time-send-input" />
                    {/* usage */}
                    <h4 id="time-send-example">Select example usage</h4>
                    <ul id="time-send-list">
                        <li className="time-send-list-item">
                            <code>/api/1690402538837</code>
                        </li>
                        <li className="time-send-list-item">
                            <code>/api/Wed, 26 Jul 2023 20:15:38 GMT</code>
                        </li>
                    </ul>

                    <button id="time-send-submit">Send Request</button>
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
