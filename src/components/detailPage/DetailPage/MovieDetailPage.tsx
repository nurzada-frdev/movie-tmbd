import {useAppSelector} from "../../../hooks/UseAppSelector";
import {useAppDispatch} from "../../../hooks/UseAppDispatch";
import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {AppDispatch} from "../../../store/Store";
import {AiOutlineUnorderedList} from 'react-icons/ai';
import {AiFillHeart} from 'react-icons/ai';
import {BsFillBookmarkFill} from 'react-icons/bs';
import {BsFillPlayFill} from 'react-icons/bs';
import {AiFillStar} from 'react-icons/ai';
import {
    fetchingDetail, fetchingDetailError,
    fetchingDetailSuccess} from "../../../store/Reducer/detailReducer/MovieDetailPageSlice";
import axios from "axios";
import {APIKEY} from "../../../Apikey/APIKEY";
import {RiLoader3Fill} from "react-icons/ri";
const MovieDetailPage = () => {
    const {detailId} = useParams()
    const {detail, error, loader} = useAppSelector((state) => state.detailSlice);
    const dispatch = useAppDispatch();
    const fetchingDetailMovie = async (dispatch: AppDispatch) => {
        try {
            dispatch(fetchingDetail())
            const responsive = await axios.get(`https://api.themoviedb.org/3/movie/${detailId}?api_key=${APIKEY}&language=en-US`)
            dispatch(fetchingDetailSuccess(responsive.data))
        } catch (e: any) {
            dispatch(fetchingDetailError(e.massage))
        }
    }
    useEffect(() => {
        dispatch(fetchingDetailMovie);
    }, []);


    if (error) {
        return <div>Error: {error}</div>;
    }

    let {backdrop_path, original_title,title,genres,runtime,vote_average, overview, release_date,} = detail
    return (
        <div style={{
        background: `linear-gradient(rgba(0,0,0,.8), rgba(0,0,0,.9)),url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${backdrop_path})no-repeat center center  fixed`,
    }}>
    <div className="container">
    <div className="details">
        {
        <div className="inform-detail">
    <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${backdrop_path}`}
    alt=""/>
    <div className="details__item--text">
        <h1>{original_title}<b>({release_date})</b></h1>
        <div className="reit" style={{
            display:'flex',
            justifyContent:'space-around',
            alignItems:'center'
        }}>
            <div className="circle" style={{
                display:"flex",
                alignItems:'center',
                justifyContent:'space-between'
            }}>
                <button className='vote' style={{
                    background:'none',
                    color:"white",
                    border:'none'
                }}>{Math.floor(vote_average! * 10)}%</button>

            </div>
            <h2 style={{
                margin:'0 20px'
            }}>Рейтинг</h2>
            <div className="play" style={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center'
            }}>
        </div>
                <div className="icons" style={{
                    color:'white'
                }}>
                    <div className="small" style={{
                        color:'white'

                    }}><h3><AiOutlineUnorderedList/></h3></div>
                    <div className="small"><h3><AiFillHeart/></h3></div>
                    <div className="small"><h3><BsFillBookmarkFill/></h3></div>
                    <div className="small"><h3><AiFillStar/></h3></div>
                </div>
       <div className="video" style={{
           display:'flex',
           alignItems:'center'
       }}>
           <button style={{
             fontSize:'25px',
               margin:'0 10px',
               background:'none',
               color:'white',
               borderRadius:'40px',
               display:'flex',
               border:'1px solid grey',
               justifyContent:'center'
           }}><BsFillPlayFill/></button>
           <h2 style={{
               color:'green'
           }}>Воспроизвести трейлер </h2>
       </div>

        </div>

    <h2>Обзор :</h2>
    <p>{overview}</p>
    </div>
    </div>
}
    </div>
    </div>
    </div>
);
};

export default MovieDetailPage;


