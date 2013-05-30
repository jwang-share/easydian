#!/usr/bin/python
#encoding: utf-8

import urllib2
import re
from bs4 import BeautifulSoup


"""
Login to Sina Weibo with cookie
"""

COOKIE = "SINAGLOBAL=3719057429116.219.1369556704107; un=wangjun0125@gmail.com; myuid=1230502365; un=jazzwong; wvr=5; USRUG=usr413113; SSOLoginState=1369746555; USRHAWB=usr313115; _s_tentry=login.sina.com.cn; UOR=,,login.sina.com.cn; Apache=3833979947958.1416.1369746571109; ULV=1369746571552:5:5:5:3833979947958.1416.1369746571109:1369570711605; SUE=es%3De9c94c1f541c66ac00f273436f63e6f7%26ev%3Dv1%26es2%3D030b45cb75c30cc0c1d3f57de5065936%26rs0%3DFuEiwhGvkYoI%252BmbyWcyBVIZrQTNbfuSo7KfGGG5J%252BEsCOjhw613chWhnQH84xirHsi8fJizON8yABzupquSVY94unU7w1xL6YSwfNEggEsySbr%252Bfy5Riu95boHY%252BemmUBDqMuXgvGrx5YwdhyO%252F%252Bhxh2WJD%252FY0KSDmcJrfigIrg%253D%26rv%3D0; SUP=cv%3D1%26bt%3D1369919217%26et%3D1370005617%26d%3Dc909%26i%3Dc7de%26us%3D1%26vf%3D0%26vt%3D0%26ac%3D2%26st%3D0%26uid%3D1230502365%26user%3Djazzwong%26ag%3D2%26name%3Djazzwong%26nick%3Djazzwong%26fmp%3D%26lcp%3D; SUS=SID-1230502365-1369919217-JA-g0bt1-509fb6ba13477e1378eae5749ff090db; ALF=1372162399"
#fill with your weibo.com cookie
HEADERS = {"cookie": COOKIE}

def test_login():
    url = 'http://www.weibo.com'
    preheader = "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.57 Safari/536.11"
    req = urllib2.Request(url, headers=HEADERS)
    req.add_header('User_Agent',preheader)
    text = urllib2.urlopen(req).read()
    soup = BeautifulSoup(text)
    title = soup.find("title")
    print title
        
def begin_run(url):
    preheader = "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.57 Safari/536.11"
    request = urllib2.Request(url,headers=HEADERS)
    request.add_header('User_Agent',preheader)
    text= urllib2.urlopen(request).read()
    lines=text.splitlines()   
    for line in lines:
        if line.startswith('<script>STK && STK.pageletM && STK.pageletM.view({"pid":"pl_profile_photo"'):
            n = line.find('html":"')
            if n > 0:
                target = line[n+7:-12].replace('\\','')
                soup = BeautifulSoup(target)
                name = soup.find("img")["alt"]
                print "name:   "+name
                photo = soup.find("img")["src"][2:-2]
                print "photo:  "+photo 
                furl = 'http://weibo.com' +soup.find("li",'S_line1').a['href']
                print 'follow: '+furl
                return name,photo, furl
                 

def get_contacts(url):
    preheader = "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.57 Safari/536.11"
    request = urllib2.Request(url,headers=HEADERS)
    request.add_header('User_Agent',preheader)
    text= urllib2.urlopen(request,timeout=15).read()
    #soup = BeautifulSoup(text)
    #fileo = open('thefile.txt', 'w')
    #fileo.write(text)
    #fileo.close()
    return text
    #print soup.prettify()
    
def parse_contacts(text):
    lines=text.splitlines()
    for line in lines:
        if line.startswith('<script>STK && STK.pageletM && STK.pageletM.view({"pid":"pl_relation_hisFollow",'):
            n = line.find('html":"')
            if n > 0:         
                target =  line[n+7:-12]           
                target = target.replace("\\t","")
                target = target.replace("\\n","")
                target = target.replace("\\",'');
                soup = BeautifulSoup(target)
                print "start1: ..."
                navs = soup.find_all("a","page S_bg1")
                for nav in navs:
                    print nav["href"]
                #print soup.prettify()
                print "start2: ..."
                followers = soup.find_all('li','clearfix S_line1')
                for follower in followers:
                    follower_s = str(follower)
                    onesoup = BeautifulSoup(follower_s)
                    #print onesoup.prettify()
                    #print "title: " +onesoup.find("img")["alt"]
                    #print onesoup.find("img")["src"]
                    print "title: " +onesoup.find("div",{"class":"face mbspace"}).a["title"]
                    print "href: " +onesoup.find("div",{"class":"face mbspace"}).a["href"]
                    print "img src: " + onesoup.find("div",{"class":"face mbspace"}).img["src"]
                    print "address: " + str(onesoup.find("span",{"class":"addr"}))
                    print "info: " + str(onesoup.find("div",{"class":"info"}))
                    print "--------------------------"
                break
               

if __name__ == '__main__':
    #test_login()
    url = "http://www.weibo.com/kaifulee"
    name, photo, furl = begin_run(url)
    contacts = get_contacts(furl)
    parse_contacts(contacts)
    




"""
SINAGLOBAL=3719057429116.219.1369556704107; ULV=1369556704126:1:1:1:3719057429116.219.1369556704107:; wvr=5; SUE=es%3Dbc68d848c448a62966f4eeeb3f6e6830%26ev%3Dv1%26es2%3Deff219c1e7c6e1d2587d348868e7631f%26rs0%3DWZjxnlus1Gp1debE1dN3nBcpB7bs7cRdHsYexKlWJ6rXZ8MeJXZf4mzWK%252FrfL9Vw8OZqEIvQyxgjVZd%252F05CxFajle235IYE0SDjHfUuCXxL2UqLdaglLutU7DceB8AEIJNc7PCKkw39ThVFasePsFjOOTqrhfw2%252FavkreXjjnNc%253D%26rv%3D0; SUP=cv%3D1%26bt%3D1369557959%26et%3D1369644359%26d%3Dc909%26i%3Daaeb%26us%3D1%26vf%3D0%26vt%3D0%26ac%3D2%26st%3D0%26uid%3D3024695227%26user%3Dwangjun0125%2540gmail.com%26ag%3D4%26name%3Dwangjun0125%2540gmail.com%26nick%3Dwangjun0125%26fmp%3D%26lcp%3D; SUS=SID-3024695227-1369557959-JA-178nc-1bd255a5daf009064217bdae204b464b; ALF=1372149646; SSOLoginState=1369557959
"""

"""
print myname.decode('UTF-8').encode('GBK')
"""

