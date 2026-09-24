keralafemboy

What it does

keralafemboy is a moderation helper for r/TeenKerala.

When someone makes a new post or comment, the app checks whether they have a user flair.

- If they have a flair, nothing happens.
- If they don't have a flair, the app sends them a private reminder to choose an appropriate user flair.
- The app does not change or remove user flairs.

Setup

The app is intended for r/TeenKerala and works automatically after installation.

Install it with:

npx devvit install r/TeenKerala

No additional configuration is required.

Testing

The app can be tested in a development subreddit:

npx devvit playtest r/teenkeralafemboy_dev

Notes

The app only processes new posts and comments after it is installed. Users can change their own flair normally through Reddit.