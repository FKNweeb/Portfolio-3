import React,{useState} from "react";
import { paginate } from "../Helpers/Pagination";
import { Link } from "react-router-dom";


function ActorsInvolved({crew}){
    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const {currentItems: currentItems, totalPages:totalPages} = paginate(crew , currentPage, itemsPerPage);
    
    const handlePageChange = (setter, direction, currentPage, totalPages) => {
        if(direction === "next" && currentPage < totalPages) setter(currentPage + 1);
        if(direction === "prev" && currentPage > 1) setter(currentPage -1);
    }
    
    return (
        <div id="Actors" className='row'>
            <h5>Actors</h5>
            <div className='row d-flex justify-content-evenly'>
                {currentItems.map((p, i) => (
                    <div key={i} className="col-12 col-sm-6 col-md-4 col-lg-2 mb-1">
                        <div className='card h-100'>
                            <div className='card-body'>
                                <p>{p}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {totalPages > 1 ? (<div className="pagination justify-content-center">
               <button onClick={()=>handlePageChange(setCurrentPage, "prev", currentPage, totalPages)} className="btn btn-secondary me-2" disabled={currentPage === 1}>
                Previous
               </button>
               <button onClick={()=>handlePageChange(setCurrentPage, "next", currentPage, totalPages)} className="btn btn-secondary" disabled={currentPage === totalPages }>
                Next
               </button>

            </div>) : (<p></p>) }
            
        </div>
    );
}

export default ActorsInvolved;