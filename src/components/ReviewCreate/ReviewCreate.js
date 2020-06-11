import React from 'react';
import ReviewForm from '../ReviewForm/ReviewForm'
import {APIURL} from '../../config';

function ReviewCreate() {
    return (
        <>
            <h1>Create Review</h1>
            <ReviewForm />
        </>
    )
}

export default ReviewCreate;