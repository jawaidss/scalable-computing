TEXFLAGS=-shell-escape -synctex=1
AUXFILES=definitions

all : ubuntu
.PHONY : all

list-targets : FORCE
	@echo "ubuntu"
.PHONY : list-targets

ubuntu : Lab6-AmazonEC2.tex FORCE
	for file in ${AUXFILES}; do echo "\input{$@/$$file}" >> $$file.tex; done
	pdflatex ${TEXFLAGS} Lab6-AmazonEC2.tex
	pdflatex ${TEXFLAGS} Lab6-AmazonEC2.tex
	mv Lab6-AmazonEC2.pdf Lab6-AmazonEC2-$@.pdf
	make clean_auxfiles

clean_auxfiles : FORCE
	for file in ${AUXFILES}; do rm -f $$file.tex; done
	rm -f Lab6-AmazonEC2.aux Lab6-AmazonEC2.log Lab6-AmazonEC2.out Lab6-AmazonEC2.pyg Lab6-AmazonEC2.synctex.gz

clean : clean_auxfiles
	rm -f Lab6-AmazonEC2*.pdf
.PHONY : clean

FORCE :
