import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import firebase from '../../firebase'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import './ProductItemCard.css'

const ProductItemCard = ({
	productId,
	productName,
	productDescription,
	productImg,
	productAmount,
	getData
}) => {
	//state for diaolog window about delete product
	const [open, setOpen] = useState(false)

	let deleteData = e => {
		const db = firebase.firestore()
		db.collection('products').doc(productId).delete()
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
		<Card className="productItem">
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>{'Вы уверены что хотите удалить продукт?'}</DialogTitle>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Отмена
					</Button>
					<Button onClick={deleteData} color="primary" autoFocus>
						Уверен
					</Button>
				</DialogActions>
			</Dialog>
			<Link to={'/product/' + productId}>
				<CardActionArea>
					<CardMedia
						component="img"
						alt={productName}
						height="300"
						image={productImg}
						title={productName}
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							{productName}
						</Typography>
						<Typography
							variant="body2"
							color="textSecondary"
							component="p"
							align="left"
							className="itemDescription"
						>
							{productDescription}
						</Typography>
						<Typography color="primary">В наличии: {productAmount} шт.</Typography>
					</CardContent>
				</CardActionArea>
			</Link>
			<CardActions className="cardActions">
				<Button size="small" color="primary" onClick={handleOpen}>
					Удалить
				</Button>
			</CardActions>
		</Card>
	)
}

export default ProductItemCard
