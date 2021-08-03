import React, { useState, useEffect } from 'react'
import AddProductForm from '../../componetns/AddProductForm/AddProductForm'
import ProductItemCard from '../../componetns/ProductItemCard/ProductItemCard'
import Fab from '@material-ui/core/Fab'
import firebase from '../../firebase'
import './Main.css'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'

const Main = () => {
	const [open, setOpen] = useState(false)
	const [products, setProducts] = useState([])
	const [sorting, setSorting] = useState('')

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
				if (sorting === 'byAmount') sortByAmount(data)
				else if (sorting === 'byAlphabet') sortByAlphabet(data)
				else setProducts(data)
			})
	}
	useEffect(() => {
		getData()
	}, [sorting])
	let sortByAmount = data => {
		let sortedArr = data.sort((a, b) => {
			return b.amount - a.amount
		})
		setProducts(sortedArr)
	}

	let sortByAlphabet = data => {
		let sortedArr = data.sort((a, b) => {
			let nameA = a.name.toLowerCase(),
				nameB = b.name.toLowerCase()
			if (nameA < nameB) return -1
			if (nameA > nameB) return 1
			return 0
		})
		setProducts(sortedArr)
	}
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
			<Button className="sortBtn" onClick={() => setSorting('byAmount')}>
				Сортировать по колву
			</Button>
			<Button className="sortBtn" onClick={() => setSorting('byAlphabet')}>
				Сортировать по алфавиту
			</Button>
			<div className="productsWrapper">
				{products?.map(item => (
					<ProductItemCard
						key={item.id}
						productId={item.id}
						productImg={item.img}
						productName={item.name}
						productDescription={item.description}
						productAmount={item.amount}
						getData={() => getData()}
					/>
				))}
			</div>
		</div>
	)
}

export default Main
