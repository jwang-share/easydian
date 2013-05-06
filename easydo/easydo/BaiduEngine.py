

from IEngine import IEngine
import requests

"""
!Author: jwang
"""

class BaiduEngine(IEngine):
    """
    Consider that Baidu checks IP address, so in easydo, we don't (need) use multiple threads.
    But if you wish to do so, rewrite this function,
    """
    def send_request(self,keyname,kws):
        preurl = self.get_preURL("baidu")
        par = self.get_params(kws)
        response = requests.get(preurl,params=par,timeout=self.timeout,allow_redirects = True)
        return keyname,response
    
    def get_params(self,kws):
        params = {
        "wd":kws,
        "rn":self.resultnum,
        "cl":3
        }
        return params
        
        
        
        

