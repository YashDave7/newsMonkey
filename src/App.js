import './App.css';

import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API
  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({progress: progress})
  }
  render() {
    return (
      <div>
        <Router>

          <Navbar />
          <LoadingBar color='black' height={4} progress={this.state.progress}  />
          {/* <News setProgress={this.setProgress} apiKey={this.apiKey}  country={"in"} category={"sports"} pagesize={6} /> */}
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="general" country={"in"} category={"general"} pagesize={6} />} ></Route>
            <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="business" country={"in"} category={"business"} pagesize={6} />} ></Route>
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="entertainment" country={"in"} category={"entertainment"} pagesize={9} />} ></Route>
            <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="health" country={"in"} category={"health"} pagesize={6} />} ></Route>
            <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="science" country={"in"} category={"science"} pagesize={6} />} ></Route>
            <Route exact path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="sports" country={"in"} category={"sports"} pagesize={6} />} ></Route>
            <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="technology" country={"in"} category={"technology"} pagesize={6} />} ></Route>
          </Routes>
        </Router>
      </div>
    )
  }
}
