import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../../../../hooks/UseAppSelector";
import {useAppDispatch} from "../../../../hooks/UseAppDispatch";
import {
    fetchingMore,
    fetchingMoreError,
    fetchingMoreSuccess
} from "../../../../store/Reducer/detailReducer/MorePageSlice";
import axios from "axios";
import {APIKEY} from "../../../../Apikey/APIKEY";
import {useParams} from "react-router-dom";
import MoreMoviePage from "./MoreMoviePage";
import {RiLoader3Fill} from "react-icons/ri";
const MorePage = () => {
    const [accordion, setAccordion] = useState(false)
    const {moreId} = useParams()
    const {more, error, loader} = useAppSelector(state => state.moreSlice)
    const dispatch = useAppDispatch()

    const fetchingMorePage = async () => {
        try {
            dispatch(fetchingMore())
            const responsive = await axios.get(`https://api.themoviedb.org/3/person/${moreId}?api_key=${APIKEY}&language=en-US`)
            dispatch(fetchingMoreSuccess(responsive.data))
        } catch (e: any) {
            dispatch(fetchingMoreError(e.massage))
        }
    }

    useEffect(() => {
        dispatch(fetchingMorePage)
    }, [])


    if (loader) {
        return <div>
            <div className="section">
                <RiLoader3Fill className="loader"/>
                Loading...
            </div>
        </div>
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    let {profile_path, birthday, biography, name} = more

    return (
        <div className="container">
            <div className="MorePage" style={{
                color:'white'
            }}>
                <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${profile_path}`} alt=""/>
                <div style={{
                    display:"flex",
                    flexDirection:'column'
                }}>
                    <h1>{name} <p>{birthday}</p></h1>
                    <h3>Биография</h3>
                    <p>{biography ? biography.length < 201 ? biography :
                        (<p style={{
                            display: accordion ? "none" : "block"
                        }}>{biography.slice(0, 300)}</p>) : ""}
                        <p style={{
                            display: accordion ? "block" : "none"
                        }}>{biography}</p>
                        <button onClick={() => setAccordion(!accordion)} style={{
                            display: accordion ? "none" : "block",
                            cursor: "pointer",
                            color:'yellow',
                            fontSize:'15px',
                            border:'none',
                            background:'none'
                        }}> Читать Дальше
                        </button>
                        <button onClick={() => setAccordion(!accordion)} style={{
                            display: accordion ? "block" : "none",
                            cursor: "pointer",
                            border:'none',
                            color:'yellow',
                            background:'none'
                        }}>Свернуть
                        </button>
                    </p>
                </div>
            </div>
            <MoreMoviePage/>
        </div>
    );
};

export default MorePage;