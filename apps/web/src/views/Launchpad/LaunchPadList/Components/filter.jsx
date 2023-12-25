// LaunchpadFilter.js
import React from 'react'
import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material'

const LaunchpadFilter = ({ onFilterChange }) => {
  const handleFilterChange = (event) => {
    // Dapatkan nilai filter dari elemen input
    const filterValue = event.target.value
    // Panggil fungsi callback untuk memberi tahu komponen utama tentang perubahan filter
    onFilterChange(filterValue)
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom={2}>
      <TextField label="Filter Launchpads" variant="outlined" onChange={handleFilterChange} />

      {/* Pilihan filter untuk presale state */}
      <FormControl variant="outlined">
        <InputLabel id="sale-state-label">Sale State</InputLabel>
        <Select labelId="sale-state-label" id="sale-state-select" onChange={handleFilterChange} label="Sale State">
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="OnGoing">OnGoing</MenuItem>
          <MenuItem value="Cancelled">Cancelled</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>
      </FormControl>

      {/* Tombol untuk menerapkan filter */}
      <Button variant="contained" color="primary">
        Apply Filter
      </Button>
    </Box>
  )
}

export default LaunchpadFilter
