import sequelize from "../../config/dbConfig.js";
import { DataTypes } from "sequelize";

const Conversations = sequelize.define('conversations', {
    location_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    conversation_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_message_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default: 0
    },
    last_message_direction: {
        type: DataTypes.ENUM('inbound', 'outbound'),
        allowNull: false,
        default: 'outbound'
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['location_id', 'conversation_id']
        }
    ]
});

export default Conversations;