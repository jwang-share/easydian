
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
from PipeLine import PipeLine
import time



def get_db_path():
    config = ConfigParser()
    path = "./cfg/setting.cfg"
    with open(path,"rw") as cfgfile:
        config.readfp(cfgfile)
        dburl = config.get("mongodb","address")
        port = int(config.get("mongodb","port"))
        dbname = config.get("mongodb","dbname")
        return dburl,port,dbname
    
def connectdb():
    dburl,port,dbname = get_db_path()
    try:
        conn = pymongo.Connection(dburl,port)
    except Exception, e:
        print e
        return False
    else:
        return conn[dbname]
       

def inner_main(parser,db,pl):
    print "start on search round..."
    result = parser.send_requests()
    while True:
        try:          
            keyname,docs = result.next()
        except:
            print "end one search round..."
            break
        else:   
            #print json.dumps(docs,indent=4,ensure_ascii=False)
            pl.rewrite_db_context(db,keyname,docs)
            time.sleep(5)
            continue
def main():
    engine = BaiduEngine()
    parser = BaiduParser(engine)
    pl = PipeLine()
    db =  connectdb()
    if db == False:
        print "Please check db status"
        return 
    count = 0
    tcount = 0
    while True:
        inner_main(parser,db,pl)
        tcount += 1
        if count > 499:
            time.sleep(1200)
            count = 0
        else:
            time.sleep(300)
            count += 1
        print "search round:" + str(tcount)
        
                
if __name__ == "__main__":   
    main()
