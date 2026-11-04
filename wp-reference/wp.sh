#!/bin/sh
cd "$(dirname "$0")/site" && exec php -d memory_limit=1G ../_dl/wp-cli.phar "$@"
