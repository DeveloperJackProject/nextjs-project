async function test(){
    const Redis = require('ioredis')
    
    const redis = new Redis({
        port: 6379,
        host: '127.0.0.1'
    })
    
    await redis.set('a', '2')
    const keys = await redis.keys('*')
    const val = await redis.get('a')
    
    console.log(keys)
    console.log(val)
}

test()
