const HeartRateDataStream = require('../streams/HeartRateDataStream');

exports.processHeartRateData = (req, res, next) => {
    try {
        const heartRateStream = new HeartRateDataStream();

        req.pipe(heartRateStream);

        heartRateStream.on('finish', () => {
            heartRateStream.processStreamData(res);
        });

        heartRateStream.on('error', (err) => {
            next(err);
        });

        req.on('error', (err) => {
            next(err);
        });
    } catch (err) {
        next(err); 
    }
};
