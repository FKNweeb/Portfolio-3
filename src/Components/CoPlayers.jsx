import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function CoPlayers(){
    const { slug } = useParams()
    const [players, setPlayers] = useState([])
    const [currentPage, setCurrentPage] = useState(1);

    
    useEffect(() => {
        const fetchCoPlayers = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/names/searchcoplayer/${slug}`);
                const data = await response.json();
                setPlayers(data)
            } catch (error) { console.error('Failed to fetch coPlayers', error)}
        }
        if (slug) fetchCoPlayers();
    }, [slug]);
    
    const itemsPerPage = 5;

    const handleNext = () => {
        setCurrentPage( prevPage => Math.min(prevPage + 1, totalPages));
    } 

    const handlePrevious = () => {
        setCurrentPage( prevPage => Math.max(prevPage - 1, 1));
    } 

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = players.slice(indexOfFirstItem, indexOfLastItem);
    
    const totalPages = Math.ceil(players.length / itemsPerPage);
    
    return(
        <div className="row">
        <h5>Co-players</h5>
        <div className="row d-flex justify-content-evenly">
            {currentItems.map((player, i)=> 
                <div key={i} className="col-12 col-sm-6 col-md-4 col-lg-2 mb-1">
                    <div className="card h-100">
                        <div className="card-body ">
                    <p>{player.p_name}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
        <div className="pagination justify-content-center" style={{ paddingBottom: '1rem' }}>
               <button onClick={handlePrevious} className="btn btn-secondary me-2" disabled={currentPage === 1}>
                Previous
               </button>
               <button onClick={handleNext} className="btn btn-secondary" disabled={currentPage === totalPages }>
                Next
               </button>
            </div>
        </div>
    );
}

export default CoPlayers;