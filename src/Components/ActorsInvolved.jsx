import React,{useState} from "react";


function ActorsInvolved({crew}){
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    
    const handleNext = () => {
        setCurrentPage( prevPage => Math.min(prevPage + 1, totalPages));
    } 
    
    const handlePrevious = () => {
        setCurrentPage( prevPage => Math.max(prevPage - 1, 1));
    } 

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = crew.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(crew.length / itemsPerPage);
    
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
               <button onClick={handlePrevious} className="btn btn-secondary me-2" disabled={currentPage === 1}>
                Previous
               </button>
               <button onClick={handleNext} className="btn btn-secondary" disabled={currentPage === totalPages }>
                Next
               </button>

            </div>) : (<p></p>) }
            
        </div>
    );
}

export default ActorsInvolved;