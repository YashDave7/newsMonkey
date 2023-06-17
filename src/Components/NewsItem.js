import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, author, newsUrl, date, source} = this.props;
    return (
      <div className='my-3'>
        <div className="card" style={{minHeight:"600px"}}>
          <img className="card-img-top" src={!imageUrl?"https://www.euractiv.com/wp-content/uploads/sites/2/2014/03/news-default.jpeg":imageUrl} alt="Card image cap" />
            <div className="card-body">
              <p style={{fontSize:"13px", padding:"6px", cursor:"default", backgroundColor:"rgb(210, 212, 215)"}} className="card-text btn btn-sn">{source}</p>
              {/* <p style={{fontSize:"13px", padding:"6px", marginLeft:"6px", cursor:"default"}} className="card-text btn btn-sn btn-dark">{date.slice(0,10)}</p> */}

              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{description}...</p>
              <a href={newsUrl} target='_blank' className="btn btn-sn btn-dark" style={{fontSize:"13px", padding:"6px"}}>Read more...</a>
              <p className="card-text" style={{color:"grey", paddingTop:"10px"}}><i>Published by <strong>{author}</strong> on  <strong>{new Date(date).toGMTString()}</strong></i></p>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
