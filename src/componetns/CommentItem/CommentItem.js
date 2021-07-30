import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const CommentItem = () => {
	return (
		<Card className="comment" style={{ width: 500, marginBottom: 50 }}>
			<CardContent>
				<Typography color="textSecondary" align="left">
					14:00 / 27.02.2021
				</Typography>
				<Typography align="left">Well meaning and kindly.</Typography>
			</CardContent>
			<CardActions>
				<Button size="small">Удалить</Button>
			</CardActions>
		</Card>
	)
}

export default CommentItem
