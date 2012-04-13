TEXFLAGS=-shell-escape -synctex=1
AUXFILES=definitions

all : ubuntu
.PHONY : all

list-targets : FORCE
	@echo "ubuntu"
.PHONY : list-targets

ubuntu : Lab2-ModifyingData.tex FORCE
	for file in ${AUXFILES}; do echo "\input{$@/$$file}" >> $$file.tex; done
	pdflatex ${TEXFLAGS} Lab2-ModifyingData.tex
	pdflatex ${TEXFLAGS} Lab2-ModifyingData.tex
	mv Lab2-ModifyingData.pdf Lab2-ModifyingData-$@.pdf
	make clean_auxfiles

clean_auxfiles : FORCE
	for file in ${AUXFILES}; do rm -f $$file.tex; done
	rm -f Lab2-ModifyingData.aux Lab2-ModifyingData.log Lab2-ModifyingData.out Lab2-ModifyingData.pyg Lab2-ModifyingData.synctex.gz

clean : clean_auxfiles
	rm -f Lab2-ModifyingData*.pdf
.PHONY : clean

FORCE :
