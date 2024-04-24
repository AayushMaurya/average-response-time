import Conversations from "../models/dbModels/Conversations.js";

//  upsert conversation

export async function upsertConversation(locationId, conversationId, direction, time) {

    const conversation = await Conversations.upsert({
        location_id: locationId,
        conversation_id: conversationId,
        last_message_direction: direction,
        last_message_time: time
    });

    return conversation;
}

// get conversation from locationId and conversationId

export async function getConversation(locationId, conversationId) {

    const conversation = await Conversations.findOne({
        where: {
            location_id: locationId,
            conversation_id: conversationId
        }
    });

    return conversation;
}