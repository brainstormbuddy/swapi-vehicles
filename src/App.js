import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPeople } from './store/slices/peopleSlice';
import PeopleList from './components/PeopleList';
import { Container, TextField, Typography, Pagination } from '@mui/material';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const count = useSelector(state => state.people.count);
  const totalPages = Math.ceil(count / 10);

  useEffect(() => {
    dispatch(fetchPeople({ search, page }));
  }, [dispatch, search, page]);

  const handleSearchChange = e => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on new search
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Star Wars Characters
      </Typography>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={search}
        onChange={handleSearchChange}
        margin="normal"
      />
      <PeopleList />
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      />
    </Container>
  );
};

export default App;
