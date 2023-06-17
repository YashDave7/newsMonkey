import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import propTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country: 'in',
    page: 9,
    category: 'general'
  }

  static propTypes = {
    country: propTypes.string,
    pagesize: propTypes.number,
    category: propTypes.string
  }
  
  constructor() {
    super();
    // console.log("Hello I am a constructor from News Component.");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    }
  }
  
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=526ccd38eae04ecd9f1a0c83e77f1d1f&page=1&pageSize=${this.props.pagesize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ 
      articles: parsedData.articles, 
      totalResults: parsedData.totalResults,
      loading: false
     })
  }

  handlePreviousClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=526ccd38eae04ecd9f1a0c83e77f1d1f&page=${this.state.page - 1}&pageSize=${this.props.pagesize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({loading: false});
    this.setState({
      articles: parsedData.articles,
      page: this.page - 1
    })
  }

  handleNextClick = async () => {
    if( this.state.page+1 > Math.ceil(this.state.totalResults/(this.props.pagesize))) {
      
    }
    else{
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=526ccd38eae04ecd9f1a0c83e77f1d1f&page=${this.state.page + 1}&pageSize=${this.props.pagesize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({loading: false});
      this.setState({
        articles: parsedData.articles,
        page: this.page + 1
      })
    }
  }

  render() {
    return (
      <div className='container my-5'>
        <h2>NewsMonkey - {this.props.category === "general"?"Top Headlines":this.props.category + ` Top Headlines`}</h2>
        { this.state.loading && <Spinner/> }
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description.slice(0, 140) : ""} imageUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} source={element.source.name} author={element.author ? element.author : "Unknown"} />
            </div>
          })}
        </div>
        <div className="container my-5 d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/(this.props.pagesize))} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
