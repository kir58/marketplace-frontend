import { SearchProductResponse } from '@shared/shared/model';
import { Box, Button, Card, CardActions, CardMedia, Rating, Typography } from '@mui/material';

type Props = { product: SearchProductResponse };

export const ProductItem = ({ product }: Props) => {
  return (
    <Box sx={{ padding: 2 }}>
      <Card sx={{ display: 'flex', flexDirection: 'row' }}>
        {/* Изображение продукта */}
        <CardMedia
          component="img"
          sx={{ width: 200 }}
          image={product?.imageUrl}
          alt={product?.name}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2 }}>
          {/* Название и описание */}
          <Typography variant="h4">{product?.name}</Typography>
          <Typography variant="body1" sx={{ marginTop: 1 }}>
            {product?.description}
          </Typography>

          {/* Рейтинг */}
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
            <Rating value={product?.rating} readOnly />
            <Typography variant="body2" sx={{ marginLeft: 1 }}>
              {product?.reviews} reviews
            </Typography>
          </Box>

          {/* Цена */}
          <Typography variant="h6" color="primary" sx={{ marginTop: 2 }}>
            ${product?.price.toFixed(2)}
          </Typography>
          {product?.oldPrice > product?.price && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: 'line-through' }}
            >
              ${product?.oldPrice.toFixed(2)}
            </Typography>
          )}

          {/* Категория */}
          <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
            Category: {product?.category}
          </Typography>

          {/* Кнопки */}
          <CardActions>
            <Button size="large" variant="contained" color="primary">
              Add to Cart
            </Button>
            <Button size="large" variant="outlined" color="primary">
              View Details
            </Button>
          </CardActions>
        </Box>
      </Card>
    </Box>
  );
};
