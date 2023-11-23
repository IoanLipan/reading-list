import axios, { AxiosResponse } from "axios";

import { BookType } from "./types/BookType";

interface GoogleBooksApiItem {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    publisher: string;
    imageLinks: {
      thumbnail: string;
    };
  };
}

interface GoogleBooksApiResponse {
  items: GoogleBooksApiItem[];
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
    const response: AxiosResponse<GoogleBooksApiResponse> =
      await googleBooksApi.get("/volumes", {
        params: { q: query },
      });

    const books: BookType[] = response.data.items.map(
      (item: GoogleBooksApiItem) => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
        publisher: item.volumeInfo.publisher,
        imageUrl: item.volumeInfo.imageLinks?.thumbnail,
      })
    );

    return books.slice(0, 5);
  } catch (error) {
    console.error("Error fetching data", error);
    return null;
  }
};
