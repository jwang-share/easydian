

"""
! Author: jwang
"""
class IParser(object):
    def __init__(self,engine):
        self.engine = engine
        self.encoding = "utf-8"
        
    #override this function to cover your request
    def get_encoding(self,result):
        return "utf-8"
        
    def send_request(self):
        result = self.engine.send_requests()
        for item in result:
            yield item
    
    def send_requests(self):
        results = self.send_request()
        while True:
            try:
                keyname,res = results.next()
            except:
                break
            else:
                content = res.content
                res.encoding = self.get_encoding(content)
                content
                yield keyname, self.handle_data(content)
                               
    
    def handle_data(self,content):      
        raise NotImplementedError
        
    
    
        
        
            
    
        