import React,{useState,useEffect} from "react";
import { ListGroup,ListGroupItem } from "react-bootstrap";
import './StructuredMatch.css'
import { Link } from "react-router-dom";

function StructuredtMatch(){
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [show, setShow] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) =>{
        setSearchTerm(e.target.value);
        setShow(false);

        setError("");
    }

    const fetchData = async () =>{
        const keywords = searchTerm.split(",").map(k => k.trim())
        const searchQuery = keywords.map(k => `keywords=${k}`).join('&');
        
        if (keywords.length !== 4) {
            setError("Use 4 keywords exactly");
            setResults([]);
            setShow(true);
            return;
        }
        
        
        try{
            const response = await fetch(`http://localhost:5001/api/titles/search?${searchQuery}&SearchType=structured`)
            
            if(!response.ok){
                if(response.status === 404){
                    setError("No results found");
                }else{
                    setError("An error occured while fetching data");
                }

                setResults([]);
                setShow(false);
                return;
            }

            const data = await response.json();
            setResults(data);
            setError("");
            setShow(true);
        }catch(error){
            
            console.log(error);
            setError(error);
            setResults([]);
            setShow(false);
        }
    };
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        fetchData();
    }
    
    return(
        <div className="mb-3">
            <h3 className="mb-1">Structured Search for Title</h3>
            <small className="fst-italic lighter">Search for title, with keywords that might be relevant within the title, the plot, the character or the person.</small>
            <form onSubmit={handleSubmit} className="form-control form-control-lg mb-1">
                <input className="form-control-plaintext" type="text" placeholder="title, plot, character, person" value={searchTerm} onChange={handleChange}></input>
            </form>
            
            <ListGroup>
                {error && <ListGroupItem className="error">{error}</ListGroupItem>}
                {show && results.length> 0 && results.map( t => (
                    <ListGroupItem key={t.tconst}>
                        <Link to={`/Title/${t.tconst}`}>{t.primary_title}</Link>
                        
                    </ListGroupItem>
                ))}
                {show && results.length===0 && !error && (
                    <ListGroupItem>No results found</ListGroupItem>
                )}
            </ListGroup>
        </div>
    );
}

export default StructuredtMatch;