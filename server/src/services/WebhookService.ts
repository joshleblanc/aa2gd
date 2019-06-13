import { Service } from "typedi";
import { WebhookModel, Webhook } from "../models/Webhook";
import { ObjectID } from "mongodb";

@Service()
export class WebhookService {
  async getForUserAndServer(userId:ObjectID, serverId:ObjectID): Promise<Array<Webhook>> {
    return WebhookModel.find({ creator: userId, server: serverId });
  }
}