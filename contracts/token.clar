;; Define a map called 'balances' that associates an address (principal) with a balance (uint).
(define-map balances
  ((address principal)) ((balance uint)))

(define-public (get-balance (user principal))
  (ok (default-to u0 (map-get? balances ((address user))))))