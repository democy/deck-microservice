import bunyan = require('bunyan')
//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * bunyan logger engine
 */
let logger;
// const  MyRawStream:any = () => {}

if(process.env.ES_URL) {
    const Elasticsearch = require('bunyan-elasticsearch')
    const esStream = new Elasticsearch({
        indexPattern: `[logs-scamadviser-api-${process.env.LOGS_ENV}-]YYYY.MM.DD`,
        type: 'logs',
        host: process.env.ES_URL
    });
    esStream.on('error', (err: any) => {
        console.log('Elasticsearch Stream Error:', err.stack);
    });
    
    logger = bunyan.createLogger({
        name: `scamadviser-api-${process.env.LOGS_ENV}`,
        streams: [
            process.env.ENVIRONMENT ? { level: 'debug', stream: esStream } : { stream: esStream },
            {
                level: 'error',
                // stream: new MyRawStream(),
                type: 'raw'
            }
        ],
        serializers: bunyan.stdSerializers
    });
} else {
    logger = bunyan.createLogger({
        name : 'scamadviser-api',
        streams: [
            {
                level: 'debug',
                stream: process.stdout
            },
            {
                level: 'error',
                // stream: new MyRawStream(),
                type: 'raw'
            }
        ]
    })
}

export const log = logger