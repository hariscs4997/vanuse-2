#!/usr/bin/env bash
export IMAGE_NAME="${IMAGE_NAME}"
export DOCKER_FILE="${DOCKER_FILE:-"Dockerfile"}"
export EXTRA_FLAG="${EXTRA_FLAG:-""}"

export DOCKER_BUILDKIT=1

echo "Proxy Set to: ${PROXY}"
echo "Tagged as : ${IMAGE_NAME}"
echo ""
echo ""

CMD='docker build --cache-from='"${IMAGE_NAME}"' --rm --file '"${DOCKER_FILE}"' -t '"${IMAGE_NAME}"' '"${EXTRA_FLAG}"' .'

echo "Build commmand: ${CMD}"
echo ""
${CMD}
