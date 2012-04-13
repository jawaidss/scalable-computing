TEXFLAGS=-shell-escape -synctex=1
AUXFILES=definitions

all : ubuntu
.PHONY : all

list-targets : FORCE
	@echo "ubuntu"
.PHONY : list-targets

ubuntu : Lab3-UserAuthentication.tex FORCE
	for file in ${AUXFILES}; do echo "\input{$@/$$file}" >> $$file.tex; done
	pdflatex ${TEXFLAGS} Lab3-UserAuthentication.tex
	pdflatex ${TEXFLAGS} Lab3-UserAuthentication.tex
	mv Lab3-UserAuthentication.pdf Lab3-UserAuthentication-$@.pdf
	make clean_auxfiles

clean_auxfiles : FORCE
	for file in ${AUXFILES}; do rm -f $$file.tex; done
	rm -f Lab3-UserAuthentication.aux Lab3-UserAuthentication.log Lab3-UserAuthentication.out Lab3-UserAuthentication.pyg Lab3-UserAuthentication.synctex.gz

clean : clean_auxfiles
	rm -f Lab3-UserAuthentication*.pdf
.PHONY : clean

FORCE :
