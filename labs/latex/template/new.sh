#!/usr/bin/env bash

LAB_NUMBER="0"

echo -n "Lab number [0]: "
read LAB_NUMBER

echo -n "Lab name []: "
read LAB_NAME

sed s/XXX/$LAB_NUMBER/g <./template/Lab0-Template.tex >./Lab$LAB_NUMBER-$LAB_NAME.tex
sed s/XXX/$LAB_NUMBER/g <./template/Makefile.inc |sed s/YYY/$LAB_NAME/g >>./Makefile
