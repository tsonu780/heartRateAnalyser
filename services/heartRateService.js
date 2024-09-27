const BATCH_SIZE = 1000;

const processHeartRateBatch = (heartRateData) => {
    let result = [];
    let currentBatch = [];

    heartRateData.forEach((reading) => {
        currentBatch.push(reading);
        if (currentBatch.length === BATCH_SIZE) {
            const processedBatch = processHeartRateData(currentBatch);
            result.push(...processedBatch);
            currentBatch = [];
        }
    });

    if (currentBatch.length > 0) {
        const processedBatch = processHeartRateData(currentBatch);
        result.push(...processedBatch);
    }

    return result;
};

const processHeartRateData = (heartRateData) => {
    const result = [];
    let intervalStart = null;
    let intervalEnd = null;
    let minVal = Infinity;
    let maxVal = -Infinity;

    heartRateData.forEach((reading) => {
        const date = new Date(reading.on_date);
        if (!intervalStart) {
            intervalStart = new Date(Math.floor(date.getTime() / (15 * 60 * 1000)) * (15 * 60 * 1000));
            intervalEnd = new Date(intervalStart.getTime() + 15 * 60 * 1000);
        }

        if (date >= intervalStart && date < intervalEnd) {
            const value = parseInt(reading.measurement);
            minVal = Math.min(minVal, value);
            maxVal = Math.max(maxVal, value);
        } else {
            result.push({
                from_date: intervalStart.toISOString(),
                to_date: intervalEnd.toISOString(),
                measurement: { low: minVal, high: maxVal },
            });
            intervalStart = new Date(Math.floor(date.getTime() / (15 * 60 * 1000)) * (15 * 60 * 1000));
            intervalEnd = new Date(intervalStart.getTime() + 15 * 60 * 1000);
            minVal = parseInt(reading.measurement);
            maxVal = parseInt(reading.measurement);
        }
    });

    if (intervalStart) {
        result.push({
            from_date: intervalStart.toISOString(),
            to_date: intervalEnd.toISOString(),
            measurement: { low: minVal, high: maxVal },
        });
    }

    return result;
};

module.exports = {
    processHeartRateBatch,
    processHeartRateData
};
