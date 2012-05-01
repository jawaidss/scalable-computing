TEXFLAGS=-shell-escape -synctex=1
AUXFILES=definitions

all : azure
.PHONY : all

list-targets : FORCE
	@echo "azure"
.PHONY : list-targets

azure : Lab7-WindowsAzure.tex FORCE
	for file in ${AUXFILES}; do echo "\input{$@/$$file}" >> $$file.tex; done
	pdflatex ${TEXFLAGS} Lab7-WindowsAzure.tex
	pdflatex ${TEXFLAGS} Lab7-WindowsAzure.tex
	mv Lab7-WindowsAzure.pdf Lab7-WindowsAzure-$@.pdf
	make clean_auxfiles

clean_auxfiles : FORCE
	for file in ${AUXFILES}; do rm -f $$file.tex; done
	rm -f Lab7-WindowsAzure.aux Lab7-WindowsAzure.log Lab7-WindowsAzure.out Lab7-WindowsAzure.pyg Lab7-WindowsAzure.synctex.gz

clean : clean_auxfiles
	rm -f Lab7-WindowsAzure*.pdf
.PHONY : clean

FORCE :
