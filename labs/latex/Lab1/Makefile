TEXFLAGS=-shell-escape -synctex=1
AUXFILES=definitions

all : ubuntu
.PHONY : all

list-targets : FORCE
	@echo "ubuntu"
.PHONY : list-targets

ubuntu : Lab1-GettingStarted.tex FORCE
	for file in ${AUXFILES}; do echo "\input{$@/$$file}" >> $$file.tex; done
	pdflatex ${TEXFLAGS} Lab1-GettingStarted.tex
	pdflatex ${TEXFLAGS} Lab1-GettingStarted.tex
	mv Lab1-GettingStarted.pdf Lab1-GettingStarted-$@.pdf
	make clean_auxfiles

clean_auxfiles : FORCE
	for file in ${AUXFILES}; do rm -f $$file.tex; done
	rm -f Lab1-GettingStarted.aux Lab1-GettingStarted.log Lab1-GettingStarted.out Lab1-GettingStarted.pyg Lab1-GettingStarted.synctex.gz

clean : clean_auxfiles
	rm -f Lab1-GettingStarted*.pdf
.PHONY : clean

FORCE :
