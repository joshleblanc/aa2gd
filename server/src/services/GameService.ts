import { Service } from "typedi";
import { GameModel } from "../models/Game";

@Service()
export class GameService {
  async getAll() {
    return GameModel.find({});
  }
}