import sequelize from "../../config/dbConfig.js";
import { DataTypes } from "sequelize";

const DailyResponseData = sequelize.define('daily_response_data', {
    location_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    response_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default: 1
    },
    total_response_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default: 0
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['location_id', 'date']
        }
    ]
});

export default DailyResponseData;