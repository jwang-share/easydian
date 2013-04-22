# Scrapy settings for easygo project
#
# For simplicity, this file contains only the most important settings by
# default. All the other settings are documented here:
#
#     http://doc.scrapy.org/en/latest/topics/settings.html
#

BOT_NAME = 'easygo'

SPIDER_MODULES = ['easygo.spiders']
NEWSPIDER_MODULE = 'easygo.spiders'
ITEM_PIPELINES = ['easygo.pipelines.EasygoPipeline']
MONGODB_SERVER = "localhost"
MONGODB_PORT = 27017
MONGODB_DB  = "easydian"
MONGODB_COLLECTION = "easy_news"

# Crawl responsibly by identifying yourself (and your website) on the user-agent
#USER_AGENT = 'easygo (+http://www.yourdomain.com)'
