import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";


function NameDetails() {
    const { slug } = useParams();
    
    const [name, setName] = useState([]);

    useEffect(() => {
        const fetchName = async () => {
            try {
                const nameData = await fetch(`http://localhost:5001/api/names/${slug}`)
                const data = await nameData.json()
                setName(data)
            } catch (error) { console.log("Failed to fetch name", error)}
        };
    if (slug) fetchName();
    }, [slug]);

    if (!name.name) { return <h1>Not Found</h1>}

    return (
        <div className="personcontainer">
            <h1>
                {name.name} <br/>
                Born in {name.birthYear} <br/>
                {name.deathYear !== null &&  name.deathYear !== "" && name.deathYear} <br/>
                Known For Titles:
                <ul>
                    {name.knownForTitles?.map(title => (
                        <li key={title}>{title}</li>
                    ))}
                </ul>
                Professions:
                <ul>
                    {name.professions?.map(prof => (
                        <li key={prof}>{prof}</li>
                    ))}
                </ul>
            </h1>
        </div>
    );
}

export default NameDetails;