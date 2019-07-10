import { Service } from "typedi";
import {
  Resolver,
  Query,
  Authorized,
  Arg,
  ArgsType,
  Field,
  ID,
  Args,
  Ctx,
  Mutation
} from "type-graphql";
import { UserService } from "../services/UserService";
import { User } from "../models/User";
import { ContextType } from "../lib/utils";

@ArgsType()
class AvailableUsersArgs {
  @Field(type => ID)
  serverId: string;

  @Field(type => ID)
  gameId: string;

  @Field()
  date: string;
}

@ArgsType()
class UpdateTimetableArgs {
  @Field()
  time: string;

  @Field()
  day: string;

  @Field()
  offset: number;
}

@Service()
@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(returns => User, { nullable: true })
  async currentUser(
    @Arg("token", { nullable: true }) token: string
  ): Promise<User> {
    if (!token) return null;
    return this.userService.getCurrentUser(token);
  }

  @Authorized()
  @Query(returns => String)
  async availableUsers(@Args()
  {
    serverId,
    gameId,
    date
  }: AvailableUsersArgs): Promise<string> {
    if (gameId.length === 0 || serverId.length === 0) return "";

    return this.userService.getAvailableUsers(serverId, gameId, date);
  }

  @Query(returns => String)
  async getDiscordToken(
    @Arg("code") code: string,
    @Ctx() { origin }: { origin: string }
  ): Promise<string> {
    console.log("code: ", code, "origin: ", origin);
    return this.userService.getDiscordToken(code, origin);
  }

  @Authorized()
  @Mutation(returns => User)
  async setSteamID(
    @Arg("name") name: string,
    @Ctx() { token }: { token: string }
  ): Promise<User> {
    return this.userService.setSteamID(name, token);
  }

  @Authorized()
  @Mutation(returns => User)
  async updateTimetable(
    @Args() { time, day, offset }: UpdateTimetableArgs,
    @Ctx() ctx: ContextType
  ) {
    this.userService.updateTimetable(time, day, offset, ctx.token);
  }
}
