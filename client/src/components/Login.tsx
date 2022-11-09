import React, {useState, useEffect} from 'react';

const Login = () => {
    const [loggedIn, setLoggedIn] = useState(false)

    const style = {
        background: "transparent",
        border: "1px solid #ccc"
    }

    if (!loggedIn) {
        return (
            <iframe style={style} className="airtable-embed" src="https://airtable.com/embed/shrKD4SoFlEs5jy46?backgroundColor=orange" frameBorder="0" width="100%" height="533" ></iframe>
        )
    }
    else {
        return (<div/>)
    }

}

export default Login