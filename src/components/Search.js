import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'

class Search extends Component{
  static PropTypes = {
    books: PropTypes.object.isRequired,
    onUpdateShelf: PropTypes.func.isRequired,
    getBookShelf: PropTypes.func.isRequired
  }

  state = {
    booksSearch:[],
    foundBook:true
  }

  updateQuery = (query) =>{

    if(query){
      BooksAPI.search(query, 1000).then((books)=> {
        if(books.error == undefined){
          books.map((book) => {
            const bookInShelf = this.props.getBookShelf(book.id);
             if (bookInShelf) {
               book.shelf = bookInShelf.shelf
             }else{
               book.shelf = 'none'
             }
             return book
          })
          this.setState({
            booksSearch:books,
            foundBook:true
          })
        }else{
          this.setState({
            booksSearch:[],
            foundBook:false
          })
        }
      })

    }else{
      this.setState({
        booksSearch:[],
        foundBook:false
      })
    }
  }


  render(){
    const {booksSearch, foundBook} = this.state
    const {books, onUpdateShelf} = this.props


    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author"
              onChange={(event) => this.updateQuery(event.target.value)}
            />

          </div>
        </div>

        {foundBook ? (
          <div className="search-books-results">
            <Book
              onUpdateShelf={onUpdateShelf}
              books={this.state.booksSearch}>
              </Book>
          </div>

        ):(
          <div className="search-books-results">
            <p>Not found</p>
          </div>
        )}
      </div>
    )
  }
}

export default Search
