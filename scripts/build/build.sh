
PROFILE=$1
TAR_FILE=$2

showHelp() {
    echo ""
    echo "Valid command is  "
    echo "    build.sh PROFILE  TAR_FILE"
    echo "DESCRIPTION "
    echo " This installs build. "
    echo " PROFILE can be [dev | stg| prod] "
    echo " TAR_FILE gz file name "
}

rm -rf node_modules dist
npm install
npm install --save @types/handlebars@4.0.33
npm run build:$PROFILE
tar zcvf $TAR_FILE dist/*