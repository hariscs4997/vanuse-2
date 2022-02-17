#!/usr/bin/env bash
export PROXY="${PROXY:-""}"
export DOCKER_FILE="Dockerfile"
export IMAGE_NAME=registry.gitlab.com/braveorbit/vanuse-web-new
#export EXTRA_FLAG="${EXTRA_FLAG:-" --load "}"
./baseBuild.sh
