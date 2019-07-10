import { Service } from "typedi";
import { GameModel, Game } from "../models/Game";

@Service()
export class GameService {
  async getAll() {
    return GameModel.find({});
  }

  async find(params: Game) {
    return GameModel.find(params);
  }

  async get(id:string): Promise<Game> {
    return GameModel.findById(id);
  }
}