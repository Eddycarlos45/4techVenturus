import React, { Fragment, useEffect, useCallback, useState } from 'react';
import Header from '../../components/Header/Header';
import Post from '../../components/Post/Post';
import { Container } from '@material-ui/core';

import './Timeline.css'
import { getPosts } from '../../services/post';

const Timeline = () => {

    const [posts, setPosts] = useState([]);
    const fetchPosts = useCallback(async () => {
        const response = await getPosts();
        console.log(response);
        setPosts(response.data);

    }, []);

    useEffect(() => {
        fetchPosts()
    }, [fetchPosts]);
    return (
        <Fragment>
            <Header />
            <Container className="timeline">
                {
                    posts.map(post => {
                        return (
                            <Post key={post._id} post={post} />
                        );
                    })
                }
            </Container>
        </Fragment>
    )
};

export default Timeline;
