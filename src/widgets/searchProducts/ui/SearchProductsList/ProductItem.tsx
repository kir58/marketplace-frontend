import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { SearchProductResponse } from '@shared/shared/model/products';
import Link from 'next/link';

interface Props {
  product: SearchProductResponse;
}

export const ProductItem: React.FC<Props> = ({ product }) => {
  console.log(product);
  return (
    <Card
      sx={{
        maxWidth: 345,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Изображение продукта */}
      <CardMedia component="img" height="180" image={product.imageUrl} alt={product.name} />
      {/* Основное содержимое */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        {/* Рейтинг и количество отзывов */}
        <Box display="flex" alignItems="center" mt={1}>
          <StarIcon fontSize="small" color="primary" />
          <Typography variant="body2" color="text.secondary" ml={0.5}>
            {product.rating}
          </Typography>
          <Typography variant="body2" color="text.secondary" ml={1}>
            ({product.reviews} reviews)
          </Typography>
        </Box>
        {/* Цена */}
        <Typography variant="h6" color="primary" mt={1}>
          ${product.price.toFixed(2)}
        </Typography>
        {product.oldPrice > product.price && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textDecoration: 'line-through' }}
          >
            ${product.oldPrice.toFixed(2)}
          </Typography>
        )}
        {/* Категория */}
        <Typography variant="body2" color="text.secondary" mt={1}>
          Category: {product.category}
        </Typography>
      </CardContent>
      {/* Кнопки действий закреплены внизу карточки */}
      <CardActions>
        <Button size="small" color="primary">
          Add to Cart
        </Button>
        <Button size="small" color="primary" component={Link} href={`/products/${product.id}`}>
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};
