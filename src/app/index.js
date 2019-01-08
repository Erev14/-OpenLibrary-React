// import React from "react";
// import ReactDom from "react-dom";
import "@babel/polyfill";
import React, { Component } from "react";
import { render } from "react-dom"

import App from "./app"
import data from './data.json';

const headings = ["When", "Who", "Description"];

render(<App data={data} title="OpenLibraryAPI" headings={headings}/> , 
    document.getElementById('app'));