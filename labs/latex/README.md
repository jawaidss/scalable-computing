# CSSE491: Scalable Labs

This folder contains the revised labs for CSSE491 (Scalable Computing) as 
of spring quarter 2012. All labs were updated by Tim Ekl based on previous
work by Samad Jawaid.

These labs require:

 - A working LaTeX installation
 - GNU Make
 - The following LaTeX packages: array, mdwlist, fancyhdr, color,
   graphicx, minted, fullpage, hyperref, textcomp, totcount
   
   Of these, only minted is nonstandard; it requires the Python
   package pygments. These dependencies can be found at:
   
    - http://pygments.org/
    - http://code.google.com/p/minted/

## Building a lab

Each lab directory supports a number of separate make targets, each
of which provides a different part of the lab for distribution to
students. Parts of the lab differ based on which lab it is; for example,
a Git lab could be built for the `windows` or `mac` targets. For all 
labs, the following targets are common:

- `make all` (or simply `make`) produces all possible PDFs and packages
  for the lab.
- `make clean` removes all built and temporary files for the lab.
- `make list-targets` prints a list of available targets.
