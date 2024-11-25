import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useUnit } from 'effector-react';
import { useRouter } from 'next/router';

import SearchIcon from '@mui/icons-material/Search';
import { searchProductsTriggered } from '@shared/features/appBar/model/searchModel';
import IconButton from '@mui/material/IconButton';
import { Search, StyledInputBase } from './styled';

export const SearchProductsInput: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const {
    pathname,
    query: { keyword },
  } = router;
  const triggerSearch = useUnit(searchProductsTriggered);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    const normalizedSearchTerm = searchTerm.trim();
    router.push(`/search?keyword=${normalizedSearchTerm}`);

    if (pathname === '/search') {
      triggerSearch(normalizedSearchTerm);
    }
  };

  useEffect(() => {
    if (keyword && typeof keyword === 'string') {
      triggerSearch(keyword);
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
