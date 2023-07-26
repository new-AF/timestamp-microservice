import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import logo from "/gears-solid.svg";
import "./App.css";

function App() {
    const dispatch = useDispatch();
    const { request, json } = useSelector((state) => state["time"]);
    return (
        <>
            <header id="header" className="global-text-center">
                <h1 id="header-h1">Timestamp (micro)service</h1>
                <img id="header-img" src={logo} />
            </header>

            <section id="time">
                <h2
                    id="time-headerUsage"
                    className="time-header global-text-center"
                >
                    Usage
                </h2>
                <ul id="time-usage">
                    <li>
                        <code>/api/1690402538837</code>
                    </li>
                    <li>
                        <code>/api/Wed, 26 Jul 2023 20:15:38 GMT</code>
                    </li>
                </ul>

                <h2
                    id="time-headerRquest"
                    className="time-header global-text-center"
                >
                    Request received
                </h2>
                <code id="time-request">{request}</code>
                <h2
                    id="time-headerResponse"
                    className="time-header global-text-center"
                >
                    Response sent (JSON)
                </h2>
                <code id="time-response">{JSON.stringify(json)}</code>
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
