import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import useAuthStore from "../Stores/AuthStore";

function RateTitle({ tconst }) {
    const { isLoggedIn } = useAuthStore();
    const [user, setUser] = useState({});
    const [number, setNumber] = useState(null);
    const [showInput, setShowInput] = useState(false);
    const [disableButton, setDisableButton] = useState(false);

    // Fetch user data on mount or when `isLoggedIn` changes
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/users/getUser', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + Cookies.get('logged_in'),
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
                setUser({
                    userName: 'Unknown',
                    userEmail: 'Unknown',
                    bookMarkNames: [],
                    bookMarkTitles: [],
                });
            }
        };

        fetchUser();
    }, [isLoggedIn]);

    const CheckIfRatesTitleContainsSlug = (tconst) => {
      for (let index = 0; index < user?.rateTitles?.length; index++) {
        if (user.rateTitles[index].titleId === tconst) { return true; }        
      }
      return false;
    }

    // Check if the button should be disabled based on the user's bookmark names    
    useEffect(() => {
        if (CheckIfRatesTitleContainsSlug(tconst)) {
            setDisableButton(true);
        } else {
            setDisableButton(false);
        }
    }, [user, tconst]);

    const handleButtonClick = async () => {
        if (!showInput) {
            setShowInput(true);
        } else {
            try {
              const response = await fetch('http://localhost:5001/api/users/rateTitle', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + Cookies.get('logged_in'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ TitleId: tconst, Rate: number}), // Convert body to JSON string
                });

                if (response.ok) {
                    setDisableButton(true);
                }
            } catch (error) {
                console.error('Error rating the person', error);
            }
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;

        // Ensure the value is a number between 1 and 10
        if (value === "" || (Number(value) >= 1 && Number(value) <= 10)) {
            setNumber(value); // Update state with the valid number
        }
    };

    return isLoggedIn ? (
        <>
            <button
                className="btn btn-primary"
                onClick={handleButtonClick}
                disabled={disableButton}
            >
                Rate
            </button>
            {showInput && (
                <div style={{ paddingLeft: '6rem' }}>
                    <input
                        type="number"
                        min="1"
                        max="10"
                        value={number || ""}
                        onChange={handleInputChange}
                        placeholder="1-10"
                        style={{ width: "4rem" }}
                    />
                </div>
            )}
        </>
    ) : (
        <button className="btn btn-primary" style={{ visibility: "hidden" }}>
            Rate
        </button>
    );
}

export default RateTitle;
