import React,{useState,useEffect} from "react";
import { ListGroup,ListGroupItem } from "react-bootstrap";
import './StructuredMatch.css'
function StructuredtMatch(){
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [show, setShow] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) =>{
        setSearchTerm(e.target.value);
        setShow(false);
    }

    const fecthData = async () =>{
        const keywords = searchTerm.split(",").map(k => k.trim())
        const searchQuery = keywords.map(k => `keywords=${k}`).join('&');
        
        if (keywords.length > 4) {
            setError("Only use up to 4 keywords");
            setResults([]);
            setShow(false);
            return;
        }
        console.log(searchQuery)
        try{
            const response = fetch(`http://localhost:5001/api/titles/search?${searchQuery}&SearchType=structured`)
            .then( res => res.json())
            .then( data => setResults(data))
            .catch(err => console.log(err))
        }catch(error){
            setError("Only Use up to 4 keywords")
        }
    } 
    
    const handleSubmit = (e) =>{
        setResults([])
        e.preventDefault();
        fecthData();
        setShow(true);
    }
    
    return(
        <div className="mb-3">
            <h3 className="mb-1">Structured Search for Title</h3>
            <small className="fst-italic lighter">Search for keywords that might be relevant withint the title, the plot, the character or the person.</small>
            <form onSubmit={handleSubmit} className="form-control form-control-lg mb-1">
                <input className="form-control-plaintext" type="text" placeholder="title, plot, character, person" value={searchTerm} onChange={handleChange}></input>
            </form>
            {console.log(error)}
            <ListGroup>
                {!error ? (show && results.map( t => (
                    <ListGroupItem key={t.tconst}>
                        {t.primary_title}
                    </ListGroupItem>
                ))) : (<ListGroupItem className="error">{error}</ListGroupItem>)}
            </ListGroup>
        </div>
    );
}

export default StructuredtMatch;