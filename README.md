# CoastFI

"When can I stop working?" is one compound-interest question, and almost nobody
runs it. CoastFI answers it in three finish lines: your FI number (annual spending
at the 4% rule), the years and age at which your savings plus contributions reach
it, and the coast number - the savings level where growth alone carries you to
retirement with zero further contributions. Most people pass their coast point
without ever noticing it happened.

- FI number, years-to-FI and FI age from your real spending, savings, contribution
  and return assumptions
- Coast-FIRE milestone with a "coast reached" badge
- Live progress bar; inputs persist in `localStorage`
- No signup, nothing to install - pure static HTML/JS
- `engine.js` holds the compounding math as pure functions, shared between the app
  and node tests

## Use it

Open `index.html`, or visit the deployed site.

## Run locally

Any static server works:

```
python3 -m http.server
```

Then open http://localhost:8000/.

## Engine tests

The node suite covers the 4%-rule number, linear saving at zero return, the
already-there and never-reachable cases, growth-only doubling (rule of 72 sanity),
the coast-number formula, and full-plan integration including the coast-reached
flag and progress ratio.
