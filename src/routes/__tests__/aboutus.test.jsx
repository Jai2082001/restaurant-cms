// // src/routes/tests/aboutus.test.js

// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import AboutUs from '../aboutus';
// import BaseContainer from '../../components/common/container/BaseContainer';

// // Mock BaseContainer component if needed
// jest.mock('../../components/common/container/BaseContainer', () => {
//   return ({ children }) => <div>{children}</div>;
// });

// describe('AboutUs Component', () => {
//   it('renders AboutUs component correctly', () => {
//     // Render the AboutUs component
//     render(<AboutUs productBanner={[]} />);

//     // Assert that certain elements are present in the document
//     expect(screen.getByText(/Who Are We/i)).toBeInTheDocument();
//     expect(screen.getByText(/About Morning Bakery/i)).toBeInTheDocument();
//     expect(screen.getByText(/Morning Bakery Company Limited/i)).toBeInTheDocument();
//     expect(screen.getByText(/OUR OUTLETS/i)).toBeInTheDocument();
//     expect(screen.getByText(/OUR PRODUCTS/i)).toBeInTheDocument();
//     expect(screen.getByText(/Our Mission/i)).toBeInTheDocument();
//     expect(screen.getByText(/MADE FRESH EVERY DAY/i)).toBeInTheDocument();
//   });

//   it('renders the "Read More" buttons correctly', () => {
//     // Render the component
//     render(<AboutUs productBanner={[]} />);

//     // Assert the "Read More" buttons are rendered
//     const readMoreButtons = screen.getAllByText(/Read More/i);
//     expect(readMoreButtons.length).toBe(2);  // Expecting two "Read More" buttons
//     expect(readMoreButtons[0]).toBeInTheDocument();
//     expect(readMoreButtons[1]).toBeInTheDocument();
//   });

//   it('renders the product banner image correctly if provided', () => {
//     const productBanner = [
//       { image_url: 'https://example.com/image.jpg' }
//     ];

//     // Render the component with a product banner
//     render(<AboutUs productBanner={productBanner} />);

//     // Check if the image is displayed
//     const image = screen.getByAltText(/cake/i);
//     expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
//   });

//   it('does not render an image if no product banner is provided', () => {
//     // Render the component with an empty productBanner array
//     render(<AboutUs productBanner={[]} />);

//     // Ensure that no image is rendered (since the image code is commented out in your example)
//     const image = screen.queryByAltText(/cake/i);
//     expect(image).toBeNull();
//   });
// });
