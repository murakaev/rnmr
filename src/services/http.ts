export class HTTPClient {
  async get<T>(url: string, headers?: Record<string, string>): Promise<T> {
    const response = await fetch(url, { headers })

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`)
    }

    return response.json()
  }
}
