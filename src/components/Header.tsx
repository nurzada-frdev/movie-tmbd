import {NavLink, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import img from "../img/logggo.png"
const Header = () => {
    const [value, setValue] = useState('')
    const navigate = useNavigate()
    const handleClick = (e: any) => {
        navigate(`/search/:${e}`)
    }
    return (
        <div id="header">
            <div className="container">
                <div className="header">
                    <NavLink to={'/'}><img src={img} width="150px" height="95px" alt=""/></NavLink>
                    <input type="text" placeholder="search..."
                                                        onChange={event => setValue(event.target.value)} onKeyDown={(event) => {
                    if (event.key === 'Enter') handleClick(value)
                }}/>
                    <div className="nav">
                        <NavLink to={'/'}>Popular</NavLink>
                        <NavLink to={'/now-playing'}>Now-Playing</NavLink>
                        <NavLink to={'/top-rated'}>Top-Rated</NavLink>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Header;