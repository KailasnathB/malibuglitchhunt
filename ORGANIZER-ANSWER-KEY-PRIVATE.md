# PRIVATE ORGANIZER ANSWER KEY — MALIBU NIGHTCLUB HARD
Do not share this file with participants or deploy it to the public site.

This challenge includes 12 intended behaviors to investigate:
1. Ticket price "Low to high" sorts high to low.
2. Ticket price "High to low" sorts low to high.
3. Reset Filters clears search and genre but does not reset the selected sort.
4. Event count label is hard-coded to `01 — 04 / 2026` and can become stale.
5. Selecting an event card booking route retains the chosen event, but changing event in the booking form does not update the event card context elsewhere.
6. Booking confirmation total uses the selected ticket type at submit; test rapid ticket/quantity changes to identify any stale confirmation expectation.
7. Reservation records exist only in the current browser session and do not persist after refresh.
8. My Reservations does not provide a way to recover reservations from another browser.
9. Navigation uses local state plus hash; direct-opening a hash route does not restore the matching tab.
10. The report page field is initialized from `location.hash` but is not automatically updated when the participant navigates to another section.
11. The phone field is optional but the booking form does not validate phone format when entered.
12. Ticket quantity accepts values via keyboard that may briefly render before browser constraints are applied; test boundary values and totals.

Important: this list is a draft test key, not a guarantee every item has been browser-verified. Before the event, test each item and adjust the intended bug list to match the final build.
