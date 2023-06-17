import './App.css';

import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>

          <Navbar />
          {/* <News country={"in"} category={"sports"} pagesize={6} /> */}
          <Routes>
            <Route exact path="/" element={<News key="general" country={"in"} category={"general"} pagesize={6} />} ></Route>
            <Route exact path="/business" element={<News key="business" country={"in"} category={"business"} pagesize={6} />} ></Route>
            <Route exact path="/entertainment" element={<News key="entertainment" country={"in"} category={"entertainment"} pagesize={6} />} ></Route>
            <Route exact path="/health" element={<News key="health" country={"in"} category={"health"} pagesize={6} />} ></Route>
            <Route exact path="/science" element={<News key="science" country={"in"} category={"science"} pagesize={6} />} ></Route>
            <Route exact path="/sports" element={<News key="sports" country={"in"} category={"sports"} pagesize={6} />} ></Route>
            <Route exact path="/technology" element={<News key="technology" country={"in"} category={"technology"} pagesize={6} />} ></Route>
          </Routes>
        </Router>
      </div>
    )
  }
}
