# :zap: ColorPay

+ This is simple CRUD app made with Laravel 5.x & Vue 2.x for testing Stripe API, give me a star :star: if you like it :beers:

### :white_check_mark: `git clone` it :octocat: 
```bash
$ git clone https://github.com/vinayakkulkarni/colorpay.git
$ cd colorpay
```

### :white_check_mark: `.env` Setup :100:
```
STRIPE_KEY=
STRIPE_SECRET=
```
> Don't forget to setup the .env file with STRIPE details

### :white_check_mark: Backend Setup :ok_hand:
```bash
$ composer install
$ php vendor/bin/homestead make
```
> append `/etc/hosts` jobify.app

``` bash
$ vagrant up
```

### :white_check_mark: Database Setup :notebook:
``` bash
$ php artisan migrate:refresh --seed
```

### :white_check_mark: Frontend Setup with `npm` :boom:
``` bash
$ npm install
$ gulp semantic-build
$ npm run production|dev
```
### :white_check_mark: Frontend Setup with `yarn` :100:
``` bash
$ yarn
$ gulp semantic-build
$ yarn run production|dev
```
