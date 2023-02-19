cd ../client/
npm run build
rsync -av build/ ../server/client/
cd ../server/
uvicorn main:app --reload --host 0.0.0.0 --port 8001 --log-level debug
