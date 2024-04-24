import { fetchConversation, updateLastMessageDirectionAndTime, upsertDailyLocationEntry } from "../service/databaseService.js";

export async function inboundMessageWebhook(req, res, next) {
    try {
        // update direction and time of last message
        const messageTime = Date.parse(req.body.dateAdded) / 1000;
        await updateLastMessageDirectionAndTime(req.body.locationId, req.body.conversationId, "inbound", messageTime);
        res.status(200).json({
            "message": "Inbound message received"
        });
    } catch (error) {
        next(error);
    }
}

export async function outboundMessageWebhook(req, res, next) {
    try {
        const conversation = await fetchConversation(req.body.locationId, req.body.conversationId);

        // no need to create new conversation
        if (!conversation)
            return res.send("new conversation");

        if (conversation.last_message_direction === "inbound") {

            // update conversation
            const currentMessageTime = Date.parse(req.body.dateAdded) / 1000;
            await updateLastMessageDirectionAndTime(req.body.locationId, req.body.conversationId, "outbound", currentMessageTime);

            // calculate reponse time
            const responseTime = currentMessageTime - conversation.last_message_time;

            const messageDate = req.body.dateAdded.slice(0, 10);

            await upsertDailyLocationEntry(req.body.locationId, messageDate, responseTime);
        }

        res.send(req.body);
    } catch (error) {
        next(error);
    }
}
