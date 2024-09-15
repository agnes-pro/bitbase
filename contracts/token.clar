;; Define a map called 'balances' that associates an address (principal) with a balance (uint).
(define-map balances
  ((address principal)) ((balance uint)))

(define-public (get-balance (user principal))
  (ok (default-to u0 (map-get? balances ((address user))))))

;; Define a public function 'transfer' that allows the sender to transfer an amount of tokens to a recipient.
(define-public (transfer (recipient principal) (amount uint))
  (let
    (
      (sender (tx-sender))
      (sender-balance (default-to u0 (map-get? balances ((address sender)))))
      (recipient-balance (default-to u0 (map-get? balances ((address recipient)))))
    )
    (if (>= sender-balance amount)
      (begin
        (map-set balances ((address sender)) ((balance (- sender-balance amount))))
        (map-set balances ((address recipient)) ((balance (+ recipient-balance amount))))
        (ok true)
      )
      (err u101)))  ;; Error: Insufficient balance
)
