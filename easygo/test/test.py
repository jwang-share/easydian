#!/usr/bin/python
#encoding: utf-8

"""
!this program mainly used to support fetch results from baidu server automatically
!use utf-8, Chinese is supported. I know - lame advice :)
keywords: just the key words you want to search
kws:
  wd: where keep your keywords
  
"""

import requests
import re
from bs4 import BeautifulSoup
import simplejson as json

keywords =  '肯德基 食品 新闻'
kws = {'wd':keywords,
       'rn': 10,
       'cl': 3
}
preurl = "http://www.baidu.com/s?"

res = requests.get(preurl,params = kws,timeout = 5, allow_redirects = True)
#print json.dumps(res.headers,indent=4)
content = res.content
if res.encoding.lower() != 'utf-8':
    charset = re.compile(r'content="text/html;.?charset=(.*?)"').findall(content)
    print charset, res.encoding.lower(), res.headers['content-type']
    try:
        if len(charset)>0 and charset[0].lower()!=res.encoding.lower():
            content = content.decode('gbk').encode('utf-8')
    except: 
        pass
    
soup = BeautifulSoup(content)
#print soup.prettify()
index = 0
js = {}
doc = []
results = soup.find_all(class_="result")
for links in results:  
    js["title"] = links.h3.get_text()
    js["brief"] = links.font.get_text()
    js["url"] = links.a['href']
    doc.append(js)
    
print json.dumps(doc,indent=4,ensure_ascii=False)



"""
print links.h3.get_text()
    print "----------------------------------------"
    print links.font.get_text()
    print "----------------------------------------"
    print links.a['href']
    index = index + 1
    print "======================================== " + str(index)
    print links.span.get_text()
"""