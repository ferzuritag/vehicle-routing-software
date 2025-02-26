from pymongo import MongoClient
import os

class RoutingProblemsDatabase:
    def __init__(self):

        self.client = MongoClient(os.getenv('MONGO_CONNECTION_STRING'))

        self.database = self.client.get_database('routing_problems')

        self.routing_problems_collection = self.database.get_collection('routing_problems')
    
