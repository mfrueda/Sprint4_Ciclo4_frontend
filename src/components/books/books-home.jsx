import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"


const labels = [
    "#",
    "Book's Name",
    "Author's Name",
    "Year",
    "Read At",
    "Action"
]

const BooksHome = () => {
    const [books, setBooks] = useState(null)
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        const userId = "63857941aa0cb09677c30304"
        console.log(`https://backendmintic-production.up.railway.app/books?userId=${userId}`)
        axios  
            .get(`https://backendmintic-production.up.railway.app/books?userId=${userId}`)
            .then((response) => {
                console.log(response.data)
                setBooks(response.data)
            }).catch(err=>{console.log(err)})

    }, [update])

    const deleteClick = (bookId) => {
        axios
            .delete(`https://backendmintic-production.up.railway.app/books/delete/${bookId}`)
            .then(response => {
                console.log(response.data)
                setUpdate(!update)
            })
    }

    return (
        <>
            <div className="books-home">
                <Link className="btn btn-primary books-home__create" to='/books/new'>Create</Link>
                <table className="table">
                    <thead>
                        <tr>
                            {labels.map((label, index) => {
                                return (<th key={index} scope="col">{label}</th>)
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {books !== null ? books.map((book, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">
                                        <Link to={'/books/' + book._id}>{index}</Link>
                                    </th>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.year}</td>
                                    <td>{book.readAt}</td>
                                    <td className="d-flex gap-2 justify-content-center">
                                        <Link className="btn btn-success" to={'/books/' + book._id + '/edit'}>Edit</Link>
                                        <a className="btn btn-danger" onClick={() => deleteClick(book._id)}>Delete</a>
                                    </td>
                                </tr>)
                        }) : ''}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default BooksHome