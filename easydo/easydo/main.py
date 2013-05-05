
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
    while(True):
        result = parser.send_request()
        #save to DB
        #time.sleep(60)
        break
        
    
    
if __name__ == "__main__":
    main()
