
#all: build publish

build:
	bundle exec jekyll build

publish:
	rsync -av --delete --exclude "scoreboard/*txt" _site/* ~/public_html/csci2330
