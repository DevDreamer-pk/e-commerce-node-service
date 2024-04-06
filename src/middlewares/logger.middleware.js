import winston from "winston";

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'Request Logger' },
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log`
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.File({ filename: 'error.log'}),
        // new winston.transports.File({ filename: 'combined.log' }),
        new winston.transports.Console()
    ]
});

const loggerMiddleware = async (req, res, next) => {

    logger.info(`${req.method} ${req.url} ${JSON.stringify(req.body)}`);
    next();
}

export default loggerMiddleware;
