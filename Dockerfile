FROM python:3.11.9-slim

WORKDIR /app

COPY req.txt req.txt

RUN pip install -r req.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "back.main:app", "--host", "0.0.0.0", "--port", "8000"]