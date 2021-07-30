import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import './ProductItemCard.css'
import { Link } from 'react-router-dom'

const ProductItemCard = ({
	productId,
	productName,
	productDescription,
	productImg,
	productAmount
}) => {
	return (
		<Card className="productItem">
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
		</Card>
	)
}

export default ProductItemCard
