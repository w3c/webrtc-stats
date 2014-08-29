all: webrtc-stats.diff.html 

clean:
	- rm -f *.svg *.png *.pdf  webrtc-stats.diff.html webrtc-stats.txt webrtc-stats.orig.txt  

webrtc-stats.txt: webrtc-stats.html
	html2text webrtc-stats.html | fold -bs -w 80 > webrtc-stats.txt

webrtc-stats.orig.txt: webrtc-stats.orig.html
	html2text webrtc-stats.orig.html | fold -bs -w 80 > webrtc-stats.orig.txt

webrtc-stats.diff.html: webrtc-stats.orig.txt webrtc-stats.txt
	./htmlwdiff.sh webrtc-stats.orig.txt webrtc-stats.txt > webrtc-stats.diff.html

