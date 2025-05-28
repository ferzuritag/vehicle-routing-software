import uvicorn

if __name__ == "__main__":
    uvicorn.run("main:app", port=8005, reload=True, host="192.168.1.252")
