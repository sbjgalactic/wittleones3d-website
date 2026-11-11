/* ============================================================
   MARKET EVENTS - real-life stalls, markets and pop-ups
   ============================================================
   These show on the Events page timeline alongside the online sales.
   Each event disappears by itself once its finish time has passed.

   To add one: copy the example below, remove the // at the start of
   each line, and fill in your details. Keep the commas!

   FIELDS
     title      required  name of the market
     date       required  start date + time, e.g. '2026-12-06T08:00:00+10:00'
                          (the +10:00 is Queensland time, leave it as is)
     ends       finish time, e.g. '2026-12-06T13:00:00+10:00'
                (leave out and it's treated as a 4 hour event)
     location   venue name, e.g. 'Riverside Markets'
     address    street address. Adds a "Get directions" button
     blurb      a sentence or two about what you'll have there
     badge      little tag (default 'Market stall')
     link       the market's website or Facebook event
     button     text for that link (default 'Event page')
     image      a picture path, e.g. './images/markets/riverside.webp'
     emojis     ['🎪'] the first one is the icon when there's no picture
     theme      'pink' | 'teal' | 'purple' | 'yellow' | 'red' | 'green' | 'blue' | 'dark'
   ============================================================ */

const marketEvents = [
    // {
    //     title: 'Christmas Twilight Market',
    //     date: '2026-12-06T16:00:00+10:00',
    //     ends: '2026-12-06T21:00:00+10:00',
    //     location: 'Example Park',
    //     address: '1 Example Street, Brisbane QLD',
    //     blurb: 'Come say hi and see the whole Wittle Ones range in person, plus market-only Christmas minis!',
    //     link: 'https://example.com/market',
    //     emojis: ['🎪', '🎄'],
    //     theme: 'teal',
    // },
];
