import React from 'react';

function Filter({ filter, onFilterChange }) {
  const handlePriceChange = (event) => {
    const newValue = [parseInt(event.target.value), filter.priceRange[1]];
    onFilterChange({ ...filter, priceRange: newValue });
  };

  const handleMaxPriceChange = (event) => {
    const newValue = [filter.priceRange[0], parseInt(event.target.value)];
    onFilterChange({ ...filter, priceRange: newValue });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    onFilterChange({ ...filter, [name]: checked });
  };

  return (
    <div className="filter">
      <h3>Price Range: ${filter.priceRange[0]} - ${filter.priceRange[1]}</h3>
      <div>
        <label>
          Min Price:
          <input
            type="range"
            min="0"
            max="100" // Adjust based on your product prices
            value={filter.priceRange[0]}
            onChange={handlePriceChange}
          />
        </label>
        <label>
          Max Price:
          <input
            type="range"
            min="0"
            max="100" // Adjust based on your product prices
            value={filter.priceRange[1]}
            onChange={handleMaxPriceChange}
          />
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="isVeg"
            checked={filter.isVeg}
            onChange={handleCheckboxChange}
          />
          Vegetarian
        </label>
        <label>
          <input
            type="checkbox"
            name="isDairyFree"
            checked={filter.isDairyFree}
            onChange={handleCheckboxChange}
          />
          Dairy-Free
        </label>
      </div>
    </div>
  );
}

export default Filter;