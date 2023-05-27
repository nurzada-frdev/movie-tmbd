import React, {useEffect} from 'react';
import {useAppSelector} from "../../../hooks/UseAppSelector";
import {useAppDispatch} from "../../../hooks/UseAppDispatch";
import {
    fetchingTrailers,
    fetchingTrailersError,
    fetchingTrailersSuccess
} from "../../../store/Reducer/detailReducer/TrailersDetailPageSlice";
import axios from "axios";
import Slider from "react-slick";
import {APIKEY} from "../../../Apikey/APIKEY";
import {AppDispatch} from "../../../store/Store";
import {useParams} from "react-router-dom";
const TrailersDetailPage = () => {
    const {detailId} = useParams()
    const {trailers, error} = useAppSelector(state => state.trailersSlice)
    const dispatch = useAppDispatch()
    const fetchingTrailersPage = async (dispatch: AppDispatch) => {
        try {
            dispatch(fetchingTrailers())
            const responsive = await axios.get(`https://api.themoviedb.org/3/movie/${detailId}/videos?api_key=${APIKEY}&language=en-US`)
            dispatch(fetchingTrailersSuccess(responsive.data.results))
        } catch (e: any) {
            dispatch(fetchingTrailersError(e.massage))
        }
    }

    useEffect(() => {
        dispatch(fetchingTrailersPage)
    }, [])
    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 4,
        slidesToScroll: 4
    };

    return (
        <div className="container">
            <h2 style={{
                color:'white',
                marginBottom:'40px',
                paddingLeft:'7%'
            }}>Последние трейлеры</h2>
            <Slider {...settings}>
            {
                    trailers.map(el => (
                        <div>
                            <iframe src={`https://www.youtube.com/embed/${el.key}`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen></iframe>
                        </div>
                    ))
                }
            </Slider>
        </div>
    );
};

export default TrailersDetailPage;