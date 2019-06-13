import { Service } from "typedi";
import { Resolver, Query, Arg, ID, Authorized } from "type-graphql";
import { Server, ServerModel } from "../models/Server";
import { UserModel } from "../models/User";
import { Types } from "mongoose";
import { ServerService } from "../services/ServerService";

@Service()
@Resolver(of => Server)
export class ServerResolver {
  constructor(private readonly serverService:ServerService) {}

  @Authorized()
  @Query(returns => Server)
  async server(@Arg("id", is => ID) id: string): Promise<Server> {
    return this.serverService.getServer(id);
  }

  @Authorized()
  @Query(returns => String)
  async availableTimeTable(@Arg("id", is => ID) id:string): Promise<string> {
    return this.serverService.getAvailableTimeTable(id);
  }
}
