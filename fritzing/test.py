from lxml import etree
parser = etree.XMLParser(remove_blank_text=True, remove_comments=True)
tree = etree.parse("9v-led_breadboard.svg", parser)
root = tree.getroot()

print root.getprevious()
#for i in root.itersiblings(tag=etree.Comment, preceding=False):
#    print i
