# Ivaldi Forecast Assistent

This simple tool allows you to batch create/delete/migrate assignments in Forecast (Harvest).

## Login

Forecast is using a CSRF-token on their login-page. Since this tool is written in Angular (JS/HTML) it's not possible to fetch this token and login from this tool. In order to use this tool, just open your webinspector on forecastapp.com (after logging in) and navigate to 'resources' > 'Local Storage'. Copy your 'account_id' and 'access_token' from their. Hit 'Login' and you're set to go!

## Using the tool

Just choose from create, delete or migrate and select a timespan in order to update your Forecast planning.
