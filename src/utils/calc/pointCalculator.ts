import { ken } from "../../client/ken.ts";

type Combination = {
  bonus: number,
  score: number
}
type Combinations = Combination[]

export class PointCalculator {
  constructor() {
    const matrix = new Map<number, Combinations>()
    for (let bonus = 0; bonus < 300; bonus ++) {
      for (let score = 0; score < 100; score ++) {
        const pt = Math.floor((100 + score) * (100 + bonus) / 100)
        let combi: Combinations = []
        if (matrix.has(pt)) {
          combi = matrix.get(pt)!
        }
        combi.push({ bonus: bonus, score: score * 20000 })
        matrix.set(pt, combi)
      }
    }
    matrix.forEach(async (v, k) => await ken.kv.set(["matrix", k], v))
  }

  findCombination = async (pt: number): Promise<Combinations> =>
    (await ken.kv.get<Combinations>(["matrix", pt])).value ?? []
}