import { Service } from "typedi";
import { Resolver, Query, Authorized } from "type-graphql";
import { Game } from "../models/Game";
import { GameService } from "../services/GameService";

@Service()
@Resolver(of => Game)
export class GameResolver {
  constructor(private readonly gameService:GameService) {}

  @Authorized()
  @Query(returns => [Game])
  async games(): Promise<Array<Game>> {
    return this.gameService.getAll();
  }
}