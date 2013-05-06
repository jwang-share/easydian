from IParser import IParser
from bs4 import BeautifulSoup

class BaiduParser(IParser):
    def __init__(self,engine):
        super(BaiduParser,self).__init__(engine)
        self.docs = []
        pass
    
    def handle_data(self,keyname,content):
        soup =  BeautifulSoup(content)
        flag = "result"
        results = soup.find_all(class_ = flag)
        item = {}
        for links in results:
            item["title"] = links.h3.get_text()
            item["brief"] = links.font.get_text()
            item["url"] = links.a['href']
            self.docs.append(item)
        #json.dumps(docs,indent=4,ensure_ascii=False)
        return keyname,self.docs
            