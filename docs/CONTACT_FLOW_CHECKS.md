# Contact Flow Verification

Use a synthetic message when testing the contact page.

1. Submit a valid message and confirm the expected success state appears only after the request completes.
2. Submit an empty form and verify required fields are communicated clearly.
3. Test a malformed email address and a long message.
4. Simulate a network failure and confirm the page does not display a success state.
5. Submit once and verify the interaction does not accidentally trigger duplicate requests.
6. Check keyboard focus order and ensure field labels remain visible at mobile widths.

If the contact route uses an external service, perform the test in a staging environment with a non-production destination.
