;; Define a map called 'balances' that associates an address (principal) with a balance (uint).
(define-map balances principal uint)

(define-public (get-balance (user principal))
  (ok (default-to u0 (map-get? balances user))))

;; Define a public function 'transfer' that allows the sender to transfer an amount of tokens to a recipient.
;; The function checks if the sender has enough balance to cover the transfer amount.
(define-public (transfer (recipient principal) (amount uint))
  (let
    (
      (sender tx-sender)
      (sender-balance (default-to u0 (map-get? balances sender)))
      (recipient-balance (default-to u0 (map-get? balances recipient)))
    )
    ;; Check if the recipient is not the sender.
    (if (is-eq sender recipient)
      (err u102) ;; Error: Cannot transfer to self
      ;; Check if the sender's balance is sufficient for the transfer amount.
      (if (>= sender-balance amount)
        (begin
          ;; Deduct the transfer amount from the sender's balance and update the map.
          (map-set balances sender (- sender-balance amount))

          ;; Add the transfer amount to the recipient's balance and update the map.
          (map-set balances recipient (+ recipient-balance amount))

          ;; Return 'true' to indicate the transfer was successful.
          (ok true)
        )
        ;; If the sender's balance is insufficient, return an error with code u101.
        (err u101)  ;; Error: Insufficient balance
      )
    )
  )
)
