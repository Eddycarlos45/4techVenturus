import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { AccountCircle, Favorite } from '@material-ui/icons';

import './Post.css';

const Post = () => {
	return (
		<Grid item xs={12} className="grid post">
			<Paper className="paper">
				<div className="user">
					<AccountCircle />
					<Typography className="username" variant="subtitle2">Edson</Typography>
				</div>
				<img className="image" src="https://f.i.uol.com.br/fotografia/2019/03/15/15526795065c8c025270c53_1552679506_4x3_lg.jpg" alt=""></img>
				<section className="body">
					<div className="like">
						<Typography className="people" variant="body2">Liked by 10 people</Typography>
						<Favorite />
					</div>
					<div className="comments"></div>
				</section>
				<hr />
			</Paper>
		</Grid>
	);
};

export default Post;