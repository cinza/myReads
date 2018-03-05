import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './components/ListBooks'
import Search from './components/Search'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books:[]
  }

  componentDidMount(){

    BooksAPI.getAll().then((books) =>{
      this.setState({
        books:books
      })

    });
  }


  updateBook = (shelf, book) => {
    BooksAPI.update(book, shelf).then(() => {
      const {books} = this.state
      let bookInShelf = books.find(b => book.id === b.id)

      if(!bookInShelf){
        book.shelf = shelf
        this.setState( state => ({
          books: state.books.concat([book])
        }))

      }else{
        bookInShelf.shelf = shelf
        this.setState({
          books:books
        })
      }
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state.books}
            onUpdateShelf={this.updateBook}>

          </ListBooks>
        )}/>
        <Route path="/search" render={() => (
          <Search onUpdateShelf={this.updateBook} books={this.state.books}>
          </Search>
        )}/>
      </div>
    )
  }
}

export default BooksApp
