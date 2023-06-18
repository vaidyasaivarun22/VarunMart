#!/bin/bash

showHelp() {
    echo ""
    echo "Valid command structure is  "
    echo "    pre_install.sh INSTLLATION_DIR BACKUP_DIR"
    echo "DESCRIPTION "
    echo "   This scripts executes pre-installation steps."
    echo "       it takes the backup from INSTLLATION_DIR places in the BACKUP_DIR"
}

BUILD_DIR=$(pwd)
INSTLLATION_DIR=$1
BACKUP_DIR=$2

if [ "$BACKUP_DIR" == "" ]; then
    echo "BACKUP_DIR is not set, exiting"
    showHelp
    exit
fi

if [ "$INSTLLATION_DIR" == "" ]; then
    echo "INSTLLATION_DIR is not set, exiting"
    exit
fi

echo "*************** Installation properties ***************"
echo "Installation directory:  $INSTLLATION_DIR"
echo "Backup directory:  $BACKUP_DIR"
echo "Build directory: $(pwd)"
echo "********************************************************"

echo "Done"
#Take backup
echo "creating backup directory with current time stamp"
mkdir -p $BACKUP_DIR
currentTime=$(date +%d%b%y-%H%M)
backupDirName=$BACKUP_DIR/$currentTime
mkdir -p $backupDirName
echo "Backup directory created. Its path is $backupDirName"

echo "copying all files from $INSTLLATION_DIR to $backupDirName"
if [ -d "$INSTLLATION_DIR" ]; then
    tar cvzf $backupDirName/portal-$(date +%d%b%y-%H%M).tar.gz $INSTLLATION_DIR
fi
