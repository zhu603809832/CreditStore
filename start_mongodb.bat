@echo "kill mongod process..."
taskkill /F /IM "mongod"

@echo "mongod node begin to start"
mongod --dbpath=E:\mongodb\db --logpath=E:\mongodb\log\log.log