#!/usr/bin/env bash

# Check operating mode
if [[ $# == 1 ]]; then
  if [[ $1 == "debug" ]]; then
    DEBUG_MODE=1
  else
    echo "Usage: newlab.sh [debug]"
    exit
  fi
elif [[ $# != 0 ]]; then
  echo "Usage: newlab.sh [debug]"
  exit
fi

# Get lab info
echo -n "Enter the lab number [0]: "
read LAB_NUMBER
if [[ "${LAB_NUMBER}" == "" ]]; then
  LAB_NUMBER="0"
fi

while [[ "${LAB_NAME}" == "" ]]; do
  echo -n "Enter the lab name []: "
  read LAB_NAME
done
LAB_ORIG_NAME=${LAB_NAME}
LAB_NAME=`echo ${LAB_NAME} | sed 's/[^a-zA-Z0-9_]//g'`

echo -n "Enter the auxiliary files for your lab, space-separated [definitions]: "
read LAB_AUXFILES
if [[ "${LAB_AUXFILES}" == "" ]]; then
  LAB_AUXFILES="definitions"
fi
if [[ ! "${LAB_AUXFILES}" =~ .*definitions.* ]]; then
  echo -n "You did not choose to use a definitions file! Are you sure? [n]: "
  read LAB_CONFIRM
  if [[ ! "${LAB_CONFIRM}" == "y" ]]; then
    echo "Breaking..."
    exit
  fi
fi

while [ "${LAB_TARGETS}" == "" ]; do
  echo -n "Enter the targets for your lab, space-separated []: "
  read LAB_TARGETS
done

while [[ "${LAB_DUEDATE}" == "" ]]; do
  echo -n "Enter the due date for your lab []: "
  read LAB_DUEDATE
done

LAB_GENDATE=`date`

echo

# Confirm actions with user
echo "About to create Lab${LAB_NUMBER}-${LAB_NAME}"
echo "    Auxfiles: ${LAB_AUXFILES}"
echo "    Targets: ${LAB_TARGETS}"
echo "    Due: ${LAB_DUEDATE}"
echo -n "OK to continue? [y]: "
read LAB_CONFIRM
if [[ "${LAB_CONFIRM}" == "" ]]; then
  LAB_CONFIRM="y"
fi
if [[ ! "${LAB_CONFIRM}" == "y" ]]; then
  echo "Breaking..."
  exit
fi

# Make lab
mkdir -p work/Lab${LAB_NUMBER}
cat files/Makefile.template | sed "s/\*\*\*NUMBER\*\*\*/${LAB_NUMBER}/g" \
                      | sed "s/\*\*\*NAME\*\*\*/${LAB_NAME}/g" \
                      | sed "s/\*\*\*AUXFILES\*\*\*/${LAB_AUXFILES}/g" \
                      | sed "s/\*\*\*TARGETS\*\*\*/${LAB_TARGETS}/g" > work/Lab${LAB_NUMBER}/Makefile
cat files/lab.tex.template | sed "s/\*\*\*NAME\*\*\*/${LAB_ORIG_NAME}/g" \
                            | sed "s/\*\*\*DUEDATE\*\*\*/${LAB_DUEDATE}/g" \
                            | sed "s/\*\*\*GENDATE\*\*\*/${LAB_GENDATE}/g" > work/Lab${LAB_NUMBER}/Lab${LAB_NUMBER}-${LAB_NAME}.tex
for target in ${LAB_TARGETS}; do
  mkdir -p work/Lab${LAB_NUMBER}/${target};
  for auxfile in ${LAB_AUXFILES}; do
    if [[ "${auxfile}" == "definitions" ]]; then
      cat files/target/definitions.tex.template | sed "s/\*\*\*NUMBER\*\*\*/${LAB_NUMBER}/g" > work/Lab${LAB_NUMBER}/${target}/definitions.tex
    else
      touch work/Lab${LAB_NUMBER}/${target}/${auxfile}.tex
    fi
  done
done

# Move it to the right place
if [[ ! ${DEBUG_MODE} ]]; then
  mv work/Lab${LAB_NUMBER} ..
fi

# Done!
echo
echo "Finished generating Lab${LAB_NUMBER}! Next steps:"
echo "    1. Write the lab contents"
echo "    2. Fill in and correct any auxiliary files for each target"
echo "    3. Compile and distribute the lab"

if [[ ! "${LAB_AUXFILES}" =~ .*definitions.* ]]; then
  echo
  echo "WARNING: You did not include a definitions.tex file in your auxfiles."
  echo "Make sure you define the following commands or strip them from the lab,"
  echo "or else it will not compile:"
  echo "    \\productname"
  echo "    \\longproductname"
  echo "    \\labnumber"
  echo "This may require that you remove references to some files in common/."
fi