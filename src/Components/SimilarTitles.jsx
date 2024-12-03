import { useEffect, useState } from "react";

function SimilarTitles({titleId}){
    const url = `http://localhost:5001/api/titles/similartitles/${titleId}`

    const [titles, setTitles] = useState([]);

    useEffect(()=>{
        fetch(url)
        .then(res => res.json())
        .then(data => setTitles(data))
        .catch(err => console.log(err))
    }, [titleId])

    const regex = new RegExp("[0-9]")
    const filterdTitles = titles.filter(t => !t.primary_title.toLowerCase().includes("episode #") && !t.primary_title.toLowerCase().match(regex))

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
    const currentItems = filterdTitles.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(titles.length / itemsPerPage);
    
    
    
    return(
        <div className="row">
        <h5>Similar Titles</h5>
        <div className="row d-flex justify-content-evenly">
            {currentItems
            .map( (t, i)=> 
                <div key={t.tconst} className="col-12 col-sm-6 col-md-4 col-lg-2 mb-1">
                    <div className="card h-100">
                        <div className="card-body ">
                    <p>{t.primary_title}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
        <div className="pagination justify-content-center">
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

export default SimilarTitles;