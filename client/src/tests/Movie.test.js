import "@testing-library/jest-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Movie, { getGenres, printHelloWorld } from "../movie"

describe("Movie" , () => {
    let originalFetch;

    beforeEach(() => {
        const movie1 = {title:'The Matrix'}
        const movie2 = {title:'The Matrix 2'}
        const movie3 = {title:'The Matrix 3'}
        const movie4 = {title:'The Matrix 4'}
        const movie5 = {title:'The Matrix 5'}
        const movie6 = {title:'The Matrix 6'}
    
    
        const movies = [movie1,movie2,movie3,movie4,movie5,movie6]
    
        const json = () => Promise.resolve({results: movies})
        const response = {ok: true, json }
        originalFetch = global.fetch
        global.fetch = () =>  Promise.resolve(response)
    })

    afterEach(() => {
        global.fetch = originalFetch
    })

    test("renders title", () => {
        render(<Movie />);
        screen.getByText(/You should watch one of these movies/i);
      });
      
    test("displays upto five movies", async () => {
        const { getByTestId, getByText, queryByText } = render(<Movie />);
    
        fireEvent.click(getByTestId('button1'))
        await waitFor (() => { getByText('The Matrix') })
        getByText('The Matrix 2') 
        getByText('The Matrix 3') 
        getByText('The Matrix 4') 
        getByText('The Matrix 5')
        expect(queryByText('The Matrix 6')).toBeNull()
    });
})