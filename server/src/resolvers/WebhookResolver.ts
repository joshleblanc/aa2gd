import { Service } from "typedi";
import { Resolver, Query, Authorized, Arg, ID, ArgsType, Field, Args } from "type-graphql";
import { Webhook } from "../models/Webhook";
import { WebhookService } from "../services/WebhookService";
import { ObjectID } from "mongodb";

@ArgsType()
class WebhooksArgs {
  @Field(type => ID)
  userId: ObjectID;

  @Field(type => ID)
  serverId: ObjectID;
}

@Service()
@Resolver(of => Webhook)
export class WebhookResolver {
  constructor(private readonly webhookService: WebhookService) {}

  @Authorized()
  @Query(returns => [Webhook])
  async webhooks(@Args() { userId, serverId}: WebhooksArgs): Promise<Array<Webhook>> {
    return this.webhookService.getForUserAndServer(userId, serverId);
  }
}
