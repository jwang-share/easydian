#!/usr/bin/python
#encoding: utf-8

import simplejson as json


tv = {
    "canyin":[   
    {"KFC"        : "肯德基 新闻"},
    {"MCDONALD"   : "麦当劳 新闻"},
    {"MRPIZZA"    : "mr pizza 餐饮"},
    {"PIZZAHUT"   : "必胜客 新闻"},
    {"YONHO"      : "永和豆浆 新闻"},
    {"YOSHIDAYA"  : "吉野家 新闻"},
    {"FANTONG"    : "饭统网 新闻"},
    {"UTAO"       : "悠淘快餐 新闻"},
    {"WAIMAI"     : "外卖网 快餐 新闻"},
    {"FANFAN"     : "饭饭 快餐 新闻"},
    {"WAIMAIKU"   : "外卖库 食品 新闻"},
    {"JINGTAN"    : "京探网 餐饮 新闻"}
    ],
    "banjia":[
    {"BANJIA1"    : "NO 新闻"}
    ],
    "zhuangxiu":[
    {"ZHUANGXIU1"    : "NO 新闻"}
    ]
}

def get_keywords():
    kwpath = "../cfg/keywords.json" 
    f = file(kwpath)
    js = json.load(f)
    print json.dumps(js,indent=4,ensure_ascii=False)
    return js
    
if __name__ == "__main__":
    print "coming..."
    js = get_keywords()
    for mjkey,subdict in js.iteritems():
        print "---------------: "+mjkey
        for subkey,value in subdict.iteritems():
            print subkey, value
        
        
        #print "value: " + value
    #print json.dumps(js["canyin"][0],indent=4,ensure_ascii=False)
    
