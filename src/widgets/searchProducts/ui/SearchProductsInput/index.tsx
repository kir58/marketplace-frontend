// components/SearchPage.tsx
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useUnit } from 'effector-react';
import {
  TextField,
  CircularProgress,
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  InputAdornment,
} from '@mui/material';
import { useRouter } from 'next/router';

import SearchIcon from '@mui/icons-material/Search';
import {
  $products,
  $error,
  $isLoading,
  searchProductsTriggered,
} from '@shared/widgets/searchProducts/model/searchModel';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/system';
import { alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

interface SearchPageProps {
  initialKeyword: string;
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    // transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export const SearchProducts: React.FC<SearchPageProps> = ({ initialKeyword }) => {
  const [searchTerm, setSearchTerm] = useState(initialKeyword); //
  const router = useRouter();
  const products = useUnit($products);
  const isLoading = useUnit($isLoading);
  const error = useUnit($error);
  const triggerSearch = useUnit(searchProductsTriggered);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    router.push(`/search?keyword=${searchTerm}`);
    console.log('sss');
    triggerSearch(searchTerm); // Запускаем эффект через событие Effector
  };

  return (
    <Box sx={{ padding: 2 }} flexGrow={4}>
      <form onSubmit={handleSearchClick}>
        <Search>
          <IconButton type="submit" edge="end">
            <SearchIcon color="primary" />
          </IconButton>
          <StyledInputBase
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
      </form>
      {/*{isLoading && <CircularProgress />}*/}

      {/*{isLoading && <CircularProgress sx={{ marginTop: 2 }} />}*/}

      {/*{error && <Typography color="error">{error}</Typography>}*/}

      {/*{products && products.length > 0 ? (*/}
      {/*  <List>*/}
      {/*    {products.map((product) => (*/}
      {/*      <ListItem key={product.id}>*/}
      {/*        <ListItemText*/}
      {/*          primary={product.name}*/}
      {/*          secondary={`${product.description} | Category: ${product.category} | Price: $${product.price}`}*/}
      {/*        />*/}
      {/*      </ListItem>*/}
      {/*    ))}*/}
      {/*  </List>*/}
      {/*) : (*/}
      {/*  !isLoading && <Typography>No products found.</Typography>*/}
      {/*)}*/}
    </Box>
  );
};
