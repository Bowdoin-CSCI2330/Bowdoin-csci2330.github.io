

build:
	jekyll build

deploy:
	rsync -av --delete --exclude "scoreboard/*txt" _site/* ~/public_html/csci2330
