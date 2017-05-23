var MIN_VALUE = 2;
var MAX_VALUE = 10;
var i, n;
next:
  for (i = MIN_VALUE; i < MAX_VALUE; i++) {
    for (n = MIN_VALUE; n < i; n++) {
      if (i % n == 0) continue next;
    }
    alert(i);
  }
