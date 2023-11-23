import axios, { AxiosResponse } from "axios";

import { Book } from "./types/Book";

interface GoogleBooksResponse {
  items: Book[];
}

const googleBooksApi = axios.create({
  baseURL: "https://www.googleapis.com/books/v1",
  params: {
    key: process.env.GOOGLE_BOOKS_API_KEY,
  },
});

export const searchBooks = async (query: string): Promise<Book[] | null> => {
  try {
    const response: AxiosResponse<GoogleBooksResponse> =
      await googleBooksApi.get("/volumes", {
        params: {
          q: query,
        },
      });

    const books: Book[] = response.data.items.map(
      (item: { volumeInfo: { authors: any; title: any; publisher: any } }) => ({
        authors: item.volumeInfo.authors,
        name: item.volumeInfo.title,
        publishingCompany: item.volumeInfo.publisher,
      })
    );

    return books;
  } catch (error) {
    console.error("Error fetching data", error);
    return null;
  }
};
