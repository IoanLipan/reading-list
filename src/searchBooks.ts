import axios, { AxiosResponse } from "axios";

import { BookType } from "./types/BookType";

interface GoogleBooksResponse {
  items: BookType[];
}

const googleBooksApi = axios.create({
  baseURL: "https://www.googleapis.com/books/v1",
  params: {
    key: process.env.GOOGLE_BOOKS_API_KEY,
  },
});

export const searchBooks = async (
  query: string
): Promise<BookType[] | null> => {
  try {
    const response: AxiosResponse<GoogleBooksResponse> =
      await googleBooksApi.get("/volumes", {
        params: {
          q: query,
        },
      });

    const books: BookType[] = response.data.items.map(
      (item: {
        volumeInfo: {
          authors: any;
          title: any;
          publisher: any;
          imageLinks: any;
        };
      }) => ({
        authors: item.volumeInfo.authors,
        title: item.volumeInfo.title,
        publisher: item.volumeInfo.publisher,
        imageUrl: item.volumeInfo.imageLinks?.thumbnail,
      })
    );
    console.log(books);
    return books.slice(0, 5);
  } catch (error) {
    console.error("Error fetching data", error);
    return null;
  }
};
