import DailyResponseData from "../models/dbModels/DailyResponseData.js";

export async function getDailyResponse(locationId, messageDate) {
    const dailyResponseData = await DailyResponseData.findOne({
        where: {
            location_id: locationId,
            date: messageDate
        }
    });

    return dailyResponseData;
}

export async function upsertDailyResponseData(locationId, messageDate, totalResponseTime, totalResponseCount){
    const dailyResponseData = await DailyResponseData.upsert({
        location_id: locationId,
        date: messageDate,
        total_response_time: totalResponseTime,
        response_count: totalResponseCount
    });

    return dailyResponseData;
}