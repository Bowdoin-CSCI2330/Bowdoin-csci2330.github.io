
all: build publish clean

build:
	bundle exec jekyll build

publish:
	rsync -av --delete --exclude "scoreboard/*txt" _site/* ~/public_html/csci2330

clean:
	rm -rf _site