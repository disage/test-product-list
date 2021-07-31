import React, { useState, useEffect } from 'react'
import AddProductForm from '../../componetns/AddProductForm/AddProductForm'
import ProductItemCard from '../../componetns/ProductItemCard/ProductItemCard'
import Fab from '@material-ui/core/Fab'
import firebase from '../../firebase'
import './Main.css'
import Modal from '@material-ui/core/Modal'

const Main = () => {
	const [open, setOpen] = useState(false)
	const [products, setProducts] = useState([])

	let getData = () => {
		const db = firebase.firestore()
		db.collection('products')
			.get()
			.then(snapshot => {
				let data = []
				snapshot.docs.forEach(doc => {
					let product = doc.data()
					product.id = doc.id
					data.push(product)
				})
				setProducts(data)
			})
	}
	useEffect(() => {
		getData()
	}, [])

	const handleOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}
	const body = <AddProductForm setClose={() => handleClose()} getData={() => getData()} />

	return (
		<div className="main">
			<Modal open={open} onClose={handleClose} className="modal">
				{body}
			</Modal>
			<Fab
				variant="extended"
				color="primary"
				className="floatingAddBtn"
				onClick={handleOpen}
			>
				Добавить новый
			</Fab>
			<h1>Список товаров</h1>

			<div className="productsWrapper">
				{products?.map(item => (
					<ProductItemCard
						key={item.id}
						productId={item.id}
						productImg={item.img}
						productName={item.name}
						productDescription={item.description}
						productAmount={item.amount}
					/>
				))}
			</div>
		</div>
	)
}

export default Main
