import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import useAuthStore from "../Stores/AuthStore";

function BookmarkName({ slug }) {
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

    const CheckIfBookmarkNameContainsSlug = (slug) => {
      for (let index = 0; index < user?.bookMarkNames?.length; index++) {
        if (user.bookMarkNames[index].nameId === slug) { return true; }        
      }
      return false;
    }

    // Check if the button should be disabled based on the user's bookmark names
    useEffect(() => {
        if (CheckIfBookmarkNameContainsSlug(slug)) {
            setDisableButton(true);
        } else {
            setDisableButton(false);
        }
    }, [user, slug]);

    const handleButtonClick = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/users/bookmarkName', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('logged_in'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nameId: slug }), // Convert body to JSON string
            });

            if (response.ok) {
                setDisableButton(true);
            }
        } catch (error) {
            console.error('Error rating the person', error);
        }
    };

    return isLoggedIn ? (
        <>
            <button
                className="btn btn-primary me-2"
                onClick={handleButtonClick}
                disabled={disableButton}
            >
                Bookmark
            </button>
        </>
    ) : (
        <button className="btn btn-primary me-2" style={{ visibility: "hidden" }}>
            Bookmark
        </button>
    );
}

export default BookmarkName;
