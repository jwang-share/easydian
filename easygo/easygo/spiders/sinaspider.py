
from scrapy.contrib.spiders import CrawlSpider, Rule
from scrapy.contrib.linkextractor.sgml import SgmlLinkExtractor
from scrapy.selector import HtmlXPathSelector
from scrapy.items import EasygoItem

class SinaSpider(CrawlSpider):
    name = "sina spider"
    start_urls = ["http://www.sina.com.cn"]
    rules = []
    def parse_site(self, response):
    	hxs = HtmlXPathSelector(response)
    	item = EasygoItem()
    	item['title'] = ''
    	item['url'] = ''
    	item['cur_url'] = response.url
    	item['content'] = ''

