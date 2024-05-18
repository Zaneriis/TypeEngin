curl -fsSL https://ollama.com/install.sh | sh;
ollama pull llama3
cd backend;
npm i;
cd ../ocrService;
npm i;
cd ..
