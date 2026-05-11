#!/bin/bash

read -p "Enter SDK version: " SDK_VERSION

export MVN_REPO=./jitsi-maven-repository/alamaan-custom-sdk
export OVERRIDE_SDK_VERSION=$SDK_VERSION

./android/scripts/release-sdk.sh