import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  static PropTypes = {
    books:PropTypes.object.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  }

  render(){
    const {books, onUpdateShelf} = this.props
    let booksToShow

    if(books !== undefined){
      booksToShow = books
    }else{
      booksToShow = []
    }
    return(
      <ol className="books-grid">
        {booksToShow.map((book) => (
          <div className="book" key={book.id}>
            <div className="book-top">
              <div className="book-cover" style={{ backgroundImage: `url("${book.imageLinks.smallThumbnail}")` }}></div>
              <div className="book-shelf-changer">
                <select defaultValue={book.shelf || "none"} onChange={(event) => onUpdateShelf(event.target.value, book)} >
                  <option value="none" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
          </div>
        ))}
      </ol>
    )
  }
}
export default Book
