import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import propTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  static defaultProps = {
    country: 'in',
    page: 1,
    category: 'general'
  }

  static propTypes = {
    country: propTypes.string,
    pagesize: propTypes.number,
    category: propTypes.string
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    // console.log("Hello I am a constructor from News Component.");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title = `NewsMonkey - ${this.capitalizeFirstLetter(this.props.category)}`;
  }


  async updateNews() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pagesize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(40);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePreviousClick = async () => {
    this.setState({ page: this.state.page - 1 })
    this.updateNews();
  }

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 })
    this.updateNews();
  }


  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pagesize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
    })
  };

  render() {
    return (
      <>
        <h2 className='text-center'>NewsMonkey - {this.props.category === "general" ? "Top Headlines" : `Top ` + this.capitalizeFirstLetter(this.props.category) + ` Headlines`}</h2>
        { this.state.loading && <Spinner/> }

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">

            <div className="row">
              {this.state.articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description.slice(0, 140) : ""} imageUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} source={element.source.name} author={element.author ? element.author : "Unknown"} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container my-5 d-flex justify-content-between">
            <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / (this.props.pagesize))} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div> */}
      </>
    )
  }
}

export default News
