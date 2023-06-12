// import { render, screen } from '@testing-library/react';
// import React from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
// import { AnimeCard } from './AnimeCard';

// const mockItem = {
//   mal_id: 1,
//   title: 'Test Anime',
//   title_english: 'Test Anime (English)',
//   images: {
//     webp: {
//       large_image_url: 'https://example.com/image.jpg',
//     },
//   },
//   score: 7.5,
//   status: 'finished',
//   year: 2021,
//   season: 'summer',
//   episodes: 12,
//   synopsis: 'This is a test anime.',
// };

// describe('AnimeCard component', () => {
//   it('renders without errors', () => {
//     render(
//       <Router>
//         <AnimeCard index={0} item={mockItem} mode={0} />
//       </Router>,
//     );
//   });

//   it('displays anime title correctly in grid mode', () => {
//     render(
//       <Router>
//         <AnimeCard index={0} item={mockItem} mode={0} />
//       </Router>,
//     );
//     const titleElement = screen.getByTitle('Test Anime (English)');
//     expect(titleElement).toBeInTheDocument();
//   });

//   it('displays anime title correctly in list mode', () => {
//     render(
//       <Router>
//         <AnimeCard index={0} item={mockItem} mode={1} />
//       </Router>,
//     );
//     const titleElement = screen.getByTitle('Test Anime (English)');
//     expect(titleElement).toBeInTheDocument();
//   });

//   it('renders anime image correctly in grid mode', () => {
//     render(
//       <Router>
//         <AnimeCard index={0} item={mockItem} mode={0} />
//       </Router>,
//     );
//     const imageElement = screen.getByAltText('Test Anime (English)poster');
//     expect(imageElement).toBeInTheDocument();
//     expect(imageElement).toHaveAttribute(
//       'src',
//       'https://example.com/image.jpg',
//     );
//   });

//   it('renders anime image correctly in list mode', () => {
//     render(
//       <Router>
//         <AnimeCard index={0} item={mockItem} mode={1} />
//       </Router>,
//     );
//     const imageElement = screen.getByAltText('Test Anime (English)poster');
//     expect(imageElement).toBeInTheDocument();
//     expect(imageElement).toHaveAttribute(
//       'src',
//       'https://example.com/image.jpg',
//     );
//   });

//   it('displays anime rating correctly in grid mode', () => {
//     render(
//       <Router>
//         <AnimeCard index={0} item={mockItem} mode={0} />
//       </Router>,
//     );
//     const ratingElement = screen.getByText('7.5');
//     expect(ratingElement).toBeInTheDocument();
//   });

//   it('displays anime rating correctly in list mode', () => {
//     render(
//       <Router>
//         <AnimeCard index={0} item={mockItem} mode={1} />
//       </Router>,
//     );
//     const ratingElement = screen.getByText('7.5');
//     expect(ratingElement).toBeInTheDocument();
//   });

//   // Add more tests for other components, styles, and functionality
// });
