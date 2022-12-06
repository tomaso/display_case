FROM python:3.9

WORKDIR /server

COPY ./server/requirements.txt /server/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /server/requirements.txt

COPY ./server/main.py /server/
COPY ./server/client /server/client

# uvicorn main:app --reload --host 0.0.0.0 --port 8001 --log-level debug
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001", "--log-level", "debug"]
