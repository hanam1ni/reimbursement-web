import { entityManager, orm } from "@/db";
import User from "@/entities/User";
import { UseRequestContext } from "@mikro-orm/core";
import { Queue, Worker as BullMQWorker, Job } from "bullmq";
import { processCreatedExpenseClaim } from "./expenseClaimWorker";

export let queue: Queue;

export const initializeQueue = () => {
  queue = new Queue("Queue", {
    connection: {
      host: "localhost",
      port: 6379,
    },
  });

  new Worker();
};

class Worker {
  constructor() {
    new BullMQWorker("Queue", this.processJob, {
      connection: {
        host: "localhost",
        port: 6379,
      },
    });
  }

  @UseRequestContext(() => orm)
  async processJob(job: Job) {
    switch (job.name) {
      case "CreatedExpenseClaim":
        await processCreatedExpenseClaim(job);
        break;

      default:
        console.error(`[Warn]: Undefined Job: ${job.name}`);
        break;
    }
  }
}
