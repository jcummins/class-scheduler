test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
	--reporter spec \
	> public/test.html

.PHONY: test