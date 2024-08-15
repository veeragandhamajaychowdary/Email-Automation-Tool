declare module 'node-cron' {
    interface ScheduleOptions {
      scheduled?: boolean;
      timezone?: string;
    }
  
    interface CronJob {
      start(): void;
      stop(): void;
    }
  
    function schedule(cronExpression: string, func: () => void, options?: ScheduleOptions): CronJob;
  
    export { schedule };
  }
  