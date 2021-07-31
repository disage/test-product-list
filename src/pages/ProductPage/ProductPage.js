import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './ProductPage.css'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import CommentItem from '../../componetns/CommentItem/CommentItem'
import firebase from '../../firebase'
import Fab from '@material-ui/core/Fab'
import UpdateProductForm from '../../componetns/UpdateProductForm/UpdateProductForm'
import Modal from '@material-ui/core/Modal'

const ProductPage = () => {
	let productId = window.location.pathname.split('/')[2]
	const [product, setProduct] = useState({})
	const [comments, setComments] = useState([])
	const [open, setOpen] = useState(false)
	console.log(comments[0])
	let getData = () => {
		const db = firebase.firestore()
		db.collection('products')
			.doc(productId)
			.get()
			.then(snapshot => {
				let data = snapshot.data()
				setProduct(data)
			})
		db.collection('comments')
			.where('productId', '==', productId)
			.get()
			.then(snapshot => {
				let data = []
				snapshot.docs.forEach(doc => {
					let comment = doc.data()
					comment.id = doc.id
					data.push(comment)
				})
				setComments(data)
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
	const body = (
		<UpdateProductForm
			productItem={product}
			id={productId}
			setClose={() => handleClose()}
			getData={() => getData()}
		/>
	)

	return (
		<div className="productPage">
			<Modal open={open} onClose={handleClose} className="modal">
				{body}
			</Modal>
			<Fab
				variant="extended"
				color="primary"
				className="floatingAddBtn"
				onClick={handleOpen}
			>
				Изменить
			</Fab>
			<Link to="/">Назад</Link>
			<h1>{product?.name}</h1>
			<img src={product?.img} alt="bmx" className="productImg" />
			<p className="description">{product?.description}</p>
			<span className="amountValue">В наличии: {product?.amount} шт.</span>
			<List className="characteristicsList">
				<ListItem button>
					<ListItemText primary={'Вес: ' + product?.weight} />
				</ListItem>
				<Divider />
				<ListItem button divider>
					<ListItemText primary={'Цвет: ' + product?.color} />
				</ListItem>
				<ListItem button>
					<ListItemText primary={'Ростовка: ' + product?.frameSize} />
				</ListItem>
			</List>
			<h2>Комментарии</h2>
			<div className="commentsContainer">
				{comments.length > 0 ? (
					comments?.map(item => (
						<CommentItem
							key={item.id}
							description={item.description}
							dateOfCreation={item.dateOfCreation?.seconds}
						/>
					))
				) : (
					<span>Комментарии отсутсвуют</span>
				)}
			</div>
		</div>
	)
}

export default ProductPage
