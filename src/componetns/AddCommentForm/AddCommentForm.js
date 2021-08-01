import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import './AddCommentForm.css'
import Button from '@material-ui/core/Button'
import firebase from '../../firebase'

const AddCommentForm = ({ getData, productId }) => {
	const [comment, setComment] = useState('')

	const onCreate = () => {
		const db = firebase.firestore()
		if (comment.length > 0) {
			db.collection('comments').add({
				productId: productId,
				description: comment,
				dateOfCreation: firebase.firestore.Timestamp.now().seconds
			})
		} else {
			alert('Заполните все поля')
		}
		getData()
	}

	let NewCommentHandler = event => {
		const target = event.target
		const value = target.value
		setComment(value)
	}
	return (
		<form className="addCommentForm">
			<TextField
				className="formInput"
				label="Комментарий"
				required
				autoComplete="off"
				onChange={NewCommentHandler}
			/>

			<Button className="addCommentBtn " onClick={onCreate}>
				Добавить
			</Button>
		</form>
	)
}

export default AddCommentForm
