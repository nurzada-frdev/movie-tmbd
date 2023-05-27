import React from 'react';
import MovieDetailPage from "./DetailPage/MovieDetailPage";
import ActorsDetailPage from "./ActorsPage/ActorsDetailPage";
import TrailersDetailPage from "./TrailersPage/TrailersDetailPage";

const DetailPage = () => {
    return (
        <div>
            <MovieDetailPage/>
            <ActorsDetailPage/>
            <TrailersDetailPage/>
        </div>

    );
};

export default DetailPage;