
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
    while True:
        result = parser.send_request()
        while True:
            try:
                print "coming 1..."
                keyname,docs = result.next()
                print "coming 2..."
            except:
                break
            else:
                print keyname
                print json.dumps(docs,indent=4,ensure_ascii=False)
                break
                #save to db
                
if __name__ == "__main__":
    main()
