<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- CSRF Token -->
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>{{ config('app.name', 'Laravel') }}</title>
  <!-- Styles -->
  <link rel="stylesheet" href="{{ mix('assets/css/vendor.css') }}">
  <link rel="stylesheet" href="{{ mix('assets/css/app.css') }}">
  <script src="{{ mix('assets/js/manifest.js') }}"></script>
  <script src="{{ mix('assets/js/vendor.js') }}"></script>
  <script src="{{ mix('assets/js/app.js') }}"></script>
</head>

<body>
  <div id="app">
    <div class="ui top fixed inverted menu">
      <a class="item menu-trigger" href="{{ url('/') }}">{{ config('app.name', 'Colorpay') }}</a>
      <div class="right menu">
        @if (Auth::guest())
          <a class="item" href="{{ route('login') }}">Login</a>
          <a class="item" href="{{ route('register') }}">Register</a>
        @else
        <a class="item" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();"> Logout </a>
        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
          {{ csrf_field() }}
        </form>
        @endif
      </div>
    </div>
    <div class="ui grid container" style="margin-top: 2%;">
      @yield('content')
    </div>
  </div>
  <!-- Scripts -->
  <script src="https://checkout.stripe.com/checkout.js"></script>
  <script>
  window.Colorpay = <?php echo json_encode([
          'csrfToken' => csrf_token(),
          'stripeKey' => config('services.services.stripe.key'),
          'user'  => auth()->user(),
      ]); ?>
  </script>
</body>

</html>
