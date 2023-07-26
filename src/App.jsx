import { useState } from "react";
import logo from "/gears-solid.svg";
import "./App.css";

function App() {
    return (
        <>
            <header id="header" className="global-text-center">
                <h1 id="header-h1">Timestamp (micro)service</h1>
            </header>

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
