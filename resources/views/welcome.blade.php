<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Colorpay :: Dashboard</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">
        <!-- Styles -->
        <link rel="stylesheet" href="{{ mix('assets/css/vendor.css') }}">
        <link rel="stylesheet" href="{{ mix('assets/css/app.css') }}">
        <script src="{{ mix('assets/js/manifest.js') }}"></script>
        <script src="{{ mix('assets/js/vendor.js') }}"></script>
        <script src="{{ mix('assets/js/app.js') }}"></script>
        <!-- Styles -->
        <style>
            html, body {
                background: linear-gradient(#e95f62,#f286a0) no-repeat 50% fixed;
                background-size: cover;
                color: #636b6f;
                font-family: 'Raleway', sans-serif;
                font-weight: 100;
                height: 100vh;
                margin: 0;
            }

            .full-height {
                height: 100vh;
            }

            .flex-center {
                align-items: center !important;
                display: flex !important;
                justify-content: center !important;
            }

            .position-ref {
                position: relative;
            }

            .top-right {
                position: absolute;
                right: 10px;
                top: 18px;
            }

            .content {
                text-align: center;
            }

            .title {
                font-size: 84px;
            }

            .links > a {
                color: #636b6f;
                padding: 0 30px;
                font-size: 12px;
                font-weight: 600;
                letter-spacing: .1rem;
                text-decoration: none;
                text-transform: uppercase;
            }

            .m-b-md {
                margin-bottom: 30px;
                color: #eee;
                text-shadow: 0 0.05em rgba(0,0,0,.17), 0 0.1em 0.25em rgba(0,0,0,.25);
                font-weight: 900;
                background-position: 50% 50%;
                background-size: 95vw 80vw;
            }
        </style>
    </head>
    <body>
        <div class="flex-center position-ref full-height">
            @if (Route::has('login'))
                <div class="top-right links">
                    @if (Auth::check())
                        <a class="ui basic purple button" href="{{ url('/home') }}">Home</a>
                    @else
                      <div class="ui basic large buttons">
                        <a class="ui button" href="{{ url('/login') }}">Login</a>
                        <a class="ui button" href="{{ url('/register') }}">Register</a>
                      </div>
                    @endif
                </div>
            @endif

            <div class="content" id="app">
                <div class="title m-b-md">
                    Colorpay
                </div>
                <checkout :plans="{{ $plans }}" :user="{{ auth()->user() }}"></checkout>
            </div>
        </div>
        <script src="https://checkout.stripe.com/checkout.js"></script>
        <script>
          window.Colorpay = <?php echo json_encode([
                  'csrfToken' => csrf_token(),
                  'stripeKey' => config('services.stripe.key'),
                  'user'  => auth()->user(),
              ]); ?>
        </script>
    </body>
</html>
