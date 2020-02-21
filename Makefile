
all: build publish clean

build:
	bundle exec jekyll build

publish:
	rsync -av --delete --exclude "scoreboard/scores.txt" _site/* ~/public_html/csci2330

serve:
	bundle exec jekyll serve

clean:
	rm -rf _site
