@echo "redis service begin to start"
set REDIS_INSTALL_PATH=D:\Program Files\Redis
cd /d %REDIS_INSTALL_PATH%
redis-server.exe redis.windows-service.conf