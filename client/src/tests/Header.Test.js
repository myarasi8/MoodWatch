import "@testing-library/jest-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Header from "../header"

test("renders learn react link", () => {
  render(<Header />);
  const linkElement = screen.getByText(/Login/i);
});

test("should print first genre Action", async () => {
    const { getByTestId } = render(<Header />);
    fireEvent.click(getByTestId('button1'))
    await waitFor (() => {
        expect(getByTestId('button1')).toHaveTextContent('Welcome')
    })
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
