PDFLATEX_FLAGS = -interaction=batchmode -shell-escape

.SILENT: all

all: FORCE
	echo 'Please make a specific lab using `make labX`'

Lab%: Lab%.tex Sources.bib
	pdflatex $(PDFLATEX_FLAGS) $<
	bibtex `basename $< .tex`
	pdflatex $(PDFLATEX_FLAGS) $<
	pdflatex $(PDFLATEX_FLAGS) $<
	make clean_auxfiles

clean_auxfiles: FORCE
	rm -f Lab*.{aux,bbl,blg,log,out}

clean: clean_auxfiles FORCE
	rm -f Lab*.pdf

new: template/new.sh FORCE
	./template/new.sh

FORCE:

lab1: Lab1-Introduction
