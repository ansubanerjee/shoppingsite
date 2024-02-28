{
    "email": "monica@gmail.com",
    "password": "monica123"
}
@ http://localhost:4000/api/v1/users/login  {POST}

--> get bearer token to authenticate

{
    "orderItems": [
        {
            "quantity":1,
            "product": "65d23e6b529a5abc3f9c1eaf"
        },
        {
            "quantity":2,
            "product":"65d266b95e7c685876666920"
        }   
    ],
    "shippingAddress1": "Ramapuram",
    "shippingAddress2" : "Kalasathamman Koil Street",
    "city":"Chennai",
    "zip":"600089",
    "country":"India",
    "phone": "8754322576",
    "user":"65d2e2573b649d8101e9eb71"
}

@http://localhost:4000/api/v1/orders {POST}

no backend error
postman shows 

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Error</title>
</head>

<body>
    <pre>Cannot POST /api/v1/orders</pre>
</body>

</html>