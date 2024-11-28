import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { Search, StyledInputBase } from './styled';

export const SearchProductsInput: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const {
    query: { keyword },
  } = router;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    const normalizedSearchTerm = searchTerm.trim();
    router.push(`/search?keyword=${normalizedSearchTerm}`);
  };

  useEffect(() => {
    if (keyword && typeof keyword === 'string') {
      setSearchTerm(keyword);
    }
  }, []);

  return (
    <form onSubmit={handleSearchClick}>
      <Search>
        <IconButton type="submit" edge="end" disabled={!searchTerm}>
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
  );
};
