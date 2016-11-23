# jquery.masterpassword
A jQuery plugin for master password validation. [Demo](https://hwangzhiming.github.io/jquery.masterpassword/)

```javascript
var promise = $.masterPassword({
   length: 4,
   title: 'ENTER YOUR MASTER PASSWORD',
   description:'',
   canCancel: true,
   okText: 'Enter',
   cancelText: 'Cancel'
});

promise.then(function (val) {
    console.log(val);
}, function () {
    alert('cancel');
});
```