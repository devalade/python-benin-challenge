.PHONY: run

gen:
	python generator.py > in.txt

run:
	node program.js < in.txt > out.txt

submit: in.official.txt
	node program.js < in.official.txt > out.txt
	diff out.txt out.official.txt > diff.txt
