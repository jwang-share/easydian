from scrapy.spider import BaseSpider

class spider1(BaseSpider):
    name = "spider1"
    allowed_domains = ["dmoz.org"]
    start_urls = [
        "http://www.dmoz.org/Computers/Programming/Languages/Python/Books/",
        "http://www.dmoz.org/Computers/Programming/Languages/Python/Resources/"
    ]
    def parse(self, response):
        print response.body