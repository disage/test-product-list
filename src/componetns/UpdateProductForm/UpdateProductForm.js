import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import './UpdateProductForm.css'
import Button from '@material-ui/core/Button'
import firebase from '../../firebase'

const UpdateProductForm = ({ setClose, productItem, id, getData }) => {
	let { name, description, amount, img, weight, color, frameSize } = productItem
	const [product, setProduct] = useState({
		name: name,
		description: description,
		amount: amount,
		img: img,
		weight: weight,
		color: color,
		frameSize: frameSize
	})

	const onChange = () => {
		const db = firebase.firestore()
		if (
			product.name.length > 0 &&
			product.description.length > 0 &&
			product.amount >= 0 &&
			product.img.length > 0 &&
			product.weight.length > 0 &&
			product.color.length > 0 &&
			product.frameSize.length > 0
		) {
			db.collection('products').doc(id).update(product)
		} else {
			console.log(product.amount.length)
			alert('Заполните все поля')
		}
		setClose()
		getData()
	}

	let NewProductHandler = event => {
		const target = event.target
		const value = target.value
		const name = target.name
		setProduct({
			...product,
			[name]: value
		})
	}
	return (
		<form className="updateProductForm">
			<h2>Изменение продукта</h2>
			<TextField
				name="name"
				className="formInput"
				label="Name"
				required
				autoComplete="off"
				onChange={NewProductHandler}
				defaultValue={name}
			/>
			<TextField
				name="description"
				className="formInput"
				label="Description"
				required
				autoComplete="off"
				onChange={NewProductHandler}
				defaultValue={description}
			/>
			<TextField
				name="amount"
				className="formInput"
				label="Amount"
				required
				autoComplete="off"
				onChange={NewProductHandler}
				defaultValue={amount}
			/>
			<TextField
				name="img"
				className="formInput"
				label="Image src"
				required
				autoComplete="off"
				onChange={NewProductHandler}
				defaultValue={img}
			/>
			<TextField
				name="weight"
				className="formInput"
				label="Weight"
				required
				autoComplete="off"
				onChange={NewProductHandler}
				defaultValue={weight}
			/>
			<TextField
				name="color"
				className="formInput"
				label="Color"
				required
				autoComplete="off"
				onChange={NewProductHandler}
				defaultValue={color}
			/>
			<TextField
				name="frameSize"
				className="formInput"
				label="FrameSize"
				required
				autoComplete="off"
				onChange={NewProductHandler}
				defaultValue={frameSize}
			/>
			<Button className="formAddBtn" onClick={onChange}>
				Изменить
			</Button>
		</form>
	)
}

export default UpdateProductForm
