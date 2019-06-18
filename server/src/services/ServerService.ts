import { Service } from "typedi";
import { ServerModel, Server } from "../models/Server";
import { UserModel } from "../models/User";
import { Types } from "mongoose";
import * as moment from "moment";

@Service()
export class ServerService {
  async get(id: string): Promise<Server> {
    const server = await ServerModel.findOne({ _id: id });
    return server;
  }

  async getWithEvents(id: string): Promise<Server> {
    const server = await ServerModel.findOne({ _id: id })
      .populate({
        path: "events",
        populate: {
          path: "game"
        }
      })
      .exec();
    const users = await UserModel.aggregate([
      {
        $match: {
          servers: new Types.ObjectId(id)
        }
      }
    ]);
    return { ...server.toObject(), users };
  }

  async getAvailableTimeTable(id: string): Promise<string> {
    const users = await UserModel.aggregate([
      {
        $match: {
          servers: new Types.ObjectId(id)
        }
      }
    ]);
    const times = {};
    for (let i = 0; i < 24; i++) {
      const timeString = `${i}:00`;
      times[timeString] = times[timeString] || {};
      moment.weekdaysMin().forEach(day => {
        times[timeString][day] = users.reduce((total, user) => {
          if (user.timeTable) {
            return user.timeTable[day].includes(timeString) ? total + 1 : total;
          } else {
            return total;
          }
        }, 0);
      });
    }
    return JSON.stringify(times);
  }
}
