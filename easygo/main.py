
#!/usr/bin/python
#encoding: utf-8

"""
! author: jwang
"""

from BaiduEngine import BaiduEngine
from BaiduParser import BaiduParser
import simplejson as json
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

                
if __name__ == "__main__":
    main()
