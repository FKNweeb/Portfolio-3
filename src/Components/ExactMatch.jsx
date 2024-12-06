import React,{useState,useEffect} from "react";
import { ListGroup,ListGroupItem } from "react-bootstrap";

function ExactMatch(){
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [show, setShow] = useState(false);

    const handleChange = (e) =>{
        setSearchTerm(e.target.value);
        setShow(false);
    }

    const fecthData = () =>{
        const keywords = searchTerm.split(",").map(k => k.trim())
        const searchQuery = keywords.map(k => `keywords=${k}`).join('&');
        console.log(searchQuery)
        try{
            fetch(`http://localhost:5001/api/titles/search?${searchQuery}&SearchType=exactmatch`)
            .then( res => res.json())
            .then( data => setResults(data))
            .catch(err => console.log(err))
        }catch{

        }
    } 
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        fecthData();
        setShow(true);
    }

    return(
        <div className="mb-3">
            <h3 className="mb-1">Exact Match</h3>
            <small className="fst-italic lighter">Search for keywords that are relevant with the title.</small>
            <form onSubmit={handleSubmit} className="form-control form-control-lg mb-1">
                <input className="form-control-plaintext" type="text" placeholder="best-match" value={searchTerm} onChange={handleChange}></input>
            </form>
            <ListGroup>
                {show && results.slice(0, 5).map( t => (
                    <ListGroupItem key={t.tconst}>
                        {t.primary_title}
                    </ListGroupItem>
                ))}
            </ListGroup>
        </div>
    );
}

export default ExactMatch;