import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const CommentItem = ({ description, dateOfCreation }) => {
	let date = new Date(1970, 0, 1)
	date.setSeconds(dateOfCreation)
	let formatedDate = date.toString().split(' ')

	return (
		<Card className="comment" style={{ width: 500, marginBottom: 50 }}>
			<CardContent>
				<Typography color="textSecondary" align="left">
					{formatedDate[1] + ' ' + formatedDate[2] + ' ' + formatedDate[3]}
				</Typography>
				<Typography align="left">{description}</Typography>
			</CardContent>
			<CardActions>
				<Button size="small">Удалить</Button>
			</CardActions>
		</Card>
	)
}

export default CommentItem
