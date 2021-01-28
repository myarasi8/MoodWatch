import "@testing-library/jest-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Twitter from "../twitter"

test("renders learn react link", () => {
  render(<Twitter />);
  const linkElement = screen.getByText(/In Twitter/i);
});

// test("gets data from the server", async () => {
//     const { queryByText } = render(<Twitter />);
//     await waitFor(() => {
//         expect(queryByText('How are you feeling?')).toBeInTheDocument()
//     })
// });

// test("logs in to twitter", async () => {
//   const { queryByText } = render(<Twitter />);
//   await waitFor(() => {
//       expect(queryByText('Welcome Mahesh Yarasi')).toBeInTheDocument()
//   })
// });
