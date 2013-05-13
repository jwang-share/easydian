
#!/usr/bin/python
#encoding: utf-8

"""
! author: jwang
"""

from BaiduEngine import BaiduEngine
from BaiduParser import BaiduParser
from ConfigParser import ConfigParser
import simplejson as json
import pymongo
#import PipeLine
import time


def main():
    engine = BaiduEngine()
    parser = BaiduParser(engine)
    result = parser.send_requests()
    
    while True:
        try:
            print "coming 1..."
            keyname,docs = result.next()
        except:
            print "coming 2..."
            break
        else:   
            #print json.dumps(docs,indent=4,ensure_ascii=False)
            time.sleep(5)
            continue
                #save to db
def get_db_path():
    config = ConfigParser()
    path = "./cfg/setting.cfg"
    with open(path,"rw") as cfgfile:
        config.readfp(cfgfile)
        dburl = config.get("mongodb","address")
        port = config.get("mongodb","dbport")
        dbname = config.get("mongodb","dbname")
        return dburl,port,dbname
    
def connectdb():
    dburl,port,dbname = get_db_path()
    conn = pymongo.Connection(dburl,port)
    return conn[dbname]

                
if __name__ == "__main__":
    connectdb()
    main()
