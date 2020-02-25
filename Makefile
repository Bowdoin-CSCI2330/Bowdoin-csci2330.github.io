
all: build publish clean

samples:
	./make-samples.sh

build: samples
	bundle exec jekyll build

publish:
	rsync -av --delete --exclude "scoreboard/scores.txt" _site/* ~/public_html/csci2330

serve: samples
	bundle exec jekyll serve

clean:
	rm -rf _site
