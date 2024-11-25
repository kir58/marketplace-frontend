import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../model/cartStore';
import { SearchProductResponse } from '@shared/shared/model/products';

export const CartItem: React.FC<{ item: { product: SearchProductResponse; quantity: number } }> = ({
  item,
}) => (
  <Card sx={{ display: 'flex', mb: 2 }}>
    <CardMedia
      component="img"
      sx={{ width: 120 }}
      image={item.product.imageUrl}
      alt={item.product.name}
    />
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <CardContent>
        <Typography variant="h6">{item.product.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {item.product.category}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          ${item.product.price.toFixed(2)}
        </Typography>
        {item.product.oldPrice > item.product.price && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textDecoration: 'line-through' }}
          >
            ${item.product.oldPrice.toFixed(2)}
          </Typography>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <IconButton onClick={() => decreaseQuantity(item.product.id)}>-</IconButton>
          <Typography variant="body1" sx={{ mx: 1 }}>
            {item.quantity}
          </Typography>
          <IconButton onClick={() => increaseQuantity(item.product.id)}>+</IconButton>
        </Box>
      </CardContent>
      <Box sx={{ p: 1, display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton color="error" onClick={() => removeFromCart(item.product.id)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  </Card>
);
