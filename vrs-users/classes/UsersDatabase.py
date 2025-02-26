from pymongo import MongoClient
import os 
class UsersDatabase:
    def __init__(self):

        self.client = MongoClient(os.getenv('MONGO_CONNECTION_STRING'))

        self.database = self.client.get_database('users')

        self.users_collection = self.database.get_collection('users')
    
