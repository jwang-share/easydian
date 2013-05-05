

"""
! Author: jwang
"""
class IParser:
    def __init__(self,engine):
        self.engine = engine
        self.encoding = "utf-8"
        
    #override this function to cover your request
    def get_encoding(self,content):
        return "utf-8"
        
    def send_request(self):
        res = self.engine.send_requests()
        #handler yield here
        res.encoding = self.get_encoding(res)
        return self.parse_data(res.content)
    
    def parse_data(self,content):      
        raise NotImplementedError
        
    
    
        
        
            
    
        