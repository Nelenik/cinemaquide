export async function validateResponse(response: Response): Promise<Response> {
  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response;
}

export const fetchJson = <T>(
  parseResponse: boolean = true,
  ...args: [string, RequestInit?]
): Promise<T> => {
  return fetch(...args)
    .then(validateResponse)
    .then(parseResponse ? (res) => res.json() : () => undefined);
};
