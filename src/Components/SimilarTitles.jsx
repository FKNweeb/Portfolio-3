import { useEffect, useState } from "react";
import { paginate } from "../Helpers/Pagination";
import { Link } from "react-router-dom";

function SimilarTitles({titleId}){
    
    const [titles, setTitles] = useState([]);
    
    useEffect(()=>{
        setTitles([]);
        setCurrentPage(1);
        const url = `http://localhost:5001/api/titles/similartitles/${titleId}`
        fetch(url)
        .then(res => res.json())
        .then(data => setTitles(data))
        .catch(err => console.log(err))
    }, [titleId])

    const regex = new RegExp("[0-9]")
    const filterdTitles = titles.filter(t => !t.primary_title.toLowerCase().includes("episode #") && !t.primary_title.toLowerCase().match(regex))

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    
   
    const {currentItems: currentItems, totalPages:totalPages} = paginate(filterdTitles, currentPage, itemsPerPage);
        
    const handlePageChange = (setter, direction, currentPage, totalPages) => {
        if(direction === "next" && currentPage < totalPages) setter(currentPage + 1);
        if(direction === "prev" && currentPage > 1) setter(currentPage -1);
    }
    
    return(
        <div className="row">
        <h5>Similar Titles</h5>
        <div className="row d-flex justify-content-evenly">
            {currentItems
            .map( (t, i)=> 
                <div key={t.tconst} className="col-12 col-sm-6 col-md-4 col-lg-2 mb-1">
                    <div className="card h-100">
                        <div className="card-body ">
                            <Link to={`/Title/${t.tconst}`}>
                            <p>{t.primary_title}</p>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
        <div className="pagination justify-content-center">
               <button onClick={()=>handlePageChange(setCurrentPage, "prev", currentPage, totalPages)} className="btn btn-secondary me-2" disabled={currentPage === 1}>
                Previous
               </button>
               <button onClick={()=>handlePageChange(setCurrentPage, "next", currentPage, totalPages)} className="btn btn-secondary" disabled={currentPage === totalPages }>
                Next
               </button>

            </div>
        </div>
    );
}

export default SimilarTitles;