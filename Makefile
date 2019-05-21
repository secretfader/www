dev:
	podman run --rm --privileged --volume $(PWD):/usr/src/secretfader -w /usr/src/secretfader -it ubuntu:bionic bash

.PHONY: dev
