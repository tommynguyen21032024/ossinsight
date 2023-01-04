import {Job, WorkerOptions} from 'bullmq';
import {FastifyInstance} from "fastify";
import {Question} from "@ossinsight/api-server";

export default async (
    app: FastifyInstance,
    job: Job<Question, any, string>
) => {
  if (!job.data) {
    app.log.warn("No job data provided");
    return;
  }

  const question = job.data as Question;
  const { id: questionId } = question;
  const conn = await app.mysql.getConnection();

  try {
    await app.explorerService.resolveQuestion(conn, job, question);
  } catch (err: any) {
    app.log.error(err, `Failed to resolve the question ${questionId}: ${err.message}`);
  } finally {
    conn.release();
  }
};

export const workerConfig: WorkerOptions = {
  autorun: true,
  concurrency: 2,
};