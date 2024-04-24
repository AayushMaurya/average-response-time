import { Router } from "express";
import { inboundMessageWebhook, outboundMessageWebhook } from "../controller/webhookController.js";

const router = Router();

router.post("", (req, res, next) => {

    console.log(req.body);

    const webhookType = req.body.type;

    switch(webhookType){
        case "InboundMessage":
            inboundMessageWebhook(req, res, next);
            break;
        case "OutboundMessage":
            outboundMessageWebhook(req, res, next);
            break;
    }

});

export default router;