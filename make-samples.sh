#!/bin/bash	

OUT=../_data/samples.yml

cd _samples
echo "# Code Samples in _samples" > ${OUT}

for file in `find . \! -perm -111`
do
	f=`echo $file | cut -f2 -d/`
	echo "- file: $f" >> ${OUT}
	h=`head -1 $file | cut -f2- -d\ `
	echo "  description: \"$h\"" >> ${OUT}
	echo "" >> ${OUT}
done

#| perl -ne 'print("- file: $_");' ; \
#		echo $$file | perl -ne 'print("- file: $_\n"); open my $fd, "<", $_; my $fl = <$fd>; close $fd; print("\t$fl\n");' \
#	cd _samples; make clean
#	for i in _samples/*c _samples/*s; do echo $$i; done
