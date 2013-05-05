
#!/usr/bin/python
#encoding: utf-8

"""
! author: jwang
"""

import BaiduParser
import BaiduEngine
#import time

def main():
    parser = BaiduParser(BaiduEngine())
    while True:
        result = parser.send_requests()
        while True:
            try:
                docs = result.next()
            except:
                break
            else:
                #save to db
                pass
           
if __name__ == "__main__":
    main()
