#!/bin/bash

BUILD_DIR=`pwd`
PROFILE=$1
TAR_FILE=$2
INSTLLATION_DIR=$3
APP_TYPE=$4

showHelp() {
    echo ""
    echo "Valid command is  "
    echo "    install.sh PROFILE TAR_FILE INSTLLATION_DIR APP_TYPE  "
    echo "DESCRIPTION "
    echo " This installs build. "
    echo " PROFILE can be [dev | stg| prod] "
    echo " TAR_FILE gz file name "
    echo " INSTALLATION DIR where it will be deployed "
    echo " APP_TYPE holds  roc-portal|foreman-portal|public-portal|main-web"
}

validateInput() {
    if [ "$PROFILE" == "" ]; then
        echo "argument PROFILE type is missing".
        showHelp
        exit
    fi

    if [ "$TAR_FILE" == "" ]; then
        echo "argument TAR_FILE  is missing".
        showHelp
        exit
    fi

     if [ "$APP_TYPE" == "" ]; then
        echo "argument APP_TYPE  is missing".
        showHelp
        exit
    fi

}

printEnvironment() {
    echo "PROFILE TYPE: $PROFILE"
    echo "TAR FILE: $TAR_FILE"
    echo "Installation directory is  $INSTLLATION_DIR"
    echo "Build directory is $BUILD_DIR"
}

changeOwnerShip() {
    echo "changin the owner ship to www-data:www-data"
    chown www-data:www-data -R $INSTLLATION_DIR
}

#This functions takes care of installing chitmonks  user portal
installForemanPortal() {
    echo "Installation of portal started"
    INST_DIR=$INSTLLATION_DIR
   
    #backup existing application
    if [ "$APP_TYPE" == "main-web" ]; then
        # when we deploy main website, it should not delete public portal folder in it.
        echo "Don't delete it as it contains the public-portal in It"
        cd $INST_DIR
        rm -rf circular-forms favicon.png images index.html jquery.bootstrap.newsbox.min.js maintenance1.html script.js snbchain.css
    else 
        # for roc, forman, public portal, delete the folder.
        rm -rf $INST_DIR
    fi
    mkdir -p $INST_DIR
    cd $INST_DIR
    tar xvzf $BUILD_DIR/$TAR_FILE
    mv dist/* .
    rm -r dist
    
    if [ "$APP_TYPE" == "main-web" &&  "$PROFILE" == "dev"]; then
        echo "in dev profile, replacing the prod url with dev url"   
        sed -i 's/t-chits.telangana.gov.in/dev.snbchain.com/g' index.html
    fi
    echo "Installation of foreman portal done"
}


validateInput
printEnvironment
installForemanPortal
changeOwnerShip

echo "Installation done."
exit 0
