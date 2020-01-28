import React, { Fragment } from 'react';
import Header from '../../components/Header/Header';
import Post from '../../components/Post/Post';
import { Container } from '@material-ui/core';

import './Timeline.css'

const Timeline = () => {
    return (
        <Fragment>
            <Header />
            <Container className="timeline">
                <Post />
            </Container>
        </Fragment>
    )
};

export default Timeline;
