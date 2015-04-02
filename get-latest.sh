mkdir aurelia-latest-repos

cd aurelia-latest-repos

git clone git://github.com/aurelia/metadata
git clone git://github.com/aurelia/dependency-injection
git clone git://github.com/aurelia/router
git clone git://github.com/aurelia/http-client
git clone git://github.com/aurelia/path
git clone git://github.com/aurelia/history
git clone git://github.com/aurelia/event-aggregator
git clone git://github.com/aurelia/route-recognizer
git clone git://github.com/aurelia/loader
git clone git://github.com/aurelia/loader-default
git clone git://github.com/aurelia/task-queue
git clone git://github.com/aurelia/logging
git clone git://github.com/aurelia/logging-console
git clone git://github.com/aurelia/history-browser
git clone git://github.com/aurelia/event-aggregator
git clone git://github.com/aurelia/framework
git clone git://github.com/aurelia/binding
git clone git://github.com/aurelia/templating
git clone git://github.com/aurelia/templating-binding
git clone git://github.com/aurelia/templating-resources
git clone git://github.com/aurelia/templating-router
git clone git://github.com/aurelia/route-recognizer
git clone git://github.com/aurelia/bootstrapper
git clone git://github.com/aurelia/html-template-element
git clone git://github.com/aurelia/validation
git clone git://github.com/aurelia/app-contacts
git clone git://github.com/aurelia/skeleton-navigation
git clone git://github.com/aurelia/animator-css
git clone git://github.com/aurelia/skeleton-plugin

cd ..

echo ------------- clone complete ------------------
mkdir -p aurelia-latest

echo "copying *** metadata ***"
mkdir -p aurelia-latest/metadata
cp -fR aurelia-latest-repos/metadata/src/* aurelia-latest/metadata

echo "copying *** dependency-injection ***"
mkdir -p aurelia-latest/dependency-injection
cp -fR aurelia-latest-repos/dependency-injection/src/* aurelia-latest/dependency-injection

echo "copying *** router ***"
mkdir -p aurelia-latest/router
cp -fR aurelia-latest-repos/router/src/* aurelia-latest/router

echo "copying *** http-client ***"
mkdir -p aurelia-latest/http-client
cp -fR aurelia-latest-repos/http-client/src/* aurelia-latest/http-client

echo "copying *** path ***"
mkdir -p aurelia-latest/path
cp -fR aurelia-latest-repos/path/src/* aurelia-latest/path

echo "copying *** history ***"
mkdir -p aurelia-latest/history
cp -fR aurelia-latest-repos/history/src/* aurelia-latest/history

echo "copying *** event-aggregator ***"
mkdir -p aurelia-latest/event-aggregator
cp -fR aurelia-latest-repos/event-aggregator/src/* aurelia-latest/event-aggregator

echo "copying *** route-recognizer ***"
mkdir -p aurelia-latest/route-recognizer
cp -fR aurelia-latest-repos/route-recognizer/src/* aurelia-latest/route-recognizer

echo "copying *** loader ***"
mkdir -p aurelia-latest/loader
cp -fR aurelia-latest-repos/loader/src/* aurelia-latest/loader

echo "copying *** loader-default ***"
mkdir -p aurelia-latest/loader-default
cp -fR aurelia-latest-repos/loader-default/src/* aurelia-latest/loader-default

echo "copying *** task-queue ***"
mkdir -p aurelia-latest/task-queue
cp -fR aurelia-latest-repos/task-queue/src/* aurelia-latest/task-queue

echo "copying *** logging ***"
mkdir -p aurelia-latest/logging
cp -fR aurelia-latest-repos/logging/src/* aurelia-latest/logging

echo "copying *** logging-console ***"
mkdir -p aurelia-latest/logging-console
cp -fR aurelia-latest-repos/logging-console/src/* aurelia-latest/logging-console

echo "copying *** history-browser ***"
mkdir -p aurelia-latest/history-browser
cp -fR aurelia-latest-repos/history-browser/src/* aurelia-latest/history-browser

echo "copying *** event-aggregator ***"
mkdir -p aurelia-latest/history
cp -fR aurelia-latest-repos/history/src/* aurelia-latest/history

echo "copying *** framework ***"
mkdir -p aurelia-latest/framework
cp -fR aurelia-latest-repos/framework/src/* aurelia-latest/framework

echo "copying *** binding ***"
mkdir -p aurelia-latest/binding
cp -fR aurelia-latest-repos/binding/src/* aurelia-latest/binding

echo "copying *** templating ***"
mkdir -p aurelia-latest/templating
cp -fR aurelia-latest-repos/templating/src/* aurelia-latest/templating

echo "copying *** templating-binding ***"
mkdir -p aurelia-latest/templating-binding
cp -fR aurelia-latest-repos/templating-binding/src/* aurelia-latest/templating-binding

echo "copying *** templating-resources ***"
mkdir -p aurelia-latest/templating-resources
cp -fR aurelia-latest-repos/templating-resources/src/* aurelia-latest/templating-resources

echo "copying *** templating-router ***"
mkdir -p aurelia-latest/templating-router
cp -fR aurelia-latest-repos/templating-router/src/* aurelia-latest/templating-router

echo "copying *** route-recognizer ***"
mkdir -p aurelia-latest/route-recognizer
cp -fR aurelia-latest-repos/route-recognizer/src/* aurelia-latest/route-recognizer

echo "copying *** bootstrapper ***"
mkdir -p aurelia-latest/bootstrapper
cp -fR aurelia-latest-repos/bootstrapper/src/* aurelia-latest/bootstrapper

echo "copying *** html-template-element ***"
mkdir -p aurelia-latest/html-template-element
cp -fR aurelia-latest-repos/html-template-element/src/* aurelia-latest/html-template-element

echo "copying *** validation ***"
mkdir -p aurelia-latest/validation
cp -fR aurelia-latest-repos/validation/src/* aurelia-latest/validation

echo "copying *** app-contacts ***"
mkdir -p aurelia-latest/app-contacts
cp -fR aurelia-latest-repos/app-contacts/src/* aurelia-latest/app-contacts

echo "copying *** skeleton-navigation ***"
mkdir -p aurelia-latest/skeleton-navigation
cp -fR aurelia-latest-repos/skeleton-navigation/src/* aurelia-latest/skeleton-navigation

echo "copying *** animator-css ***"
mkdir -p aurelia-latest/animator-css
cp -fR aurelia-latest-repos/animator-css/src/* aurelia-latest/animator-css

echo "copying *** skeleton-plugin ***"
mkdir -p aurelia-latest/skeleton-plugin
cp -fR aurelia-latest-repos/skeleton-plugin/src/* aurelia-latest/skeleton-plugin

rm -fR aurelia-latest-repos
