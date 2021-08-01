import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import firebase from '../../firebase'

const CommentItem = ({ description, dateOfCreation, id, getData }) => {
	let date = new Date(1970, 0, 1)
	date.setSeconds(dateOfCreation)
	let formatedDate = date.toString().split(' ')
	//state for diaolog window about delete product
	const [open, setOpen] = useState(false)

	let deleteData = e => {
		const db = firebase.firestore()
		db.collection('comments').doc(id).delete()
		setOpen(false)
		getData()
	}

	const handleOpen = () => {
		setOpen(true)
	}
	const handleClose = () => {
		setOpen(false)
	}
	return (
		<Card className="comment" style={{ width: 500, marginBottom: 50 }}>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>{'Вы уверены что хотите удалить комментарий?'}</DialogTitle>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Отмена
					</Button>
					<Button onClick={deleteData} color="primary" autoFocus>
						Уверен
					</Button>
				</DialogActions>
			</Dialog>
			<CardContent>
				<Typography color="textSecondary" align="left">
					{formatedDate[1] +
						' ' +
						formatedDate[2] +
						' ' +
						formatedDate[3] +
						' / ' +
						formatedDate[4]}
				</Typography>
				<Typography align="left">{description}</Typography>
			</CardContent>
			<CardActions>
				<Button size="small" onClick={handleOpen}>
					Удалить
				</Button>
			</CardActions>
		</Card>
	)
}

export default CommentItem
