import { pool } from '../config/db.js'; // Adjust path if needed


export const addNotification = async ({
    user_id,
    task_id,
    message,
    scheduled_time,
}) => {
    const query = `
        INSERT INTO notifications (user_id, task_id, message, scheduled_time)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
    const values = [user_id, task_id, message, scheduled_time];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

export const getUserNotifications = async (user_id) => {
    const query = `
        SELECT * FROM notifications
        WHERE user_id = $1
        ORDER BY scheduled_time DESC;
    `;
    const { rows } = await pool.query(query, [user_id]);
    return rows;
};

export const markNotificationRead = async (id) => {
    const query = `
        UPDATE notifications
        SET is_read = true
        WHERE id = $1
        RETURNING *;
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
};
