import { Service } from "typedi";
import { WebhookModel, Webhook } from "../models/Webhook";
import { ObjectID } from "mongodb";

@Service()
export class WebhookService {
  async getForUserAndServer(userId:ObjectID, serverId:ObjectID): Promise<Array<Webhook>> {
    return WebhookModel.find({ creator: userId, server: serverId });
  }

  async find(params): Promise<Array<Webhook>> {
    return WebhookModel.find(params);
  }

  async create(params) {
    const webhook = new WebhookModel(params);
    await webhook.save();
    return webhook;
  }

  async delete(id: string): Promise<Webhook> {
    const webhook = await WebhookModel.findById(id);
    return webhook.remove();
  }
}