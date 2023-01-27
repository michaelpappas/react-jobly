import { render, screen, } from '@testing-library/react';
import App from './App';

test('if app renders', () => {
  render(<App />);
  const splashPageText = screen.getByText("All the jobs in one, convenient place.");
  expect(splashPageText).toBeInTheDocument();
});

// test('if app is rendering multiple components', () => {
//   const { container } = render(<App />);
//   const navbar = container.querySelector(".Navbar");
//   expect(navbar).toBeInTheDocument();
// });




