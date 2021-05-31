dockerignore best practices
improve payment ui
add collection type logic
collection save and fetch inconsistency
use slug rather than IDs

x sometime list doesn load
x keep session after refresh, probably using redis session
x install stripe and pay with stripe
x apps over https
x admin update
x implement state logic with redux
x start cart container
x add to cart and price placement
x delete product
x web grid

DOC

ADMIN
material-ui
react

API
Nest.Js

CART
Nest.Js

PRODUCT
Nest.Js

WEB
chakra-ui
react
Payment with Stripe

front
admin
websales

back
api
cart
catalog

admin
websales
server

generate selfsigned ssl key and cert
openssl req -x509 -nodes -days 365 -subj "/C=CA/ST=QC/O=Company, Inc./CN=nelp.com" -addext "subjectAltName=DNS:nelp.com" -newkey rsa:2048 -keyout ./config/private.key -out ./config/cert.crt;

Install
