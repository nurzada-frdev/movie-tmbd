import React, {useEffect} from 'react';
import {useAppSelector} from "../hooks/UseAppSelector";
import {Link} from "react-router-dom";
import {fetchingPopular} from "../store/Reducer/ActionCreators";
import {useAppDispatch} from "../hooks/UseAppDispatch";
import {RiLoader3Fill} from "react-icons/ri"

const Popular = () => {
    const {movie, error, loader} = useAppSelector(state => state.movieSlice)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchingPopular)
    }, [])

    return (

        <div className="container">
            <div className="popular">
                {
                    movie.map(el => (
                        <div key={el.id}>
                            <div className="popular--main">
                                <Link to={`/detail/${el.id}`}>
                                    <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face${el.poster_path}`}
                                         alt=""/>
                                    <h5 style={{
                                        color:"white",
                                        textDecoration:'none'
                                    }}>{el.original_title}</h5>
                                    <h4>({el.release_date})</h4>
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};
export default Popular;