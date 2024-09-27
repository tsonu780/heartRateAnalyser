const { Writable } = require('stream');
const { processHeartRateBatch } = require('../services/heartRateService');

class HeartRateDataStream extends Writable {
    constructor(options) {
        super(options);
        this.buffer = '';
    }

    _write(chunk, encoding, callback) {
        this.buffer += chunk.toString();
        callback();
    }

    processStreamData(res) {
        try {
            const parsedData = JSON.parse(this.buffer);
            if (parsedData.clinical_data && parsedData.clinical_data.HEART_RATE) {
                const heartRateData = parsedData.clinical_data.HEART_RATE.data;
                const processedHeartRate = processHeartRateBatch(heartRateData);
                res.json({
                    HEART_RATE: processedHeartRate,
                    message: 'Heart rate data processed successfully',
                });
            } else {
                res.status(400).json({ status: "error", "statusCode": 400, error: 'Invalid payload format' });
            }
        } catch (err) {
            res.status(400).json({ error: 'Invalid payload format', details: err.message });
        }
    }
}

module.exports = HeartRateDataStream;
