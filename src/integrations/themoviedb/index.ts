import axios, { AxiosRequestConfig } from "axios";
import { randomBytes } from "crypto";
import { Context } from "../../Context";
import { IGetMovieResponse, IGetTranslactionsResponse } from "./theMovieDBTypes";

const { BASE_URL, API_KEY } = process.env;

type AxiosRequestConfigWithTime = AxiosRequestConfig & { startTime: number };

/**
 * Create axios client
 *
 * @export
 * @returns
 */
export function createTheMovieDBAxiosClient() {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    data: {
      json: true,
      resolveWithFullResponse: true,
    },
  });

  axiosInstance.interceptors.request.use(
    request => {
      (request as AxiosRequestConfigWithTime).startTime = Date.now();
      request.headers["x-tracking-request-id"] = randomBytes(16).toString("hex");
      return request;
    },
    error => {
      throw error;
    },
  );

  axiosInstance.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      throw error;
    },
  );

  return axiosInstance;
}

/**
 * Get Movie
 *
 * @export
 * @param {number} movieId
 * @returns {Promise<IGetMovieResponse>}
 */
export async function getMovie(movieId: number): Promise<IGetMovieResponse> {
  const endpoint = `/movie/${movieId}`;

  try {
    const result = await Context.getInstance().integrations.themoviedb.get<IGetMovieResponse>(endpoint, {
      params: { api_key: API_KEY },
    });

    return result.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

/**
 * Get translactions
 *
 * @export
 * @param {number} movieId
 * @returns {Promise<IGetTranslactionsResponse>}
 */
export async function getTranslations(movieId: number): Promise<IGetTranslactionsResponse> {
  const endpoint = `/movie/${movieId}/translations`;

  try {
    const result = await Context.getInstance().integrations.themoviedb.get<IGetTranslactionsResponse>(endpoint, {
      params: { api_key: API_KEY },
    });

    return result.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
