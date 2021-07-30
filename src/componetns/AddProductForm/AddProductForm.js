import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import './AddProductForm.css'
import Button from '@material-ui/core/Button'
import firebase from '../../firebase'

const AddProductForm = ({ setClose }) => {
	const [newProduct, setNewProduct] = useState({
		name: '',
		description: '',
		amount: '',
		img: '',
		weight: '',
		color: '',
		frameSize: ''
	})
	const onCreate = () => {
		const db = firebase.firestore()
		if (
			newProduct.name.length > 0 &&
			newProduct.description.length > 0 &&
			newProduct.amount.length > 0 &&
			newProduct.img.length > 0 &&
			newProduct.weight.length > 0 &&
			newProduct.color.length > 0 &&
			newProduct.frameSize.length > 0
		)
			db.collection('products').add(newProduct)
		else {
			alert('Заполните все поля')
		}
		setClose()
	}
	let NewProductHandler = event => {
		const target = event.target
		const value = target.value
		const name = target.name
		setNewProduct({
			...newProduct,
			[name]: value
		})
	}
	return (
		<form className="addProductForm">
			<h2>Добавление продукта</h2>
			<TextField
				name="name"
				className="formInput"
				label="Name"
				required
				autoComplete="off"
				onChange={NewProductHandler}
			/>
			<TextField
				name="description"
				className="formInput"
				label="Description"
				required
				autoComplete="off"
				onChange={NewProductHandler}
			/>
			<TextField
				name="amount"
				className="formInput"
				label="Amount"
				required
				autoComplete="off"
				onChange={NewProductHandler}
			/>
			<TextField
				name="img"
				className="formInput"
				label="Image src"
				required
				autoComplete="off"
				onChange={NewProductHandler}
			/>
			<TextField
				name="weight"
				className="formInput"
				label="Weight"
				required
				autoComplete="off"
				onChange={NewProductHandler}
			/>
			<TextField
				name="color"
				className="formInput"
				label="Color"
				required
				autoComplete="off"
				onChange={NewProductHandler}
			/>
			<TextField
				name="frameSize"
				className="formInput"
				label="FrameSize"
				required
				autoComplete="off"
				onChange={NewProductHandler}
			/>
			<Button className="formAddBtn" onClick={onCreate}>
				Добавить
			</Button>
		</form>
	)
}

export default AddProductForm
