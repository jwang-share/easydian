

from ConfigParser import ConfigParser
import pymongo

config = ConfigParser()
path = "setting.cfg"
with open(path,"rw") as cfgfile:
        config.readfp(cfgfile)
        dburl = config.get("mongodb","address")
        port = config.get("mongodb","port")
        dbname = config.get("mongodb","dbname")
        print  dburl,port,dbname
        
conn = pymongo.Connection('localhost',27017)
print conn
db = conn['easydian']
print db.collection_names()
news = [{
         "author": "Mike",
         "text": "Another post!"},
        {
         "author": "Mike2",
         "text": "Another post 2!"},
        {
         "author": "Mike3",
         "text": "Another post 3!"}]

news_test = db.news_test
res = news_test.insert(news)
#db.news_test.remove()

        
        
