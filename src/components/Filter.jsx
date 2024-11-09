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
    <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200 space-y-4">
      <h3 className="text-xl font-semibold text-gray-700">Filter Options</h3>

      <div className="space-y-2">
        <h4 className="text-lg font-medium text-gray-600">
          Price Range: ${filter.priceRange[0]} - ${filter.priceRange[1]}
        </h4>
        <div className="flex space-x-4">
          <label className="flex flex-col text-gray-600">
            <span className="text-sm mb-1">Min Price</span>
            <input
              type="range"
              min="0"
              max="100" // Adjust based on your product prices
              value={filter.priceRange[0]}
              onChange={handlePriceChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </label>
          <label className="flex flex-col text-gray-600">
            <span className="text-sm mb-1">Max Price</span>
            <input
              type="range"
              min="0"
              max="100" // Adjust based on your product prices
              value={filter.priceRange[1]}
              onChange={handleMaxPriceChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-medium text-gray-600">Dietary Preferences</h4>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-gray-700">
            <input
              type="checkbox"
              name="isVeg"
              checked={filter.isVeg}
              onChange={handleCheckboxChange}
              className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <span className="text-md">Vegetarian</span>
          </label>
          <label className="flex items-center space-x-2 text-gray-700">
            <input
              type="checkbox"
              name="isDairyFree"
              checked={filter.isDairyFree}
              onChange={handleCheckboxChange}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-md">Dairy-Free</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Filter;
