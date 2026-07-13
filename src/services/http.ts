export class HTTPClient {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`)
    }

    return response.json()
  }
}
