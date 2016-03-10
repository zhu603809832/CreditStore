@echo "kill node process..."
taskkill /F /IM "node.exe"

@echo "change exe directory"
cd credit_store

@echo "website node begin to start"
npm start