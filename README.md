# AuthMiddleware
A Django middleware to enforce user login before accessing certain views.

[![image](https://img.shields.io/pypi/v/django-authmiddleware.svg?style=for-the-badge)](https://pypi.org/project/django-authmiddleware/)

[![image](https://img.shields.io/badge/code%20style-black-000000.svg?style=for-the-badge)](https://github.com/psf/black)

Setup
=====
You can install django-authmiddleware from **pip** using
```sh
pip install django-authmiddleware
```

and then add it to your middleware using:

```{.sourceCode .python}
MIDDLEWARE = [
    ...
    'AuthMiddleware.middleware.AuthRequiredMiddleware',
    ...
]
```
Make sure you add the trailing comma or you might get a
`ImproperlyConfigured` Exception.

Configuration
=============
Configure the middleware's behaviour in your Django project's settings. The middleware expects a `AUTH_SETTINGS` setting within Django settings to work properly. You must
set the following keys within `AUTH_SETTINGS`:

-   `LOGIN_URL`
-   `DEFAULT_REDIRECT_URL`
-   `LOCK_URLS`
-   `REDIRECT_AFTER_LOGIN`

`LOGIN_URL`
-----------
A URL name that is used for login in your django project. Defaults to `login`.
```{.sourceCode .python}
AUTH_SETTINGS = {
    ...
    "LOGIN_URL" : "example"
    ...
}
```

`DEFAULT_REDIRECT_URL`
----------------------
A URL name to which users are redirect if they try to access an invalid URLs. Defaults to `None`.


When set to `None`, no redirects take place and error is generated for invalid URLs.
```{.sourceCode .python}
AUTH_SETTINGS = {
    ...
    "DEFAULT_REDIRECT_URL" : "example"
    ...
}
```

`LOCK_URLS`
----------------------
A set of URL names to which access is restricted. Access to these URLs is given only on successful login. Default to empty set `{}`.
```{.sourceCode .python}
AUTH_SETTINGS = {
    ...
    "LOCK_URLS" : {
        "example-1",
        "example-2",
        "example-3",
        ...
        }
    ...
}
```

`REDIRECT_AFTER_LOGIN`
----------------------
If set to `True`, user is redirected to original page after successful login. Adds `?next` parameter to URL request. Defaults to `True`.
```{.sourceCode .python}
AUTH_SETTINGS = {
    ...
    "REDIRECT_AFTER_LOGIN" : False,
    ...
}
```

Contributing
============

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request