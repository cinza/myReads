import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import { Link } from 'react-router-dom'

const ListBooks = ({books, onUpdateShelf}) =>{
  let currentlyReading = books.filter(b => b.shelf === 'currentlyReading')
  let wantToRead = books.filter(b => b.shelf === 'wantToRead')
  let read = books.filter(b => b.shelf === 'read')

  return(
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <Book
                onUpdateShelf={onUpdateShelf}
                books={currentlyReading}>

              </Book>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to read</h2>
            <div className="bookshelf-books">
              <Book
                onUpdateShelf={onUpdateShelf}
                books={wantToRead}>

              </Book>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <Book
                onUpdateShelf={onUpdateShelf}
                books={read}>

              </Book>
            </div>
          </div>

        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  )
}
ListBooks.propTypes = {
  books: React.PropTypes.array.isRequired,
  onUpdateShelf: React.PropTypes.func.isRequired
}
export default ListBooks
