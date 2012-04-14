TEXFLAGS=-shell-escape -synctex=1
AUXFILES=definitions

all : ubuntu
.PHONY : all

list-targets : FORCE
	@echo "ubuntu"
.PHONY : list-targets

ubuntu : Lab4-Photos.tex FORCE
	for file in ${AUXFILES}; do echo "\input{$@/$$file}" >> $$file.tex; done
	pdflatex ${TEXFLAGS} Lab4-Photos.tex
	pdflatex ${TEXFLAGS} Lab4-Photos.tex
	mv Lab4-Photos.pdf Lab4-Photos-$@.pdf
	make clean_auxfiles

clean_auxfiles : FORCE
	for file in ${AUXFILES}; do rm -f $$file.tex; done
	rm -f Lab4-Photos.aux Lab4-Photos.log Lab4-Photos.out Lab4-Photos.pyg Lab4-Photos.synctex.gz

clean : clean_auxfiles
	rm -f Lab4-Photos*.pdf
.PHONY : clean

FORCE :