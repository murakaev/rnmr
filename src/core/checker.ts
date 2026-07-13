import type { Provider } from "../types/provider"


export class Checker {

  constructor(
    private providers: Provider[]
  ) {}


  async check(name: string) {

    const results = []

    for (const provider of this.providers) {
      results.push(
        await provider.check(name)
      )
    }

    return results
  }
}