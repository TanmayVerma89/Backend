import Redis from 'ioredis';

export const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
});

redis.on('connect', () => {
    console.log("connect to Redis Database");
})

redis.on("error", (err) => {
    console.log("Redis Error:", err);
});

setInterval(async () => {
    try {
        await redis.set("redis:keepalive", "ok",'EX',60*60*24);
        console.log("redis")
    } catch (error) {
        console.error("Redis keepalive failed:", error);
    }
}, 60*60*24*30);