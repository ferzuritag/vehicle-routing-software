import uvicorn

if __name__ == "__main__":
    uvicorn.run("main:app", host="192.168.1.253", port=8003, reload=True)
