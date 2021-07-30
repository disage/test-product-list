import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './ProductPage.css'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import CommentItem from '../../componetns/CommentItem/CommentItem'
import firebase from '../../firebase'

const ProductPage = () => {
	let productId = window.location.pathname.split('/')[2]
	const [product, setProduct] = useState({})
	useEffect(() => {
		const db = firebase.firestore()
		db.collection('products')
			.doc(productId)
			.get()
			.then(snapshot => {
				let data = snapshot.data()
				setProduct(data)
			})
	}, [])
	return (
		<div className="productPage">
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
					<ListItemText primary={'Цвет: ' + product?.name} />
				</ListItem>
				<ListItem button>
					<ListItemText primary={'Ростовка: ' + product?.frameSize} />
				</ListItem>
			</List>
			<h2>Комментарии</h2>
			<div className="commentsContainer">
				<CommentItem />
				<CommentItem />
				<CommentItem />
				<CommentItem />
			</div>
		</div>
	)
}

export default ProductPage
