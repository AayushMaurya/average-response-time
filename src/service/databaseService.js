import { getConversation, upsertConversation } from "../api/conversationsApi.js";
import { getDailyResponse, upsertDailyResponseData } from "../api/dailyResponseDataApi.js";

export async function updateLastMessageDirectionAndTime(locationId, conversationId, direction, time) {
    try {
        const conversation = await upsertConversation(locationId, conversationId, direction, time);
        return conversation[0].dataValues;
    } catch (error) {
        console.log("ERROR: ", error);
        throw error;
    }
}

export async function fetchConversation(locationId, conversationId) {
    try {
        const conversation = await getConversation(locationId, conversationId);
        return conversation;
    } catch (error) {
        console.log("ERROR: ", error);
        throw error;
    }
}

export async function upsertDailyLocationEntry(locationId, messageDate, responseTime) {
    try {
        const dailyResponseData = await getDailyResponse(locationId, messageDate);
        console.log("Daily Entry: ", dailyResponseData);
        if (!dailyResponseData)
            await upsertDailyResponseData(locationId, messageDate, responseTime, 1);
        else
            await upsertDailyResponseData(locationId, messageDate, dailyResponseData.total_response_time + responseTime, dailyResponseData.response_count + 1);
    } catch (error) {
        console.log("ERROR: ", error);
        throw error;
    }
}