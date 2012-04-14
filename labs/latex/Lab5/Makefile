TEXFLAGS=-shell-escape -synctex=1
AUXFILES=definitions

all : ubuntu
.PHONY : all

list-targets : FORCE
	@echo "ubuntu"
.PHONY : list-targets

ubuntu : Lab5-Tags.tex FORCE
	for file in ${AUXFILES}; do echo "\input{$@/$$file}" >> $$file.tex; done
	pdflatex ${TEXFLAGS} Lab5-Tags.tex
	pdflatex ${TEXFLAGS} Lab5-Tags.tex
	mv Lab5-Tags.pdf Lab5-Tags-$@.pdf
	make clean_auxfiles

clean_auxfiles : FORCE
	for file in ${AUXFILES}; do rm -f $$file.tex; done
	rm -f Lab5-Tags.aux Lab5-Tags.log Lab5-Tags.out Lab5-Tags.pyg Lab5-Tags.synctex.gz

clean : clean_auxfiles
	rm -f Lab5-Tags*.pdf
.PHONY : clean

FORCE :